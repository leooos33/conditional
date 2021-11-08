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
  const convert = (val: number) => Math.round(val * tokenDigits).toString();

  const handleTransaction = async () => {
    // Place Order A
    // useContractMethodApprove[0](orderBookContractAddress, convert(60));
    const res = await placeOrder(
      tokenList[0].address,
      tokenList[1].address,
      [convert(20), convert(30), convert(40), convert(50), convert(60)],
      [convert(1), convert(2), convert(3), convert(4), convert(5)],
      params + 1000000000
    );
    console.log(res);
  };

  const handleTransaction2 = () => {
    // Place Order B
    // useContractMethodApprove[1](orderBookContractAddress, convert(60));
    placeOrder(
      tokenList[1].address,
      tokenList[0].address,
      [[convert(20), convert(30), convert(40), convert(50), convert(60)]],
      [
        convert(1 / 20),
        convert(2 / 30),
        convert(3 / 40),
        convert(4 / 50),
        convert(5 / 60),
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
