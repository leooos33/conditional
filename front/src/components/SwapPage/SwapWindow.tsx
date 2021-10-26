import { useState } from "react";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@material-ui/styles";
import TokenInput from "../partials/TokenInput";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import { Chip, Divider, Typography } from "@mui/material";
import { useCount, useContractMethod } from "../../hooks";

const useStyles = makeStyles((theme) => ({
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
}));

export const SwapWindow = () => {
  const classes = useStyles();
  const count = useCount();

  const { state, send: incrementCount } = useContractMethod("incrementCount");
  const { state: setCountState, send: setCount } =
    useContractMethod("setCount");

  const [input, setInput] = useState("");

  function handleIncrement() {
    incrementCount();
  }

  function handleTransaction() {
    handleInput("500");
    const _count = parseInt(input);
    if (_count) {
      setCount(_count);
    }
  }

  function handleInput(valueAsString: string) {
    setInput(valueAsString);
  }

  function tokenInputChanged(token: string, amount: number) {
    alert(token + amount);
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
        <Stack
          direction="column"
          spacing={2}
          // divider={<Divider orientation="horizontal" flexItem />}
        >
          <TokenInput tokenInputChanged={tokenInputChanged} />
          <Divider textAlign="center">
            <Chip label="↓" />
          </Divider>
          <TokenInput tokenInputChanged={tokenInputChanged} />
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            className={classes.swapButton}
            onClick={handleTransaction}
          >
            Buy
          </Button>
          <Typography>{count ? count.toNumber() : 0}</Typography>
        </Stack>
      </Grid>
    </Grid>
  );
};
