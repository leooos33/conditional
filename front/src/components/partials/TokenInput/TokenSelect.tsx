/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { withStyles } from "@material-ui/styles";

const styles = (theme: any) => ({});

interface IProps {
  onTokenTypeChanged: any;
  tokenList: any;
  tokenSelected: any;
  classes: any;
}

class TokenSelect extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tokenSelected: this.props.tokenSelected,
    };
  }

  handleChange(event: SelectChangeEvent) {
    const newToken: string = event.target.value as string;

    this.changeTokenSelected(parseInt(newToken));
    this.props.onTokenTypeChanged(
      newToken,
      this.changeTokenSelected.bind(this)
    );
  }

  changeTokenSelected(token: number) {
    this.setState({ tokenSelected: token });
  }

  render() {
    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Token</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.tokenSelected}
            label="Token"
            onChange={this.handleChange}
          >
            {this.props.tokenList.map((cur: any, i: number) => {
              return <MenuItem value={i}>{cur.name}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default withStyles(styles)(TokenSelect);
