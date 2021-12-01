/* eslint-disable react-hooks/rules-of-hooks */
import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import FormControl from "@mui/material/FormControl"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { withStyles } from "@mui/styles"
import { connect } from "react-redux"
import { tokenList } from "@web3"
import { createStyles } from "@mui/material"
import { setMintTokenAction } from "@state/actions"

const styles = () =>
    createStyles({
        contentContainer: {
            width: "100%",
            margin: "0px",
            justifyContent: "center"
        },
        swapBox: {
            backgroundColor: "white"
        },
        swapButton: {
            marginTop: "10%"
        }
    })

class TestTokenSelect extends React.Component<any, any> {
    handleChange = async (event: SelectChangeEvent) => {
        const newToken: string = event.target.value as string

        this.props.changeToken(newToken)
    }

    render() {
        return (
            <Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Token</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={this.props.token}
                        label="Token"
                        onChange={this.handleChange}
                    >
                        {tokenList.map((cur: any, i: number) => {
                            return (
                                <MenuItem key={i.toString()} value={i}>
                                    {cur.name}
                                </MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>
            </Box>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        token: state.mint.token
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        changeToken: (token: any) => {
            dispatch(setMintTokenAction(token))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles, { index: 1 })(TestTokenSelect))
