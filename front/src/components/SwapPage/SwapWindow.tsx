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
      tokenList,
      exchanePairSelected: {
        token1: 0,
        token2: 1,
      },
    };
  }

  token1InputChanged(tokenId: string, amount: number) {
    this.setState({
      exchanePairSelected: {
        token1: 1,
        token2: 0,
      },
    });

    // const token1 = this.state.exchanePairSelected.token1;
    // const token2 = this.state.exchanePairSelected.token2;

    // if (tokenId === token2) {
    //   this.setState({
    //     exchanePairSelected: {
    //       token1: tokenId,
    //       token2: token1,
    //     },
    //   });
    // }
  }

  token2InputChanged(tokenId: string, amount: number, cb: any) {
    cb(0);
    this.setState({
      exchanePairSelected: {
        token1: 1,
        token2: 1,
      },
    });
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
            <TokenInput
              tokenInputChanged={this.token1InputChanged.bind(this)}
              tokenList={this.state.tokenList}
              tokenSelected={this.state.exchanePairSelected.token1}
            />
            <Divider textAlign="center">
              <Chip label="↓" />
            </Divider>
            <TokenInput
              tokenInputChanged={this.token2InputChanged}
              tokenList={this.state.tokenList}
              tokenSelected={this.state.exchanePairSelected.token2}
            />
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

export default withStyles(styles, { withTheme: true })(SwapWindow);
