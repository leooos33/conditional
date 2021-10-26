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
  tokenInputChanged: any;
  tokenList: any;
  tokenSelected: any;
  classes: any;
}

class TokenInput extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
  }

  onTokenTypeChanged(token: string, cb: any) {
    this.props.tokenInputChanged(token, 0, cb);
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper className={classes.tokenInput}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <TokenSelect
              onTokenTypeChanged={this.onTokenTypeChanged}
              tokenList={this.props.tokenList}
              tokenSelected={this.props.tokenSelected}
            />
          </Grid>
          <Grid item xs={8}>
            <TokenAmount />
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles, { withTheme: true })(TokenInput);
