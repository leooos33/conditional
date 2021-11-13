import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import * as React from "react";
import { connect } from "react-redux";
import { setAmountAction, setTokenValueAction } from "../../../redux/actions";
import { SelectChangeEvent } from "@mui/material";
import { getAmount, Token, _Token } from "../../../hooks";
import { BigNumber } from "@ethersproject/bignumber";

const styles = (theme: any) => ({
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
});
class TokenAmount extends React.Component<any, any> {
  handleChange = async (event: any) => {
    const input: any = event.target.value;
    const tokenType: any = this.props.tokenType;
    this.props.changeValue(tokenType, input);
  };

  //TODO: remove all console.log from entire document;
  render() {
    const tokenValue: string = this.props[this.props.tokenType];

    const { classes } = this.props;
    return (
      <TextField
        className={classes.numberInput}
        // label="TextField"
        placeholder="0.0"
        type="number"
        fullWidth
        value={tokenValue}
        inputProps={{
          readOnly: this.props.tokenType === "token1" ? false : true,
        }}
        variant="outlined"
        onChange={this.handleChange}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1_value,
    token2: state.swap.token2_value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeValue: (tokenType: any, value: any) => {
      dispatch(setTokenValueAction(tokenType, value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { index: 1 })(TokenAmount));
