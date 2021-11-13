/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { withStyles } from "@material-ui/styles";
import { tokenList } from "../../../contracts";
import { connect } from "react-redux";
import { setTokenAction } from "../../../redux/actions";

const styles = (theme: any) => ({});
class TokenSelect extends React.Component<any, any> {
  handleChange = (event: SelectChangeEvent) => {
    const newToken: string = event.target.value as string;
    const tokenType: any = this.props.tokenType;
    this.props.changeToken(tokenType, newToken);
  };

  render() {
    const tokenSelected: any = this.props[this.props.tokenType];
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Token</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={tokenSelected}
            label="Token"
            onChange={this.handleChange}
          >
            {tokenList.map((cur: any, i: number) => {
              return <MenuItem value={i}>{cur.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    token1: state.swap.token1,
    token2: state.swap.token2,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    changeToken: (tokenType: any, token: any) => {
      dispatch(setTokenAction(tokenType, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(TokenSelect));
