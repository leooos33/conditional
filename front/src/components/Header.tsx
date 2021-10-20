import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import ConnectButton from "./partials/ConnectButton";
import { ChakraProvider, useDisclosure } from "@chakra-ui/react";
import AccountModal from "./partials/AccountModal";

const useStyles = makeStyles((theme) => ({
  grid: {
    width: "100%",
    margin: "0px",
  },
  box1: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  box2: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
}));

export const Header = () => {
  const classes = useStyles();

  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Grid container className={classes.grid}>
          <Grid item xs={6} md={6} className={classes.box1}></Grid>
          <Grid item xs={6} md={6} className={classes.box2}>
            <ChakraProvider>
              <ConnectButton handleOpenModal={onOpen} />
              <AccountModal isOpen={isOpen} onClose={onClose} />
            </ChakraProvider>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};
