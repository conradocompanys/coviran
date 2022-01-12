import React from "react";
import clsx from "clsx";
import {
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  Tooltip,
  IconButton,
  makeStyles,
  createStyles,
} from "@material-ui/core";
import DefaultIcon from "@material-ui/icons/FileCopy";
import { NavLink, useLocation } from "react-router-dom";

// models
import RouteItem from "../model/RouteItem.model";

// define css-in-js
const useStyles = makeStyles((theme) =>
  createStyles({
    selected: {
      color: "white",
      backgroundColor: `${theme.palette.primary.main}`
      // transition: "box-shadow",
      // transitionDuration: "1s",
      // boxShadow: `0 0 3px ${theme.palette.primary.main}, 0 0 9px ${theme.palette.primary.main}, 0 0 11px ${theme.palette.primary.main}, 0 0 30px ${theme.palette.primary.main}`,
    },
    nested: {
      marginLeft: theme.spacing(2),
    },
    listItemDisabled: {
      cursor: "not-allowed",
    },
    selectedText: {
      color: `${theme.palette.primary.main}`,
      fontWeight: 700
    }
  })
);

interface MenuItemProps {
  route: RouteItem;
}

// functional component
const MenuItem = ({ route }: MenuItemProps) => {
  const classes = useStyles();
  const location = useLocation();

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ): void => {
    if (!route.enabled) e.preventDefault();
  };

  return (
    <NavLink
      to={`${route.path}`}
      style={{ textDecoration: "none", color: "inherit" }}
      key={route.key}
      onClick={handleNavigate}
      className={clsx({
        [classes.listItemDisabled]: !route.enabled,
      })}
    >
      <Tooltip title={route.tooltip || ""} placement="right">
        <ListItem button disabled={!route.enabled}>
          <ListItemIcon>
            <IconButton
              className={clsx({
                [classes.selected]: location.pathname === route.path,
              })}
              size="small"
            >
              <Icon component={route.icon || DefaultIcon} />
            </IconButton>
          </ListItemIcon>
          <ListItemText primary={<span className={clsx({[classes.selectedText]: location.pathname === route.path,})}>{route.title}</span>} />
        </ListItem>
      </Tooltip>
    </NavLink>
  );
};

export default MenuItem;
