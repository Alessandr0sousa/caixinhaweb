import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from './pages/main';
import Pessoa from './pages/pessoa';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pessoa/:id" component={Pessoa} />
        </Switch>
    </BrowserRouter>
);

export default Routes;