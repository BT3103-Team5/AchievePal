import React from 'react'
import {Switch,Route,HashRouter} from 'react-router-dom'
import App from './app/App';

import studentsList from './student/studentsList';
import about from './app/about';
import courses from './instructor/courses';
import courseChart from './instructor/courseChart';
import studentProfile from './student/studentProfile';
//import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const Root=()=>(
    <Switch>

    <Route path="/" exact component={App} />
    <Route path="/studentsList" exact component={studentsList} />
    <Route path="/about" exact component={about} />
    <Route path="/courses" exact component={courses} />
    <Route path="/courseChart" exact component={courseChart}/>
    <Route path="/studentProfile" exact component={studentProfile}/>

    </Switch>
)

export default Root
