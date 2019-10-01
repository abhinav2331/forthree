import React, { useState, Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';

import "./dashboard.style.scss";

import navigation from '../../_nav';
import routes from '../../routes';


import {
    AppAside,
    AppFooter,
    AppHeader,
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

const loading = () => <div className="loader_wrap">
    <div>
        <div id="block_1" className="barlittle"></div>
        <div id="block_2" className="barlittle"></div>
        <div id="block_3" className="barlittle"></div>
        <div id="block_4" className="barlittle"></div>
        <div id="block_5" className="barlittle"></div>
    </div>
</div>;

import Dashheader from "./dashboard.header";
//import Dashboardsidebar from "./dashboard.sidebar";
//import Dashboardmain from "./dashboard.main";



export default function Dashboardlayout(props) {
    //console.log(props);
    return (
        <section className="wrapper_dashboard">
            
            <AppHeader fixed>
                <Dashheader />
            </AppHeader>
            {/*<Dashboardsidebar {...props} />*/}
            <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                <AppSidebarNav navConfig={navigation} {...props} router={router} />
                <AppSidebarFooter />
                <AppSidebarMinimizer />
            </AppSidebar>
            {/*<Dashboardmain />*/}
            <div>
                <section className="dh_main">
                    <div className="dash_inner">
                        <div className="container-fluid">
                            <div>
                                <div>
                                    
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
                            </div>
                        </div>
                    </div>
                </section>
                </div>
                
        </section>
    );
}

