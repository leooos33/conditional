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
  setAmountAction,
} from "../../redux/actions";
import { useEffect, useState } from "react";
import { useBuy } from "../../hooks/pairContractHook";
import { TransactionAlertContainer } from "../messages/TransactionAlertContainer";
import {
  tokenContractsList,
  Token,
  useGetPair,
  getAmount,
  isValidInput,
} from "../../hooks";
import { toast } from "react-toastify";

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
  });

function SwapWindow(props: any) {
  const [label, setLabel] = useState(true);

  const useContractMethodsApprove = tokenContractsList.map(
    (i: any) => i.useApprove().send
  );

  const pairAddress = useGetPair(tokenList[0].address, tokenList[1].address);
  const { send: buy } = useBuy(pairAddress);

  useEffect(() => {
    setTimeout(async () => {
      // console.log(">>", props.token1_value);
      const amount = await getAmount(
        0,
        props.token1_value,
        tokenList[props.token1].address
      );
      props.setAmount(amount);
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      // console.log(">>", props.token1_value);
      const amount = await getAmount(
        0,
        props.token1_value,
        tokenList[props.token1].address
      );
      props.setAmount(amount);
    }, 2000);
    return () => clearInterval(interval);
  }, [props.token1_value]);

  const handleSwap = () => {
    props.swapTokens();
    setLabel(!label);
  };

  const handleTransaction = () => {
    const ftrp = buy(0, 0.2, 1000 * 10);
    toast.promise(ftrp, {
      pending: "Your buy transaction is proceeding",
      success: "The buy  transaction is good 👌",
      error: "The buy transaction failed 🤯",
    });
  };

  const handleTransactionApprove = async () => {
    const ftrp = useContractMethodsApprove[props.tokenToApproveId](pairAddress);
    toast.promise(ftrp, {
      pending: "Your approve transaction is proceeding",
      success: "The approve transaction is good 👌",
      error: "The approve transaction failed 🤯",
    });
    props.approveToken(props.tokenToApproveId);
  };

  const { classes } = props;
  let button;
  if (props.tokenToApproveId === -1) {
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
      ""
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
  let { token1_value, token2_value, amount } = props;

  // Input safe guard
  if (!(isValidInput(token1_value) && isValidInput(token2_value))) return false;
  token1_value = Token(token1_value);
  token2_value = Token(token2_value);

  if (!amount) return false;
  // Like min
  const upperTrechold1 = amount.token1.max.lt(amount.amount1)
    ? amount.token1.max
    : amount.amount1;
  const upperTrechold2 = amount.token2.max.lt(amount.amount2)
    ? amount.token2.max
    : amount.amount2;

  if (token1_value.lt(amount.token1.min) || token1_value.gte(upperTrechold1))
    return false;
  if (token2_value.lt(amount.token2.min) || token2_value.gte(upperTrechold2))
    return false;
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
    setAmount: (amount: any) => {
      dispatch(setAmountAction(amount));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, index: 1 })(SwapWindow));
