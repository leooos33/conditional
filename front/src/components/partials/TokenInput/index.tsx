/* eslint-disable @typescript-eslint/no-useless-constructor */
import * as React from "react";
import { createStyles, withStyles } from "@mui/styles";
import { connect } from "react-redux";
import { Grid, Paper, Typography } from "@mui/material";
import TokenAmount from "./TokenAmount";
import TokenSelect from "./TokenSelect";
import { updateSwapInfo, _Token } from "../../../hooks";
import { AnyTxtRecord } from "dns";

const styles = () =>
  createStyles({
    tokenInput: {
      display: "flex",
      flexDirection: "row",
    },
    maxLabel: {
      paddingLeft: "4px",
    },
  });

class TokenInput extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { classes, amount } = this.props;

    let label: any = "";
    if (amount && this.props.tokenType === "token1") {
      const tokenInfo = this.props.token1 === 0 ? amount.token1 : amount.token2;
      label = (
        <Typography className={classes.maxLabel} variant="body2">
          Max: {_Token(tokenInfo.max)}
        </Typography>
      );
    }
    return (
      <Paper className={classes.tokenInput}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <TokenSelect tokenType={this.props.tokenType} />
          </Grid>
          <Grid item xs={8}>
            <TokenAmount tokenType={this.props.tokenType} />
          </Grid>
          {label}
        </Grid>
      </Paper>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    amount: state.swap.amount,
    token1: state.swap.token1,
    token2: state.swap.token2,
  };
};

export default connect(mapStateToProps)(
  withStyles(styles, { withTheme: true, index: 1 })(TokenInput)
);
