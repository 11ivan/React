import React from 'react';

import Container1 from './containers/container1';
import history from './utils/history';
import { Router, Route, Switch } from "react-router-dom";

//import { Router, Route } from 'react-router';

class Routes extends React.Component {
    render() {
        return (
            <div>
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route exact path="/" component={Container1} />
                            <Route path="/component/:id" component={Component1} />
                            {/* <Route path="/component1" render={(props) => <Component1 {...props} />} />
                            <Route path="/component2" component={Component2} />
                            <Route path="/component3" component={Component3} /> */}
                        </Switch>
                    </div>
                </Router>
            </div>
        )
    }
}

export default Routes;