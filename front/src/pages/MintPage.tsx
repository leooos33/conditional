/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { useEthers } from "@usedapp/core";
import { connect } from "react-redux";
import TestTokenSelect from "../components/MintPage/TestTokenSelect";
import { tokenList } from "../contracts";
import {
  useCount,
  tokenContractsList,
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
  const params = useBlockchainParams();
  const { account } = useEthers();
  console.log(params, account);

  const useContractMethods = tokenContractsList.map(
    (i: any) => i.useContractMethod("unlimitedMint").send
  );

  const handleTransaction = () => {
    useContractMethods[props.tokenId](account, 100);
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
            Mint free ERC20 token and test our app.
          </Typography>
          <TestTokenSelect />
          <Button
            variant="contained"
            className={classes.swapButton}
            onClick={() => handleTransaction()}
          >
            Mint 100 of {tokenName}
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
