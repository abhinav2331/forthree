import React, { Suspense } from 'react';
import { BrowserRouter, Router, Route, Switch } from "react-router-dom";
//import History from './history.js';
import history from './history';
import "./assets/style.scss";
import "./App.scss";


import { PrivateRoute } from "./component/userauth/private.route";
const Login = React.lazy(() => import('./component/userauth/login'));
const Logout = React.lazy(() => import('./component/userauth/logout'));
const Register = React.lazy(() => import('./component/userauth/register'));
const Verification = React.lazy(() => import('./component/userauth/verification'));
const Notfound = React.lazy(() => import('./component/notfound/notfound'));
const Dashboardlayout = React.lazy(() => import('./component/dashboard/dashboard.layout'));

//var token = sessionStorage.accessToken;
//import { loading } from "./component/common/loader";

//const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;
const loading = () => <div className="loader_wrap">
    <div>
        <div id="block_1" className="barlittle"></div>
        <div id="block_2" className="barlittle"></div>
        <div id="block_3" className="barlittle"></div>
        <div id="block_4" className="barlittle"></div>
        <div id="block_5" className="barlittle"></div>
    </div>
</div>;

export default function App() {    
    return (
        <section>           
                <BrowserRouter>
                    <Router history={history}>
                    <section>
                        <Suspense fallback={loading()}>
                            <Switch>
                                <Route exact path="/" component={Login} />                                
                                <Route path="/login" component={Login} />                    
                                <Route path="/logout" component={Logout} />
                                <Route path="/register" component={Register} />
                                <Route path="/verification" component={Verification} />                                
                                <PrivateRoute path="/dashboard" component={Dashboardlayout} />
                                <Route path="*" component={Notfound} />
                            </Switch>
                        </Suspense>
                        </section>
                    </Router>
                </BrowserRouter>
            
        </section>
    )
}

