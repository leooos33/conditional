/* eslint-disable @typescript-eslint/no-useless-constructor */
import * as React from "react";
import { createStyles, withStyles } from "@mui/styles";
import { Grid, Paper, Typography } from "@mui/material";
import TokenAmount from "./TokenAmount";
import TokenSelect from "./TokenSelect";

const styles = () =>
  createStyles({
    tokenInput: {
      display: "flex",
      flexDirection: "row",
    },
  });

interface IProps {
  tokenType: string;
  classes: any;
}

class TokenInput extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.tokenInput}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <TokenSelect tokenType={this.props.tokenType} />
          </Grid>
          <Grid item xs={6}>
            <TokenAmount tokenType={this.props.tokenType} />
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Max 8</Typography>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true, index: 1 })(TokenInput);
