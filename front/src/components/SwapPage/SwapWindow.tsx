/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@mui/styles";
import { tokenList } from "../../contracts";
import { connect } from "react-redux";
import {
  approveTokenAction,
  changePairAction,
  setSwapInfoAction,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useBuy } from "../../hooks/pairContractHook";
import {
  getTransactionAlertMessage,
  TransactionAlertContainer,
  TransactionAlertStatus,
} from "../messages/TransactionAlertContainer";
import {
  tokenContractsList,
  Token,
  useGetPair,
  updateSwapInfo,
  isValidInput,
  orderId,
} from "../../hooks";
import { toast } from "react-toastify";
import { useEthers } from "@usedapp/core";

const styles = () =>
  createStyles({
    contentContainer: {
      width: "100%",
      margin: "0px",
      justifyContent: "center",
    },
    swapBox: {
      backgroundColor: "white",
    },
    swapButton: {
      marginTop: "10%",
    },
    swapButtonDisabled: {
      marginTop: "10%",
      backgroundColor: "#768595",
    },
  });

function SwapWindow(props: any) {
  const [label, setLabel] = useState(true);

  const { account: accountAddress } = useEthers();

  const useContractMethodsApprove = tokenContractsList.map((i: any) =>
    i.useApprove()
  );

  useEffect(() => {
    const status =
      useContractMethodsApprove[props.tokenToApproveId]?.state.status;
    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "approve")
      );
    } else if (status === "Mining") {
      toast.info(
        getTransactionAlertMessage(TransactionAlertStatus.Started, "approve")
      );
    } else if (status === "Success") {
      toast.success(
        getTransactionAlertMessage(TransactionAlertStatus.Succeeded, "approve")
      );
    }
  }, [useContractMethodsApprove[props.tokenToApproveId]?.state]);

  const pairAddress = useGetPair(tokenList[0].address, tokenList[1].address);
  const { state: buyState, send: buy } = useBuy(pairAddress);

  useEffect(() => {
    const status = buyState.status;

    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "buy")
      );
    } else if (status === "Mining") {
      toast.info(
        getTransactionAlertMessage(TransactionAlertStatus.Started, "buy")
      );
    } else if (status === "Success") {
      toast.success(
        getTransactionAlertMessage(TransactionAlertStatus.Succeeded, "buy")
      );
    }
  }, [buyState]);

  useEffect(() => {
    setTimeout(async () => {
      const info = await updateSwapInfo(
        props.token1_value,
        tokenList[props.token1].address,
        accountAddress,
        tokenList[props.token2].address,
        pairAddress
      );
      if (info) props.setSwapInfo(info);
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const info = await updateSwapInfo(
        props.token1_value,
        tokenList[props.token1].address,
        accountAddress,
        tokenList[props.token2].address,
        pairAddress
      );
      if (info) props.setSwapInfo(info);
    }, 1000);
    return () => clearInterval(interval);
  }, [props.token1_value]);

  const handleSwap = () => {
    props.swapTokens();
    setLabel(!label);
  };

  const handleTransaction = async () => {
    console.log(
      "Buy",
      orderId,
      Token(props.token1_value).toString(),
      tokenList[props.token1].address,
      Token("10000000").toString()
    );
    await buy(
      orderId,
      Token(props.token1_value),
      tokenList[props.token1].address,
      Token("10000000")
    );
  };

  const handleTransactionApprove = async () => {
    await useContractMethodsApprove[props.tokenToApproveId].send(pairAddress);
    props.approveToken(props.tokenToApproveId);
  };

  const { classes } = props;
  let button;
  if (props.price < props.allow) {
    button = isSwapReady(props) ? (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransaction()}
      >
        Buy
      </Button>
    ) : (
      <Button
        style={{
          backgroundColor: "#768595",
        }}
        variant="contained"
        className={classes.swapButtonDisabled}
      >
        Not enough liquidity
      </Button>
    );
  } else {
    button = (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransactionApprove()}
      >
        Approve {tokenList[props.tokenToApproveId].name}
      </Button>
    );
  }
  return (
    <>
      <Grid container className={classes.contentContainer}>
        <Grid
          item
          xs={6}
          md={6}
          className={classes.swapBox}
          style={{
            marginTop: "8%",
          }}
        >
          <Stack direction="column" spacing={2}>
            <TokenInput tokenType={"token1"} />
            <Divider textAlign="center">
              <Chip label={label ? "↓" : "↑"} onClick={() => handleSwap()} />
            </Divider>
            <TokenInput tokenType={"token2"} />
            {button}
          </Stack>
        </Grid>
      </Grid>
      <TransactionAlertContainer />
    </>
  );
}

function isSwapReady(props: any) {
  let { amount } = props;
  if (!amount?.price) return false;
  return true;
}

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1,
    token2: state.swap.token2,
    token1_value: state.swap.token1_value,
    token2_value: state.swap.token2_value,
    amount: state.swap.amount,
    approvedTokenList: state.swap.approvedTokenList,
    tokenToApproveId: state.swap.tokenToApproveId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    swapTokens: () => {
      dispatch(changePairAction());
    },
    approveToken: (tokenId: number) => {
      dispatch(approveTokenAction(tokenId));
    },
    setSwapInfo: (amount: any) => {
      dispatch(setSwapInfoAction(amount));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, index: 1 })(SwapWindow));
