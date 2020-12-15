import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from './pages/main';
import Pessoa from './pages/pessoa';
import Pagamento from './pages/pagamento';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/pessoa/:id" component={Pessoa} />
            <Route path="/pagamento/:id" component={Pagamento} />
        </Switch>
    </BrowserRouter>
);

export default Routes;