import { makeStyles } from "@mui/styles";
import { Grid, Paper } from "@mui/material";
import TokenAmount from "./TokenAmount";
import TokenSelect from "./TokenSelect";

const useStyles = makeStyles((theme) => ({
  tokenInput: {
    display: "flex",
    flexDirection: "row",
  },
}));

export default function TokenInput() {
  const classes = useStyles();
  return (
    <Paper className={classes.tokenInput}>
      <Grid container spacing={0}>
        <Grid item xs={4}>
          <TokenSelect />
        </Grid>
        <Grid item xs={8}>
          <TokenAmount />
        </Grid>
      </Grid>
    </Paper>
  );
}
