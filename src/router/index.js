import React from 'react'
import {
    Router,
    Route,
    Redirect,
    Switch
} from 'react-router'

import { createHashHistory } from 'history'

import App from '../App'
import Home from '../pages/Home'
import Singer from '../pages/Singer'
import RecommendCd from '../pages/RecommendCd'

import User from '../pages/User'

const history  = createHashHistory()

const AppRouter = (
    <Router history={history}>
        <Switch>
            <Route path="/Home" component={Home}/>
            <Route path="/Singer/:singerId" component={Singer}/>
            <Route path="/User" component={User}/>
            <Route path="/RecommendCd/:disstid" component={RecommendCd}/>
            <Redirect to="/Home/Recommend"/>
        </Switch>
    </Router>
)

export default AppRouter