import React from 'react';
import { render } from 'react-dom';
import AppFrame from './AppFrame'
import store from '../store'

class App extends React.Component{
  constructor(props) {
    super(props);
    var duesData = null;
    if(store.getState().val != null){
     duesData = store.getState().val['Assignments_due_on_the_following_days'];
   }else{
     duesData = [];
   }
    var key;
    var duesDataArray = new Array();
    for (key in duesData) {
      duesDataArray.push({ Date: key, Num: duesData[key].length, titles: duesData[key] });
    }
    this.duesDataArray = duesDataArray;
  }



  render(){
    return(
      <div>
      <AppFrame>
        <h1>Welcome to AchievePal</h1>
      </AppFrame>
      </div>
    )
  }
}

export default App;
