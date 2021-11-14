import TextField from "@mui/material/TextField";
import { withStyles } from "@mui/styles";
import * as React from "react";
import { connect } from "react-redux";
import { setAmountAction, setTokenValueAction } from "../../../redux/actions";
import { SelectChangeEvent } from "@mui/material";
import { getAmount, isValidInput, Token, _Token } from "../../../hooks";
import { BigNumber } from "@ethersproject/bignumber";
import { tokenList } from "../../../contracts";

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
  constructor(props: any) {
    super(props);
    this.state = {
      tokenValue: this.props[this.props.tokenType],
    };
  }

  handleChange = async (event: any) => {
    let input: any = event.target.value;
    const tokenType: any = this.props.tokenType;

    if (!input) {
      this.setState({ tokenValue: input });
      return;
    }

    const lastInput = input.toString()[input.toString().length - 1];
    const firstInput = input.toString()[0];
    if (lastInput === "." || (firstInput !== "0" && lastInput === "0")) {
      this.setState({ tokenValue: input });
      return;
    }

    input = parseFloat(input);

    this.setState({ tokenValue: input.toString() });
    this.props.changeValue(tokenType, input);
  };

  //TODO: remove all console.log from entire document;
  render() {
    // const tokenValue: string = this.props[this.props.tokenType];
    const { tokenValue } = this.state;

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
    token: state.swap.token1,
    token1: state.swap.token1_value,
    token2: state.swap.token2_value,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeValue: (tokenType: any, value: any, amount?: any) => {
      dispatch(setTokenValueAction(tokenType, value, amount));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles, { index: 1 })(TokenAmount));
