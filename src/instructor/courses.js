import React from 'react'
import store from '../store'
import {connect} from "react-redux"
import AppFrame from '../app/AppFrame'
import TextField from 'material-ui/TextField';
import {Link} from 'react-router-dom'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import { MenuItem } from 'material-ui/Menu'
import { red, purple, cyan, lime, grey } from 'material-ui/colors';
import withStyles from "material-ui/styles/withStyles";

const styles = ()=>({
  "@global": {
  /*  html: {
      background: theme.palette.background.default,
      //background: cyan[500],
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      boxSizing: "border-box"
    }, */
    "div[id=listDiv]": {
      width: "30%",
      height: "600px",
      overflow: "auto",
      backgroundColor: grey[100]
    },
    "div[id=sideByside]": {
      backgroundColor: grey[100],
      float:"right"
    },
    "div[id=TextInput]": {
      position:"absolute",
      top:"100px",
      left:"20%"
    },
    "div[id=searchBar]": {
      position:"absolute",
      top:"100px",
      left:"50%",
      width: "50%"
    },
    "div[id=MenuID]": {
      position:"absolute",
      backgroundColor:grey[50],
      top: "30%",
      left:"50%",
      width:"30%",
      height:"55%",
      overflow:"auto"
    },
    "ListItem[id=firstBtn]": {
      backgroundColor:red[500]
    }
    //"text[id=appBarHeader]":{
      //color: 	red[100]
  //}
  }
});

class courses extends React.Component{

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  } //when store changes, we force to re-render UI

  componentWillUnmount() {
    this.unsubscribe();
  }

  listAllCourses(){
    let i = 0;
    let arr=[];
    let dict=[];
    if(this.props.value.val != null){
      dict = this.props.value.val.Completion_rate_of_each_assignment;
    }
    for (var key in dict) {
      var currName = key;
      arr[i] = currName;
      i = i+1;
    }
    return arr;
  }

  handleName=(event)=>{
    store.dispatch({type:"SET_COURSE", payload:event.target.value});
  }

  openMenu(){
    store.dispatch({type:"SET_COURSE_MENU", payload: true});
  }

  closeMenu(){
    //setTimeout(100);
    store.dispatch({type:"SET_COURSE_MENU", payload: false});
  }

  searchListing(state){
    let arr = [];
    let i = 0;
    let dict = state.val.Completion_rate_of_each_assignment;
    for(let key in dict){
      console.log(typeof key)
      if(this.hasSearchChar(state, key)){
        arr[i] = key;
        i = i+1;
      }
    }
    console.log(arr);
    return arr;
  }

  hasSearchChar(state, courseName){
    let subStr = state.currCourse;
    if(typeof courseName == "string" && subStr != "" && courseName.search(subStr) != -1){
      return true;
    }else{
      return false;
    }
  }

  renderMenu(state){
    if(state.courseMenuOpen){
      return (
        <div id="MenuID" >
          <h4>Search Result</h4><br/>
          {
              this.searchListing(state).map(function (listValue){
              return (
                <List>
                <Link to={{
                  pathname:'/courseChart',
                  query: listValue
                }} style={{textDecoration: "none"}}>
                  <ListItem button >
                   <ListItemText primary={listValue} />
                </ListItem>
                  </Link>
                  <Divider/>
                </List>
              )
            })
          }
        </div>
      );
    }
  }

  render(){
    const state = this.props.value;
    return (
      <div>
      <AppFrame>
      <h2>Courses </h2>
      <div id="listDiv">
      {this.listAllCourses().map(function(course){
        return (
          <List>
          <Link to={{
            pathname:'/courseChart',
            query: course
          }} style={{textDecoration: "none"}}>
            <ListItem button >
              <ListItemText primary={course} />
            </ListItem>
            </Link>
            <Divider/>
          </List>
        )
      })}

      </div>
      <div id="searchBar">
        <h2 style={{position:"absolute", left:"20%"}}> Search My Course</h2>
        <div id="TextInput">
          <TextField
            onChange={this.handleName}
            onFocus={this.openMenu}
            onBlur={()=>{
              setTimeout(100);
              this.closeMenu
            }}
          />
          </div>
        </div>
        {this.renderMenu(state)}

      </AppFrame>
      </div>
    )
  }
}
const mapStateToProps = state =>{
  console.log(store.getState());
  return {value: state}
}

const myCourses = connect(
  mapStateToProps,)(courses)

export default withStyles(styles)(myCourses);
