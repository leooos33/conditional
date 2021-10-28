/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@material-ui/styles";
// import { useCount, useContractMethod } from "../../hooks";
import { tokenList } from "../../contracts";
import * as React from "react";
import { connect } from "react-redux";
import { changePairAction } from "../../redux/actions";
import { useState } from "react";
import { useBuy } from "../../hooks/orderBookContractHook";

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

  const { send: buy } = useBuy();

  const handleChange = () => {
    props.swapTokens();
    setLabel(!label);
    console.log(label);
  };

  const handleTransaction = () => {
    buy(0, 10, 1000);
  };

  const { classes } = props;
  return (
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
            <Chip label={label ? "↓" : "↑"} onClick={() => handleChange()} />
          </Divider>
          <TokenInput tokenType={"token2"} />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className={classes.swapButton}
            onClick={() => handleTransaction()}
          >
            Buy
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    swapTokens: () => {
      dispatch(changePairAction());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SwapWindow));
