/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, withStyles } from "@mui/styles";
import { Button, Grid, Stack } from "@mui/material";
import { connect } from "react-redux";
import { tokenList } from "../../contracts";

import {
  tokenContractsList,
  useBlockchainParams,
  useGetOrder,
  usePlaceOrder,
  toToken,
  useGetPair,
  useCreatePair,
  Token,
  useProvideLiquidity,
  orderId,
} from "../../hooks";
import { toast } from "react-toastify";
import { TransactionAlertContainer } from "../messages/TransactionAlertContainer";
import { BigNumber } from "@ethersproject/bignumber";

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
    label: {
      allign: "center",
    },
  });

function OrderWindow(props: any) {
  const { classes } = props;

  const useContractMethodApprove = tokenContractsList.map(
    (i: any) => i.useContractMethod("approve").send
  );

  const pairAddress = useGetPair(tokenList[0].address, tokenList[1].address);
  const { send: placeOrder } = usePlaceOrder(pairAddress);
  const { send: provideLiquidity } = useProvideLiquidity(pairAddress);

  const deadline = useBlockchainParams();

  const handleTransaction = async () => {
    const params = [
      4,
      ...toToken([0, 4000, 6000, 8000]),
      ...toToken([10000, 20000, 30000, 40000]),
      BigNumber.from("10000"),
      ...toToken([20000, 30000, 40000]),
      BigNumber.from("1"),
      ...toToken([0, 4000, 6000, 8000]),
    ];
    // console.log(params, deadline + 1000000000);
    const ftrp = placeOrder(1, params, deadline + 1000000000);
    toast.promise(ftrp, {
      pending: "Your place order transaction is proceeding",
      success: "The place order transaction is good 👌",
      error: "The place order transaction failed 🤯",
    });
  };

  const handleTransactionApprove = async () => {
    const ftpr1 = useContractMethodApprove[0](pairAddress, Token(8000));
    toast.promise(ftpr1, {
      pending: "Your approve transaction is proceeding",
      success: "The approve transaction is good 👌",
      error: "The approve transaction failed 🤯",
    });
    const ftpr2 = useContractMethodApprove[1](pairAddress, Token(40000));
    toast.promise(ftpr2, {
      pending: "Your approve transaction is proceeding",
      success: "The approve transaction is good 👌",
      error: "The approve transaction failed 🤯",
    });
    await ftpr1;
    await ftpr2;
  };
  const handleTransactionProvideLiquidity = async () => {
    const ftpr1 = provideLiquidity(tokenList[0].address, Token(8000), orderId);
    toast.promise(ftpr1, {
      pending: "Your approve transaction is proceeding",
      success: "The approve transaction is good 👌",
      error: "The approve transaction failed 🤯",
    });
    const ftpr2 = provideLiquidity(tokenList[1].address, Token(40000), orderId);
    toast.promise(ftpr2, {
      pending: "Your approve transaction is proceeding",
      success: "The approve transaction is good 👌",
      error: "The approve transaction failed 🤯",
    });
    await ftpr1;
    await ftpr2;
  };

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
          <Stack direction="column" spacing={10}>
            <Button
              variant="contained"
              className={classes.swapButton}
              onClick={() => handleTransaction()}
            >
              Place two-sided Order on A-B
            </Button>
            <Button
              variant="contained"
              className={classes.swapButton}
              onClick={() => handleTransactionApprove()}
            >
              Approve two tokens
            </Button>
            <Button
              variant="contained"
              className={classes.swapButton}
              onClick={() => handleTransactionProvideLiquidity()}
            >
              Provide two tokens
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <TransactionAlertContainer />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, index: 1 })(OrderWindow));
