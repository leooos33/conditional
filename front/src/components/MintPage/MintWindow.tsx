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

  const handleChange = (event: any) => {
    const newValue: number = event.target.value as number;
    setValueToMint(newValue);
  };

  const useContractMethods = tokenContractsList.map((i: any) =>
    i.useContractMethod("unlimitedMint")
  );

  useEffect(() => {
    const status = useContractMethods[props.tokenId].state.status;
    if (status === "Exception") {
      toast.error(
        getTransactionAlertMessage(TransactionAlertStatus.Failed, "mint")
      );
    } else if (status === "Mining") {
      toast.info(
        getTransactionAlertMessage(TransactionAlertStatus.Started, "mint")
      );
    } else if (status === "Success") {
      toast.success(
        getTransactionAlertMessage(TransactionAlertStatus.Succeeded, "mint")
      );
    }
  }, [useContractMethods[props.tokenId].state]);

  const handleTransaction = async () => {
    const { send } = useContractMethods[props.tokenId];
    await send(account, valueToMint.toString());
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
