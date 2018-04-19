import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Root from "./Router";
import firebase from "firebase";
import AppFrame from "./app/AppFrame";
import Dashboard from "react-dazzle";
//import Victory from './Victory';
import { Provider } from "react-redux";
import store from "./store";
//const {XAxis, YAxis, CartesianGrid, Tooltip, Legend} = Recharts;
// CHANGE HERE
var config = {
    apiKey: "AIzaSyB5D53GyUldCIq4bYh0h0sszxtlmoTPDU0",
    authDomain: "bt3103-hosting.firebaseapp.com",
    databaseURL: "https://bt3103-hosting.firebaseio.com",
    projectId: "bt3103-hosting",
    storageBucket: "bt3103-hosting.appspot.com",
    messagingSenderId: "826697962498"
  };

try {
    firebase.initializeApp(config);
    console.log("Successfal Initialize");
} catch (error) {
  console.log(error)
}

var db = firebase.database();
db.ref("/").on("value", data => {
  if (data.val()) {
    store.dispatch({ type: "SET_VAL", payload: data.val() });
    console.log("dispatched & displaying getstate:");
    console.log(store.getState());
  }
});
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Root />
        </Provider>
        </BrowserRouter>,
    document.getElementById("root")
  );

//render(<App />, document.getElementById('root'));
