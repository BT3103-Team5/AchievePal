import { createStore } from 'redux';
import defaultJSON from "./defaultData/project.json";

const reducer = (state = {}, action) => {
  switch(action.type) {
  case 'SET_VAL':
    return {
      ...state,
      val: action.payload
      };
  case "SET_CUSTOM": {
    return {
      ...state,
      custom: action.payload
      };
    }
  case "SET_NAME":{
      return{
        ...state,
        currName: action.payload
      };
    }
  case "SET_NAME_MENU":{
      return{
        ...state,
        nameMenuOpen:action.payload
      };
    }
  case "SET_COURSE_MENU":{
        return{
          ...state,
          courseMenuOpen:action.payload
        };
    }
  case "SET_COURSE":{
        return{
          ...state,
          currCourse:action.payload
        };
    }


// Handle other actions here
default:
return state;
  }
};

const defaultState = {
  val: defaultJSON,
  currName: "",
  nameMenuOpen: false,
  currCourse: "",
  courseMenuOpen: false
};

const store = createStore(reducer, defaultState);
export default store;
