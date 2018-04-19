import React from 'react';
import AppFrame from '../app/AppFrame'
import store from '../store'
import ListingStudent from './listingStudent';
import TextField from 'material-ui/TextField';
import { red, purple, cyan, grey } from 'material-ui/colors';
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {Link} from 'react-router-dom'


class studentsList extends React.Component{
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate());
  } //when store changes, we force to re-render UI

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleName=(event)=>{
    store.dispatch({type:"SET_NAME", payload:event.target.value});
  }

  openMenu(){
    store.dispatch({type:"SET_NAME_MENU", payload: true});
  }

  closeMenu(){
    //setTimeout(100);
    store.dispatch({type:"SET_NAME_MENU", payload: false});
  }

  searchListing(state){
    let arr = [];
    let i = 0;
    let dict = state.val.Student_Profile;
    for(let key in dict){
      let currentName = dict[key]["Name"];
      if(this.hasSearchChar(state, currentName)){
        arr[i] = currentName;
        i = i+1;
      }
    }
    return arr;
  }

  hasSearchChar(state, userName){
    let subStr = state.currName;
    if(typeof userName == "string" && subStr != "" && userName.search(subStr) != -1){
      return true;
    }else{
      return false;
    }
  }

  renderMenu(state){
    if(state.nameMenuOpen){
      return (
        <div style={{position:"absolute",
                    backgroundColor:grey[50],
                    top: "30%",
                    left:"50%",
                    width:"30%",
                    height:"55%",
                    overflow:"auto"}}
        >
          <h4>Search Result</h4><br/>
          {
              this.searchListing(state).map(function (listValue){
              return (
                <List>
                <Link to={{
                  pathname:'/studentProfile',
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
    const state = store.getState();
    return (
      <div>
        <AppFrame>
        <div style={{
          position:"absolute",
          top:"10%",
          left: "50%",
          hight: "10%",
          width: "50%"
        }}>
          <h2 style={{position:"absolute", left:"20%"}}> Search My Name</h2>
          <div id="Text input" style={{
            position:"absolute",
            top:"100px",
            left:"20%"
          }}>
            <TextField
              onChange={this.handleName}
              onFocus={this.openMenu}
              onBlur={()=>{
                setTimeout(100);
                this.closeMenu
              }}/>
            </div>
          </div>

          {this.renderMenu(state)}
          <ListingStudent/>

        </AppFrame>
      </div>
    );
  }
}

export default  studentsList;
