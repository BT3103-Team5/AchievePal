import React from 'react'
import store from '../store'
import {connect} from "react-redux"
import AppFrame from "./AppFrame"
class About extends React.Component{
  render(){
    return (
      <AppFrame>
        <div style={{
          position: "absolute",
          width:"50%"
        }}>
          <h3>About the App</h3>
          <p style={{textIndent:"2em"}}> This is an analytics App that helps users
          visualize and understand the data from the Achievement app. </p>

          <p style={{textIndent:"2em"}}>There are two main parts in this app: <b>Student Pages</b> and <b>Course Pages</b>. </p>
          <h4>Student Pages</h4>
          <p style={{textIndent:"2em"}}>In the student list, you will see all the users with their photos. You can also search a
          student by their name. The algorithm will collect a list of students whose elements contain the string you key in. </p>
          <p style={{textIndent:"2em"}}>Clicking on the student name will bring you to <b>Student Profile</b>. In student profile,
          you will see some visualizations of the student's performance. Student's 
           <b>Name Card</b> is also shown on the left-top. </p>

           <h4>Course Pages</h4>
           <p style={{textIndent:"2em"}}>This part of the app helps the user to analysis the course's overall performance.
           A list with courses' names is on the left. Search function is also available here. Click on
           the specific course you would like to view, and you will enter the course profile.</p>

           <p style={{textIndent:"2em"}}> In this Page, the <b>Name Card</b> of the course will be shown on the top-left. A scatter charts will also
           be shown. Each point in the chart refers to one student. The x axis is the total number of the
           assignment finished and the y axis shows the average time needed to finish one assignment for the particular student. </p>

           <div style={{ textAlign:"center"}}>
           <h4>Contributers: </h4>
           <p>He Yingxu<br/>
                 Huang Zijia<br/>
                 Xiao Yunlei<br/>
                 Yijing Zhang<br/>
           </p>
           <h4>And Special Thanks to: </h4>
           <p><b>Prof. Chris Boesch</b>
           </p>
           </div>
        </div>
      </AppFrame>
    )
  }
}
export default About;
