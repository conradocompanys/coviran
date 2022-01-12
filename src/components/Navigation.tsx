import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  IconButton,
  Drawer,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

// components
import AppMenu from "./AppMenu";

// constants
import { DRAWER_WIDTH } from "../utils/constants";
import logoIcon from '../images/coviran-logo.png';

// define css-in-js
const useStyles = makeStyles((theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      boxShadow: "-8px 0px 37px 0px rgb(194 194 194)",
      width: DRAWER_WIDTH,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      boxShadow: "-8px 0px 37px 0px rgb(194 194 194)",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: theme.spacing(0, 1),
      ...theme.mixins.toolbar,
      borderBottom: "1px solid rgba(0, 0, 0, 0.12)"
      // background: `linear-gradient(270deg, ${theme.palette.primary.main} 0%, ${theme.palette.background.default} 70%);`,
    },
    logoIcon: {
      height: "30px",
      marginLeft: "15px"
  
    }
  })
);

// define interface to represent component props
interface NavigationProps {
  open: boolean;
  handleMenuClose: () => void;
}

const Navigation = ({ open, handleMenuClose }: NavigationProps) => {
  const classes = useStyles();
  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <img src={logoIcon} className={classes.logoIcon}/>
        <IconButton onClick={handleMenuClose}>
          <ChevronLeftIcon htmlColor="#30994c" />
        </IconButton>
      </div>
      <AppMenu />
    </Drawer>
  );
};

export default Navigation;
