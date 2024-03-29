import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Home, ListAlt } from "@material-ui/icons";

interface SidenavProps {
  open: boolean;
  onClose: () => void;
  onMenuItemSelect: (page: string) => void;
}

const Sidenav = ({open, onClose, onMenuItemSelect}: SidenavProps) => {
  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        <ListItem
          button
          onClick={() => {
            onMenuItemSelect("home");
          }}
        >
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button onClick={() => {
            onMenuItemSelect("pokemon");
          }}>
          <ListItemIcon>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary="Pokémon" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidenav;
