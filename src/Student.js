import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Student extends React.Component {
  constructor(props) {
    super(props);
    console.log("look", this.props);
    var keyArray = Object.keys(this.props.data);
    this.name = this.props.data[keyArray[0]];
    this.num = this.props.data[keyArray[1]];
  }

  render() {
    return (
      <button ClassName="student">
        <font size={2}>{"student name: " + this.name}</font>
        <br />
        <font size={2}>{"assignments completed: " + this.num}</font>
      </button>
    );
  }
}

export default Student
