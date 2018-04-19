import React from 'react'
import {Link} from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'

import Home from 'material-ui-icons/Home';
import Class from 'material-ui-icons/Class';
import People from 'material-ui-icons/People';
import Info from 'material-ui-icons/Info';
import { red, purple, cyan, grey } from 'material-ui/colors';
export const DrawerMenuItems = (
  <div>
    <Divider />
    <List>
    <Link to="/">
      <ListItem button>
        <Home  style={{ fontSize: 28, color:cyan[600]}} />
        <ListItemText primary="Overview" />
      </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
    <Link to="/schoolsList">
      </Link>
    </List>
    <Divider />
    <List>
    <Link to="/courses">
      <ListItem button>
        <Class  style={{fontSize:28, color:cyan[600]}}/>
        <ListItemText primary="Courses" />
      </ListItem>
      </Link>
    </List>
    <Divider />
    <List>
      <Link className="linkStyle" to="/studentsList">
      <ListItem button>
      <People  style={{fontSize:28, color:cyan[600]}}/>
      <ListItemText primary="Student List" />
      </ListItem>
      </Link>
    </List>
    <Divider/>
    <List>
    <Link to="/about">
      <ListItem button>
        <Info  style={{fontSize:28, color:cyan[600]}}/>
        <ListItemText primary="About" />
      </ListItem>
      </Link>
    </List>
  </div>
)


function btn_logout() {
  console.log("CLICK!")
}

const AppBarMenuItems = ({ onClick, logout }) => (
  <div>
    <MenuItem onClick={() => { onClick(); btn_logout(); }}>My account</MenuItem>
    <MenuItem onClick={() => { onClick(); btn_logout(); }}>Logout</MenuItem>
  </div>
)

export const AppBarMenuItemsExport = AppBarMenuItems;
