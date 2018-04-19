import React from 'react'
import {Link} from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'

import Home from 'material-ui-icons/Home';
import Class from 'material-ui-icons/Class';
import Refresh from 'material-ui-icons/Refresh';
import People from 'material-ui-icons/People';
import Info from 'material-ui-icons/Info';
import { red, purple, cyan, grey, lime } from 'material-ui/colors';
import Button from 'material-ui/Button'
import store from '../store'

class sideList extends React.Component{

  handleStudentClick() {
      console.log("Click happened");
      // Change this as well.
      let yourUrl =
        "https://a7j7jfazna.execute-api.ap-southeast-1.amazonaws.com/prod/Student_Profile"
      // This is for security feature
      fetch(yourUrl, { mode: "no-cors" }).then(function(response) {
        console.log("Fetched ", yourUrl);
      });
    }
    handleCourseClick() {
        console.log("Click happened");
        // Change this as well.
        let yourUrl =
          "https://jiu1ghym6g.execute-api.ap-southeast-1.amazonaws.com/prod/Course_Profile"
        // This is for security feature
        fetch(yourUrl, { mode: "no-cors" }).then(function(response) {
          console.log("Fetched ", yourUrl);
        });
      }

  render(){
    const state = store.getState();
    return (
      <div style={{
          width: "16%",
          height: "800px",
          backgroundColor: grey[200]
      }}>
        <div style={{
            position: "absolute",
            top: "50%",
            width: "10%",
            height:"7%"
          }}>
          <Button  onClick={() => this.handleStudentClick()}>
            <Refresh  style={{fontSize:28, color: cyan[600]}}/>Refresh Student Data
          </Button>
        </div>
        <div style={{
            position: "absolute",
            top: "60%",
            width: "10%",
            height:"7%"
          }}>
          <Button  onClick={() => this.handleCourseClick()}>
            <Refresh  style={{fontSize:28, color: cyan[600]}}/>Refresh Course Data
          </Button>
        </div>
      <br/>
      <br/>
      <br/>
      <link ref="shortcut icon" href="./imges/favicon.ico"/>
      <Divider />
      <List>
      <Link to="/" style={{textDecoration: "none"}}>
        <ListItem button>
          <Home style={{ fontSize: 28, color: cyan[600] }} />
          <ListItemText primary="Home" />
        </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
      <Link to="/courses" style={{textDecoration: "none"}}>
        <ListItem button>
          <Class  style={{fontSize:28, color: cyan[600]}}/>
          <ListItemText primary="Courses" />
        </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <Link className="linkStyle" to="/studentsList" style={{textDecoration: "none"}}>
        <ListItem button>
        <People  style={{fontSize:28, color: cyan[600]}}/>
        <ListItemText primary="Student List" />
        </ListItem>
        </Link>
      </List>
      <Divider/>
      <List>
      <Link to="/about" style={{textDecoration: "none"}}>
        <ListItem button>
          <Info style={{fontSize:28, color: cyan[600]}}/>
          <ListItemText primary="About" />
        </ListItem>
        </Link>
      </List>
      </div>
    )
  }
}

export default sideList;
