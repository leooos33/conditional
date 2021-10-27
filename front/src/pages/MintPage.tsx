import { createStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { connect } from "react-redux";
import TestTokenSelect from "../components/MintPage/TestTokenSelect";
import { tokenList } from "../contracts";

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

class MintPage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {};

    this.handleTransaction = this.handleTransaction.bind(this);
  }

  handleTransaction() {}

  render() {
    const { classes } = this.props;
    const tokenName = tokenList[this.props.token].name;
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
          <Stack direction="column" spacing={10}>
            <Typography className={classes.label}>
              Mint {tokenName} for free and test our app.
            </Typography>
            <TestTokenSelect />
            <Button
              variant="contained"
              className={classes.swapButton}
              onClick={this.handleTransaction}
            >
              Mint
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token: state.mint.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MintPage));
