import React from "react";
import { Router, Route } from "react-router-dom";
import { createBrowserHistory } from 'history'

import Home from "./Home";
import About from "./About";

const history = createBrowserHistory();
const Routes = () => {
    return (
        <div>
            <Router history={history}>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
            </Router>
        </div>
    )
}

export default Routes;