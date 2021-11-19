/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, withStyles } from "@mui/styles";
import { Button, Grid, Stack, Typography, TextField } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { connect } from "react-redux";
import TestTokenSelect from "./TestTokenSelect";
import { tokenList } from "../../contracts";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getTransactionAlertMessage,
  TransactionAlertStatus,
  TransactionAlertContainer,
} from "../messages/TransactionAlertContainer";
import { tokenContractsList } from "../../hooks";

const styles = () =>
  createStyles({
    contentContainer: {
      width: "100%",
      margin: "0px",
      justifyContent: "center",
      textAlign: "center",
    },
    numberInput: {
      "& input[type=number]": {
        "-moz-appearance": "textfield",
      },
      "& input[type=number]::-webkit-outer-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      "& input[type=number]::-webkit-inner-spin-button": {
        "-webkit-appearance": "none",
        margin: 0,
      },
      height: "100%",
    },
    swapBox: {
      backgroundColor: "white",
    },
    swapButton: {
      marginTop: "10%",
    },
    label: {
      allign: "center",
      textAlign: "center",
    },
  });

function MintWindow(props: any) {
  const { classes } = props;
  const tokenName = tokenList[props.tokenId].name;
  const { account } = useEthers();

  const [valueToMint, setValueToMint] = useState(100);
  const [notifications, setNotificationsStateValues] = useState([]);
  const [isAllowToThrowError, setAllowToThrowError] = useState(false);

  const handleChange = (event: any) => {
    const newValue: number = event.target.value as number;
    setValueToMint(newValue);
  };

  const useContractMethods = tokenContractsList.map((i: any) =>
    i.useContractMethod("unlimitedMint")
  );

  useEffect(() => {
    const status = useContractMethods[props.tokenId]?.state?.status;
    const txHash = useContractMethods[props.tokenId]?.state?.transaction?.hash;
    const _notif: any = notifications.find((n: any) => n.txHash === txHash);
    console.log(">", status, txHash);

    if (status === "Mining") {
      if (!_notif) {
        const alertId = toast.loading(
          getTransactionAlertMessage(TransactionAlertStatus.Started, "mint")
        );
        const newNot: any = [...notifications, { alertId, txHash }];
        setNotificationsStateValues(newNot);
      }
    } else if (status === "Success") {
      console.log(_notif, notifications);
      if (notifications && _notif) {
        toast.dismiss(_notif.alertId);
        toast.success(
          getTransactionAlertMessage(TransactionAlertStatus.Succeeded, "mint")
        );
        setNotificationsStateValues(
          notifications.filter((i: any) => txHash !== i.txHash)
        );
      }
    }
  }, [props.tokenId, useContractMethods, notifications]);

  useEffect(() => {
    if (!isAllowToThrowError) return;
    const status = useContractMethods[props.tokenId]?.state?.status;

    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "mint")
      );
      setAllowToThrowError(false);
    }
  }, [props.tokenId, useContractMethods]);

  const handleTransaction = async () => {
    const { send } = useContractMethods[props.tokenId];
    send(account, valueToMint.toString()).then(() => {
      setAllowToThrowError(true);
    });
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
            <Typography variant="h5" className={classes.label}>
              Mint free ERC20 token and test our app.
            </Typography>
            <TestTokenSelect />
            <TextField
              className={classes.numberInput}
              // label="TextField"
              placeholder="0.0"
              type="number"
              fullWidth
              value={valueToMint}
              variant="outlined"
              onChange={(e: any) => handleChange(e)}
            />
            <Button
              variant="contained"
              className={classes.swapButton}
              onClick={() => handleTransaction()}
            >
              Mint 100 of {tokenName}
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <TransactionAlertContainer />
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    tokenId: state.mint.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true, index: 1 })(MintWindow));
