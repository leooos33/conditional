/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { connect } from "react-redux";
import TestTokenSelect from "../components/MintPage/TestTokenSelect";
import { tokenList } from "../contracts";
import {
  useCount,
  useContractMethod,
  mintTokenA,
  useBlockchainParams,
} from "../hooks";

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

function MintPage(props: any) {
  const { classes } = props;
  const tokenName = tokenList[props.tokenId].name;
  const count = useCount();
  const params = useBlockchainParams();
  console.log(params);

  // const useContractMethods = tokenContractsList.map(
  //   (i: any) => i.useContractMethod("unlimitedMint").send
  // );

  const { state, send: mintA } = mintTokenA();

  const handleTransaction = () => {
    // useContractMethods[props.tokenId](100);
    mintA("0x6268Bd80C7902B480c9232354f4E1C2E73f77238", 100);
  };

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
            Mint free ERC20 token and test our app{" "}
            {count ? count.toNumber() : 0}.
          </Typography>
          <TestTokenSelect />
          <Button
            variant="contained"
            className={classes.swapButton}
            onClick={() => handleTransaction()}
          >
            Mint {tokenName}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => {
  return {
    tokenId: state.mint.token,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(MintPage));
