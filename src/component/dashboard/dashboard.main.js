import React, {Suspense } from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';

import Uom from "./uom/uom.component";

import navigation from '../../_nav';
import routes from '../../routes';

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

function Dashboardmain() {
    return (
        <section className="dh_main">
            <div className="dash_inner">
                <div className="container-fluid">
                    <div>
                        <div>
                            Dashboard 
                        </div>
                        <Suspense fallback={loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component {...props} />
                                            )} />
                                    ) : (null);
                                })}
                                <Redirect from="/" to="/dashboard" />
                            </Switch>
                        </Suspense>
                    </div>
                    {/*<Uom />*/}
                </div>
            </div>
        </section>
    );
}

export default Dashboardmain;