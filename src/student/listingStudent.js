import React from 'react'
import store from '../store'
import {connect} from "react-redux"
import {Link} from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { red, purple, cyan, grey } from 'material-ui/colors';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';

class OneStudent {
  constructor(n, p){
    this.hisName=n;
    this.hisPhoto=p;
  }
  get findName(){
    return this.hisName;
  }
  get findPhoto(){
    return this.hisPhoto;
  }
}

class listingStudent extends React.Component {
  //the code below may have problem
  //dict = this.props.value.users;

  //dict = this.props.value;
  dict = this.props.value;
  arr = [];
  allStudent(dict){
    var i=0;
    for (var key in dict) {
      var currName = dict[key]["Name"];
      i = i+1;
    }
    return i;
  }
  listAllStudent(dict,arr){
    var i = 0;
    for (var key in dict) {
      var currName = dict[key]["Name"];
      var photoURL = dict[key]["photoURL"]
      var currStudent = new OneStudent(currName, photoURL);
      arr[i]=currStudent;
      i = i+1;
    }
    return arr;
  }
  names = this.listAllStudent(this.dict, this.arr)

  render(){
    return (
    <div >
    <h2>Student Page</h2>
      <text>There are {this.allStudent(this.dict)} users</text>
      <br/>
      <br/>
    <div style={{
      width: "30%",
      height: "530px",
      overflow:"auto",
      borderLeft: "5px ridge",
      backgroundColor: grey[50]}}>

      {this.names.map(function (listValue){
        return (
          <List>
          <Link to={{
            pathname:'/studentProfile',
            query: listValue.hisName
          }} style={{textDecoration: "none"}}>
            <ListItem button >
            <Avatar src={(listValue.hisPhoto)} />
             <ListItemText primary={listValue.hisName} />
          </ListItem>

            </Link>
            <Divider/>
          </List>
        )
      })}
      </div>
    </div>
    )
  }
}

const mapStateToProps = state =>{
  return {value: state.val.Student_Profile}
}

const myStudentList = connect(
  mapStateToProps,)(listingStudent)

export default myStudentList
//export default listingStudent;
