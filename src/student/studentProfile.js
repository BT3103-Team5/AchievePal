import React from 'react'
import store from '../store'
import {connect} from "react-redux"
import AppFrame from '../app/AppFrame'
import { red, purple, cyan, grey } from 'material-ui/colors';
import List, { ListItem, ListItemText } from 'material-ui/List'
import Divider from 'material-ui/Divider'
import {Link} from 'react-router-dom'
import Dashboard from "react-dazzle";
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
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { compose } from "redux";

const style = {
  height: "800px",
  width: "800px",
  margin: "20px",
  textAlign: 'center',
  display: 'inline-block',
};





class StudentProfile extends React.Component{

  getRadarData(studentInfo){
    let data01 = [
      { subject: "Completion rate", value: this.getCompletionRate(studentInfo)*200},
      { subject: "login frequencies", value: Math.random()*50+110 },
      { subject: "attempt frequencies", value: Math.random()*120+50 },
      { subject: "quality of solution", value: Math.random()*150+10 },
      { subject: "codecombat", value: this.getCodeCombatLvl(studentInfo)},
      { subject: "other", value: Math.random()*70+50 },
    ];
    return data01;
  }

  getCompletionRate(studentInfo){
    var completedList = studentInfo["Completed"];
    var completed = completedList.length;
    var yetToCompleteList = studentInfo["To_be_complete"];
    var yetToComplete = 0;
    if(yetToCompleteList != null ){
        yetToComplete =yetToCompleteList.length;
    }
    if(completed != 0){
      return completed/(completed+yetToComplete);
    }else{
      return 0;
    }
  }

  getStudentName(){
    if(this.props.location.query != null){
      return this.props.location.query;
    }
    else {
      return "Amir Shaqile";
    }
  }
  studentName = this.getStudentName();
  getDistributionData() {
    if (store.getState().val != null && this.studentInfo != null)  {
      let courseName = this.studentInfo["courseName"];
      if(courseName == null){
        courseName = "BT3103";
      }
      let disData = store.getState().val.Yingxu_CodeCombat_level_distribution_in_each_course[courseName];
      disData.sort(function(a,b){return a["level"]-b["level"]})
      let maxLevel = disData[disData.length-1]["level"];
      console.log('place 1',disData)
      let filledData = [];
      for (var i = 0; i <= maxLevel;i++) {
        filledData.push({"level":i, "frec":0})
      }
      console.log('place 2',disData)
      for (var index in disData) {

        filledData.splice(disData[index]["level"], 1, disData[index]);


      }

      //courseName = this.studentInfo['courseName']
      return (
        <ResponsiveContainer top="20%" width="100%" height="80%">
          <LineChart width={600} height={300} data={filledData}
              margin={{top: 5, right: 10, left: 10, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="level"/>
          <YAxis/>
          <ReferenceLine x={this.getCodeCombatLvl(this.studentInfo)} stroke="green" label="you are here" />
          <Line type="monotone" dataKey="frec" stroke="#8884d8"/>

         </LineChart>
       </ResponsiveContainer>
      )
    } else {
      return <h1>loading..</h1>
    }

  }
  getCodeCombatLvl(studentInfo){
    if(studentInfo != null){
      if(studentInfo["CodeCombat_level"] != null){
        return studentInfo["CodeCombat_level"];
      }else {
        return 0;
      }
    }else{
      return 0;
    }
  }

  findStudentPhoto(sName, state){
    if(sName ==null || state.val == null){
      return "";
    }
    var dict = state.val.Student_Profile;
    for(let key in dict){
      var thisName = dict[key]["Name"];
      if(sName == thisName){
        return dict[key]["photoURL"];
      }
    }
    console.log("Name not found");
    return "";
  }
  findStudentInfo(sName){
    if(sName ==null){
      sName = "Amir Shaqile";
    }
    var student_dict = store.getState().val.Student_Profile;
    console.log(student_dict);
    for(let key in student_dict){
      var thisName = student_dict[key]["Name"];
      console.log("a");
      console.log(thisName);
      if(thisName==sName){
        console.log("successfullly find this student")
        return student_dict[key];
      }
    }
    return "Student Not Found";
  }

  studentInfo = this.findStudentInfo(this.studentName);

  renderAssignment(studentInfo){
    var element = null;
    if(studentInfo["Completed"] != null){
    element =  this.studentInfo["Completed"].map(function(listValue){
        return (
          <List>
          <Link to={{
            pathname:'/',
          }} style={{textDecoration: "none"}}>
            <ListItem button >
             <ListItemText primary={listValue["name"]} />
          </ListItem>
            </Link>
            <Divider/>
          </List>
        )
      })
    }
    return element;
  }


  render(){
    const state = store.getState();
    console.log(this.studentInfo);
    return (
      <div>
      <AppFrame>
        <div id="Student Name Card"
          style={{
          backgroundColor: grey[100],
          position: "absolute",
          top: "100px",
          left: "300px",
          width: "600px",
          height:"300px",
          border: "ridge"
        }}
        >
          <div id="Student Photo"
              style={{
              position:"absolute",
              top: "10px",
              left: "10px",
              width: "150px",
              height: "150px",
              border:"ridge"
            }}>
              <img src={this.findStudentPhoto(this.studentName, state)}
                style={{
                width: "150px"
              }}
              />
          </div>
          <div id="Student Name Card"
            style={{
            position:"absolute",
            left:"170px",
            right: "10px",
            height:"280px",
            border: "ridge"}}>
            <div style={{position: "absolute", top:"10px", left:"10px"}}>
              <h4>Name:   {this.studentName}</h4>
              <h4> Course:   {this.studentInfo["courseName"]}</h4>
              <h4> CodeCombat Level:   {this.studentInfo["CodeCombat_level"]}</h4>

              <div id="Assignment List"
              style={{height: "130px", overflow: "auto"}}>
              Completed Assignments
              {
                this.renderAssignment(this.studentInfo)
              }
              </div>
            </div>
          </div>
       </div>
       <div style={{
         position:"absolute",
         top:"100px",
         left:"930px",
         width: "500px",
         height: "300px",
         border: "ridge"
       }}>
       <h4 style={{position:"absolute", left:"20px"}}> Radar Chart</h4>
       <RadarChart cx={200}  width={450} height={230} style={{position:"absolute", top:"50px", left:"20px"}}
         outerRadius={90} data={this.getRadarData(this.studentInfo)}>
         <PolarGrid />
         <PolarAngleAxis dataKey="subject" />
         <PolarRadiusAxis angle={30} domain={[0, 200]} />
         <Radar  dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />

       </RadarChart>
       </div>
       <div style={{
         position:"absolute",
         top:"500px",
         left:"300px",
         width: "100%",
         height: "300px",
         border: "ridge"
       }}>
       <h3 style={{position:"absolute", left:"20%"}}>CodeCombat Distribution Chart</h3>
       {
         this.getDistributionData()
       }
       </div>
      </AppFrame>
      </div>
    )
  }
}

export default StudentProfile;
