/* eslint-disable react-hooks/rules-of-hooks */
import Grid from "@mui/material/Grid";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, createStyles, Divider } from "@mui/material";
import { withStyles } from "@material-ui/styles";
// import { useCount, useContractMethod } from "../../hooks";
import { orderBookContractAddress, tokenList } from "../../contracts";
import { connect } from "react-redux";
import { approveTokenAction, changePairAction } from "../../redux/actions";
import { useState } from "react";
import { useBuy, useGetOrder } from "../../hooks/orderBookContractHook";
import {
  maxApproval,
  tokenContractsList,
  tokenDigits,
  useBlockchainParams,
} from "../../hooks";
import { useEthers } from "@usedapp/core";

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

  const { account } = useEthers();

  const useContractMethodsApprove = tokenContractsList.map(
    (i: any) => i.useApprove().send
  );

  // const init = async () => {
  //   const order = await useGetOrder(0);
  //   console.log("Amount:", order.amount?.toNumber());
  //   console.log("Initial:", order.initial_amount?.toNumber());
  // };

  // init();

  const handleSwap = () => {
    props.swapTokens();
    setLabel(!label);
    console.log(props.tokenToApproveId);
  };

  const handleTransaction = () => {
    buy(0, 25 * tokenDigits, 1000 * tokenDigits);
  };

  const handleTransactionApprove = async () => {
    console.log("S", props.tokenToApproveId);
    // await here could pause the transaction
    useContractMethodsApprove[props.tokenToApproveId](orderBookContractAddress);
    props.approveToken(props.tokenToApproveId);
  };

  const { classes } = props;

  let button;
  if (props.tokenToApproveId === -1) {
    button = (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransaction()}
      >
        Buy
      </Button>
    );
  } else {
    button = (
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        className={classes.swapButton}
        onClick={() => handleTransactionApprove()}
      >
        Approve {tokenList[props.tokenToApproveId].name}
      </Button>
    );
  }
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
            <Chip label={label ? "↓" : "↑"} onClick={() => handleSwap()} />
          </Divider>
          <TokenInput tokenType={"token2"} />
          {button}
        </Stack>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1,
    token2: state.swap.token2,
    approvedTokenList: state.swap.approvedTokenList,
    tokenToApproveId: state.swap.tokenToApproveId,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    swapTokens: () => {
      dispatch(changePairAction());
    },
    approveToken: (tokenId: number) => {
      dispatch(approveTokenAction(tokenId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(SwapWindow));
