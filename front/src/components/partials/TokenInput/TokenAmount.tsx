import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  numberInput: {
    "& input[type=number]": {
      "-moz-appearance": "textfield",
    },
    "& input[type=number]::-webkit-outer-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    "& input[type=number]::-webkit-inner-spin-button": {
      "-webkit-appearance": "none",
      margin: 0,
    },
    height: "100%",
  },
}));

export default function TokenAmount() {
  const classes = useStyles();
  return (
    <TextField
      className={classes.numberInput}
      // label="TextField"
      placeholder="0.0"
      type="number"
      fullWidth
      variant="outlined"
    />
  );
}
