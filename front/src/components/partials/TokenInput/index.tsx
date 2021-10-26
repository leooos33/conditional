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

interface ITokenProps {
  tokenInputChanged: any;
  classes: any;
}

class TokenInput extends React.Component<ITokenProps, any> {
  render() {
    const { classes } = this.props;

    const onTokenTypeChanged = (token: string) => {
      this.props.tokenInputChanged(token, 0);
    };

    return (
      <Paper className={classes.tokenInput}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <TokenSelect onTokenTypeChanged={onTokenTypeChanged} />
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
