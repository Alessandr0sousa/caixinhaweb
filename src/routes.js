import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// import { isAuthenticated } from "./services/auth";

import Main from './pages/main';
import Pessoa from './pages/pessoa';
import Pagamento from './pages/pagamento';
import Signin from './pages/signin';

// const PrivateRoute = ({ component: Component, ...rest }) => (
//     <Route
//         {...rest}
//         render={props =>
//             isAuthenticated() ? (
//                 <Component {...props} />
//             ) : (
//                     <Redirect to={{ pathname: "/", state: { from: props.location } }} />
//                 )
//         }
//     />
// );

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Signin} />
            <Route path="/signup" component={() => <h1>SignUp</h1>} />
            {/* <PrivateRoute path="/app" component={() => <h1>App</h1>} /> */}
            <Route path="/main" component={Main} />
            <Route path="/pessoa/:id" component={Pessoa} />
            <Route path="/pagamento/:id" component={Pagamento} />
            <Route path="*" component={() => <h1>Page not found</h1>} />
        </Switch>
    </BrowserRouter>
);

export default Routes;