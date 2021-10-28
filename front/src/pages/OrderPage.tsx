/* eslint-disable react-hooks/rules-of-hooks */
import { createStyles, withStyles } from "@material-ui/styles";
import { Button, Grid, Stack } from "@mui/material";
import { connect } from "react-redux";
import { orderBookContractAddress, tokenList } from "../contracts";
import {
  tokenContractsList,
  tokenDigits,
  useBlockchainParams,
  useGetOrder,
  usePlaceOrder,
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

function OrderPage(props: any) {
  const { classes } = props;

  const useContractMethodApprove = tokenContractsList.map(
    (i: any) => i.useContractMethod("approve").send
  );
  const { send: placeOrder } = usePlaceOrder();
  const params = useBlockchainParams();

  const handleTransaction = () => {
    // Place Order A
    useContractMethodApprove[0](orderBookContractAddress, 60 * tokenDigits);
    placeOrder(
      tokenList[0].address,
      tokenList[1].address,
      [
        20 * tokenDigits,
        30 * tokenDigits,
        40 * tokenDigits,
        50 * tokenDigits,
        60 * tokenDigits,
      ],
      [
        1 * tokenDigits,
        2 * tokenDigits,
        3 * tokenDigits,
        4 * tokenDigits,
        5 * tokenDigits,
      ],
      params + 1000000000
    );
  };

  const handleTransaction2 = () => {
    // Place Order B
    useContractMethodApprove[1](orderBookContractAddress, 60 * tokenDigits);
    placeOrder(
      tokenList[1].address,
      tokenList[0].address,
      [
        20 * tokenDigits,
        30 * tokenDigits,
        40 * tokenDigits,
        50 * tokenDigits,
        60 * tokenDigits,
      ],
      [
        (1 / 20) * tokenDigits,
        (2 / 30) * tokenDigits,
        (3 / 40) * tokenDigits,
        (4 / 50) * tokenDigits,
        (5 / 60) * tokenDigits,
      ],
      params + 1000000000
    );
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
          <Button
            variant="contained"
            className={classes.swapButton}
            onClick={() => handleTransaction()}
          >
            Place one-sided Order on A
          </Button>
          <Button
            variant="contained"
            className={classes.swapButton}
            onClick={() => handleTransaction2()}
          >
            Place one-sided Order on B
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { withTheme: true })(OrderPage));
