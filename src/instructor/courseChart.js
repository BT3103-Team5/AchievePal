import React from 'react'
import store from '../store'
import AppFrame from '../app/AppFrame'
import { red, purple, cyan, grey, lime } from 'material-ui/colors';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as V from "victory";
import Student from "../Student";
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryStack,
  VictoryTooltip,
  VictoryLabel,
} from "victory";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  PieChart,
  Pie,
  LineChart,
  ScatterChart,
  Scatter,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  LabelList,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { compose } from "redux";
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';



const defaultScatterData=[
  {x:7,y:4,name:"Alice"},
  {x:2,y:3,name:"Robert"},
  {x:3,y:1,name:"Bob"},
  {x:4,y:6,name:"Sherman"},
  {x:4,y:3,name:"Lily"},
  {x:5,y:5,name:"Brane"},
  {x:7,y:5,name:"Rose"},
];



class CompletedAssignment extends React.Component {
  render() {
    return (
      <VictoryChart
        height={150} width={450}
        domainPadding={0}
        theme={VictoryTheme.material}>

        <VictoryAxis
          tickFormat={()=> ''}
        />

        <VictoryAxis
          dependentAxis
          style={{
            tickLabels: { fontSize: 5, padding: 3 }
          }} />

        <VictoryBar
          style={{ data: { fill: "#21b3d2" } }}
          alignment="start"
          data={this.props.data}
          x="x"
          y="y"
          labels={(d) => d.x}
          labelComponent={<VictoryTooltip/>}
        />
      </VictoryChart>
    )
  }
}

class DueAssignmentst extends React.Component {
  getStyles() {
    const BLUE_COLOR = "#00a3de";
    const RED_COLOR = "#7c270b";

    return {
      parent: {
        background: "#ccdee8",
        boxSizing: "border-box",
        display: "inline",
        padding: 0,
        fontFamily: "'Fira Sans', sans-serif",
        maxWidth: "50%",
        height: "auto"
      },
      title: {
        textAnchor: "start",
        verticalAnchor: "end",
        fill: "#000000",
        fontFamily: "inherit",
        fontSize: "18px",
        fontWeight: "bold"
      }
    };
  }

  render() {
    const styles = this.getStyles();

    return (
      <svg
        style={{ background: "lightgrey", width: "100%", height: "100%" }}
      >
        <VictoryLabel
          x={25}
          y={24}
          style={styles.title}
          text="Assignment dues soon"
        />
        <g transform={"translate(50, 50)"}>
          <VictoryChart
            padding="20"
            standalone={false}
            height={200}
            width={200}
            domainPadding={5}
            theme={VictoryTheme.material}
          >
            <VictoryAxis tickFormat={() => ""} />

            <VictoryAxis dependentAxis tickFormat={() => ""} />

            <VictoryBar
              style={{ data: { fill: "tomato" } }}
              data={this.props.data}
              x="Date"
              y="Num"
            />
          </VictoryChart>
        </g>
      </svg>
    );
  }
}

class StudentList extends React.Component {
  constructor(props) {
    super(props);
    this.dict = this.props.data;
  }

  handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    // Now send the message throught the backend API
  }


  render() {
    return (
          <table>
            <tr><th style={{textAlign: "center"}}>
              Student Name
              </th><th style={{textAlign: "center"}}>Number of Assginments Completed</th></tr>
            {this.dict.map(function(listValue) {
              return (
                <tr>
                  <td>{listValue["x"]}</td>
                  <td style={{textAlign: "center"}}>{listValue["y"].toFixed(2) * 100}</td>
                </tr>
              );
            })}
          </table>
    );
  }
}


class courseChart extends React.Component{

  JSON_Value = {};
  getCourseString(){
    let courseName = "";
    if(this.props.location.query != null){
      courseName = this.props.location.query;
    }else{
      courseName = "BT3103";
    }
    return courseName;
  }
  courseName = this.getCourseString();
  getCourseData(){
    let JSON_Data = null;
    if(this.props.value != null ) {
      JSON_Data = this.props.value.Completion_rate_of_each_assignment;
    }else{
      JSON_Data = null;
    }
    return JSON_Data;
  }
  JSON_Value = this.getCourseData();

  getDuesData() {
    var duesData=null;

    if(this.props.value != null) {
      duesData = this.props.value["Assignments_due_on_the_following_days"];

    }
    var duesDataArray = [];
    for (var key in duesData) {
      duesDataArray.push({ Date: key, Num: duesData[key].length });
    }
    return duesDataArray;
  }
  duesArray=this.getDuesData();

  getStuArray() {
    var allStuData=null;
    if(this.props.value != null && this.courseName != "NULL"){
      allStuData = this.props.value["Number_of_assignments_completed_by_each_student"];
      var stuDataForCourse = allStuData[this.courseName]["data"];
      return stuDataForCourse;
    } else {
      return [];
    }
  }

//new
  getInstructor() {
    var ins = null;
    if(this.props.value != null && this.courseName != "NULL"){
      ins = this.props.value["Course_Profile"][this.courseName]["Instructor"];
    }
    return ins;
  }


  getAvgLevel() {
    var avgLvl = null;
    if(this.props.value != null && this.courseName != "NULL"){
      var lvlArr = this.props.value["Student_CodeCombat_level_distribution_in_each_course"][this.courseName];
    }
    var lvlSum = 0;
    var numStudents = 0;
    for(var lvl in lvlArr){
      lvlSum += lvl * lvlArr[lvl];
      numStudents += lvlArr[lvl];
    }
    avgLvl = lvlSum/numStudents;
    return avgLvl;
  }

  getAvgNumAssignments() {
    var avgNum = null;
    if(this.props.value != null && this.courseName != "NULL"){
      var numArr = this.props.value["Number_of_assignments_completed_by_each_student"][this.courseName]["data"];
    }
    var numSum = 0
    var numStudents = 0
    for(var index in numArr){
      numSum += numArr[index]["y"];
      numStudents += 1;
    }
    avgNum = numSum/numStudents;
    return avgNum;
  }

  stuArray = this.getStuArray();

  countKeys(JSON_Value){
    let i=0;
    for( var key in JSON_Value){
      i = i+1;
    }
    return i;
  }
  Data01 =[];
  create01(JSON_Value, name){
    let arr=[];
    if(JSON_Value != null){
      arr = JSON_Value[name].data;
    }else{
      arr = [];
    }
    return arr;
  }
  Data01 = this.create01(this.JSON_Value, this.getCourseString());

  // functions for the scatter Charts
  getScatterData(){
    let dict = store.getState().val;
    let data=null;
    if(this.courseName != null && dict.Course_Profile[this.courseName] != null ){
      data = dict.Course_Profile[this.courseName]["scatter"];
      return data;
    }else{
      return defaultScatterData;
    }
  }



  render(){
    console.log(this.getScatterData())
    return (

      <div>
      <AppFrame>
        <div style={{ width: "100%"}}>
        <h3 style={{textAlign: "center"}}>{this.getCourseString()}</h3>
        <Widget handleNewUserMessage={this.handleNewUserMessage}
            title = "chatbox"
          />



        <div style = {{padding:"10px", height:"400px", width:"100%"}}>
        <div style={{


          width: "55%",
          height:"100%",
          float:"left",
        }}>
         <h3 style={{float:"left"}}>Completion-Time Chart</h3>
         <ResponsiveContainer width="100%" height="80%">
         <ScatterChart
          margin={{ top: 60, right: 20, bottom: 10, left: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" domain={['dataMin - 2', 'dataMax + 2']} dataKey={"x"} name="Assignment Completion" unit="" />
          <YAxis type="number" dataKey={"y"} name="Average Delay" unit="Days" />
          <ZAxis type="category" dataKey={'name'} name='Name'/>

          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="Students" data={this.getScatterData()} fill="#8884d8" >
          </Scatter>
          </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div
          style= {{

            marginLeft:"65%",
            width: "35%",
            height:"100%"
          }}>
        <table>
        <tr><td>Instructor: </td><td><b>{this.getInstructor()}</b></td></tr>
        <tr><td>Number of students: </td><td><b>{this.stuArray.length}</b></td></tr>
      <tr><td>Number of assignments: </td><td><b>{this.countKeys(this.props.value["Course_Profile"][this.getCourseString()]["Assignments_and_CompletionRate"])}</b></td></tr>
        <tr><td>Average number of Assignments completed: </td><td><b> {this.getAvgNumAssignments().toFixed(2)}</b></td></tr>
        <tr><td>Average CodeCombat Level: </td><td><b>{this.getAvgLevel().toFixed(2)}</b></td></tr>
        </table>
        </div>
        </div>

        <br/>
        <div style={{padding:"10px", height:"400px", width:"100%"}}>
        <div style={{

          float: "left",
          height: "100%",
          width: "45%",
          overflow: "auto",
          borderRadius:"10px"}}>
            <StudentList data={this.stuArray} />
        </div>
        <div style={{

          width: "45%",
          overflow: "auto",
          height:"100%",
          marginLeft:"55%",
          borderRadius:"10px"}}>
          <table>
          <tr><th style={{textAlign: "center"}}>
            Assignment Title
          </th><th style={{textAlign: "center"}}>Completion Rate</th></tr>
          {this.Data01.map(function (element){
            return<tr><td >{element["x"]}</td><td style={{textAlign: "center"}}>{element["y"].toFixed(2) * 100}%</td></tr>
          })}
          </table>
        </div>
        </div>
      </div>
      </AppFrame>
      </div>
    )
  }
}
const mapStateToProps = state =>{

  return {value: state.val}
}

const myCourseChart = connect(
  mapStateToProps,)(courseChart)

export default myCourseChart;
