/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@mui/styles";
import { tokenList, pairAddress } from "../../contracts";
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
    const status = useContractMethodsApprove[props.token2]?.state.status;
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
      props.approveToken(0);
    }
  }, [useContractMethodsApprove[props.token2]?.state]);

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
  }, [props.token1_value, accountAddress]);

  const handleSwap = () => {
    props.swapTokens();
    setLabel(!label);
  };

  const handleTransaction = async () => {
    // console.log(
    //   "Buy",
    //   orderId,
    //   Token(props.token1_value).toString(),
    //   tokenList[props.token1].address,
    //   Token("10000000").toString()
    // );
    await buy(
      orderId,
      Token(props.token1_value),
      tokenList[props.token1].address,
      Token("10000000")
    );
  };

  const handleTransactionApprove = async () => {
    await useContractMethodsApprove[props.token2].send(pairAddress);
  };

  const { classes } = props;
  let button;
  // console.log(props.token1_value);
  if (!isValidInput(props.token1_value)) {
    button = (
      <Button
        style={{
          backgroundColor: "#768595",
        }}
        variant="contained"
        className={classes.swapButtonDisabled}
      >
        Enter the amount
      </Button>
    );
  } else if (isValidInput(props.token1_value) && !props.info?.price) {
    const text =
      props.token1 === 1 && parseFloat(props.token1_value) <= 20000
        ? "Amount should be greater 20000"
        : "Not enough liquidity";
    button = (
      <Button
        style={{
          backgroundColor: "#768595",
        }}
        variant="contained"
        className={classes.swapButtonDisabled}
      >
        {text}
      </Button>
    );
  } else if (
    props.info?.allowance &&
    props.info?.price &&
    props.info.allowance.gte(props.info?.price)
  ) {
    button = (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransaction()}
      >
        Buy
      </Button>
    );
  } else if (
    props.info?.allowance &&
    props.info?.price &&
    props.info.allowance.lt(props.info?.price)
  ) {
    button = (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransactionApprove()}
      >
        Approve {tokenList[props.token2].name}
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

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1,
    token2: state.swap.token2,
    token1_value: state.swap.token1_value,
    token2_value: state.swap.token2_value,
    info: state.swap.info,
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
