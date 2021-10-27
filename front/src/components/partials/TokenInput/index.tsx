/* eslint-disable @typescript-eslint/no-useless-constructor */
import * as React from "react";
import { createStyles, withStyles } from "@material-ui/styles";
import { Grid, Paper } from "@mui/material";
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
          <Grid item xs={8}>
            <TokenAmount tokenType={this.props.tokenType} />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TokenInput);
