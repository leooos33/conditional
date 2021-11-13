/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@mui/styles";
// import { useCount, useContractMethod } from "../../hooks";
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
  useGetOrder,
  useGetPair,
  getPriceFromRouter,
  Token,
  getAmount,
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

  const order = useGetOrder(pairAddress, 0);
  console.log(order);
  console.log(pairAddress);
  if (order) {
    // console.log(order.amount0.toString());
    // console.log(order.amount1.toString());
  }

  // const price = getPriceFromRouter(
  //   Token(props.token1_value),
  //   tokenList[props.token1].address
  // ).toString();
  // console.log(price);

  useEffect(() => {
    const interval = setInterval(async () => {
      const amount = await getAmount(0);
      props.setAmount(amount);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
    // TODO: uncomment
    // const ftrp = useContractMethodsApprove[props.tokenToApproveId](pairAddress);
    // toast.promise(ftrp, {
    //   pending: "Your approve transaction is proceeding",
    //   success: "The approve transaction is good 👌",
    //   error: "The approve transaction failed 🤯",
    // });
    props.approveToken(props.tokenToApproveId);
  };
  const { classes } = props;
  let button;
  if (props.tokenToApproveId === -1) {
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

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1,
    token2: state.swap.token2,
    token1_value: state.swap.token1_value,
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
