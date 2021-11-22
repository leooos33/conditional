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
  const [notifications, setNotificationsStateValues] = useState([]);
  const [isAllowToThrowError, setAllowToThrowError] = useState(false);

  const tokenToBuy = props.token1_value;

  const { account: accountAddress } = useEthers();

  const useContractMethodsApprove = tokenContractsList.map((i: any) =>
    i.useApprove()
  );

  // On Create Update Info
  // ---------------------------------------
  useEffect(() => {
    setTimeout(async () => {
      const info = await updateSwapInfo(
        tokenToBuy,
        tokenList[props.token1].address,
        accountAddress,
        tokenList[props.token2].address,
        pairAddress,
        true
      );
      if (info) props.setSwapInfo(info);
    }, 100);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      const info = await updateSwapInfo(
        tokenToBuy,
        tokenList[props.token1].address,
        accountAddress,
        tokenList[props.token2].address,
        pairAddress
      );
      if (info) props.setSwapInfo(info);
    }, 1000);
    return () => clearInterval(interval);
  }, [props, tokenToBuy, accountAddress]);

  // ---------------------------------------

  const { state: buyState, send: buy } = useBuy(pairAddress);

  // Notifications
  // ---------------------------------------

  // ----- Buy -----

  useEffect(() => {
    const status = buyState?.status;
    const txHash = buyState?.transaction?.hash;
    const _notif: any = notifications.find((n: any) => n.txHash === txHash);

    if (status === "Mining") {
      if (!_notif) {
        const alertId = toast.loading(
          getTransactionAlertMessage(TransactionAlertStatus.Started, "buy")
        );
        const newNot: any = [...notifications, { alertId, txHash }];
        setNotificationsStateValues(newNot);
      }
    } else if (status === "Success") {
      // console.log(_notif, notifications);
      if (notifications && _notif) {
        toast.dismiss(_notif.alertId);
        toast.success(
          getTransactionAlertMessage(TransactionAlertStatus.Succeeded, "buy")
        );
        setNotificationsStateValues(
          notifications.filter((i: any) => txHash !== i.txHash)
        );
      }
    }
  }, [buyState, notifications]);

  useEffect(() => {
    if (!isAllowToThrowError) return;
    const status = buyState?.status;

    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "buy")
      );
      setAllowToThrowError(false);
    }
  }, [buyState, isAllowToThrowError]);

  // ----- Approve -----

  useEffect(() => {
    const status = useContractMethodsApprove[props.token2]?.state?.status;
    const txHash =
      useContractMethodsApprove[props.token2]?.state?.transaction?.hash;
    const _notif: any = notifications.find((n: any) => n.txHash === txHash);

    if (status === "Mining") {
      if (!_notif) {
        const alertId = toast.loading(
          getTransactionAlertMessage(TransactionAlertStatus.Started, "approve")
        );
        const newNot: any = [...notifications, { alertId, txHash }];
        setNotificationsStateValues(newNot);
      }
    } else if (status === "Success") {
      // console.log(_notif, notifications);
      if (notifications && _notif) {
        toast.dismiss(_notif.alertId);
        toast.success(
          getTransactionAlertMessage(
            TransactionAlertStatus.Succeeded,
            "approve"
          )
        );
        setNotificationsStateValues(
          notifications.filter((i: any) => txHash !== i.txHash)
        );
        setTimeout(async () => {
          const info = await updateSwapInfo(
            props.token1_value,
            tokenList[props.token1].address,
            accountAddress,
            tokenList[props.token2].address,
            pairAddress,
            true
          );
          if (info) props.setSwapInfo(info);
        }, 100);
      }
    }
  }, [useContractMethodsApprove, props, notifications]);

  useEffect(() => {
    if (!isAllowToThrowError) return;
    const status = useContractMethodsApprove[props.token2]?.state?.status;

    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "approve")
      );
      setAllowToThrowError(false);
    }
  }, [useContractMethodsApprove, props, isAllowToThrowError]);

  // ---------------------------------------

  const handleSwap = () => {
    props.swapTokens();
    setLabel(!label);
  };

  const handleTransaction = async () => {
    buy(
      orderId,
      Token(tokenToBuy),
      tokenList[props.token1].address,
      Token("10000000")
    ).then(() => {
      setAllowToThrowError(true);
    });
  };

  const handleTransactionApprove = async () => {
    useContractMethodsApprove[props.token2].send(pairAddress).then(() => {
      setAllowToThrowError(true);
    });
  };

  const { classes } = props;
  let button;
  if (!isValidInput(tokenToBuy)) {
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
  } else if (isValidInput(tokenToBuy) && !props.info?.price) {
    const text =
      props.token1 === 1 && parseFloat(tokenToBuy) <= 20000
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
