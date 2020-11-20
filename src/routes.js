import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from './pages/main';
import Pessoa from './pages/pessoa';
import Cota from './pages/cota';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pessoa/:id" component={Pessoa} />
            <Route path="/cota/:id" component={Cota} />
        </Switch>
    </BrowserRouter>
);

export default Routes;