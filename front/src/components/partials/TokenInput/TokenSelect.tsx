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
  classes: any;
}

class TokenSelect extends React.Component<IProps, any> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      tokenSelected: "Token A",
    };
  }

  render() {
    const handleChange = (event: SelectChangeEvent) => {
      const newToken: string = event.target.value as string;
      this.setState({ tokenSelected: newToken });
      this.props.onTokenTypeChanged(newToken);
    };

    return (
      <Box>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Token</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={this.state.tokenSelected}
            label="Token"
            onChange={handleChange}
          >
            <MenuItem value={"tokenA"}>Token A</MenuItem>
            <MenuItem value={"tokenB"}>Token B</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  }
}

export default withStyles(styles)(TokenSelect);
