/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@material-ui/styles";
import { useCount, useContractMethod } from "../../hooks";
import { tokenList } from "../../contracts";
import * as React from "react";
import { connect } from "react-redux";
import { changePairAction } from "../../redux/actions";

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

class SwapWindow extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      label: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.swapTokens();
    this.setState((state: any) => ({
      label: !state.label,
    }));
    console.log(this.state);
  }

  handleTransaction() {}

  render() {
    const { classes } = this.props;
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
          <Stack
            direction="column"
            spacing={2}
            // divider={<Divider orientation="horizontal" flexItem />}
          >
            <TokenInput tokenType={"token1"} />
            <Divider textAlign="center">
              <Chip
                label={this.state.label ? "↓" : "↑"}
                onClick={this.handleChange}
              />
            </Divider>
            <TokenInput tokenType={"token2"} />
            <Button
              variant="contained"
              endIcon={<SendIcon />}
              className={classes.swapButton}
              onClick={this.handleTransaction}
            >
              Buy
            </Button>
          </Stack>
        </Grid>
      </Grid>
    );
  }
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
