import React from "react";
import { Redirect, Route, Switch } from 'react-router-dom';
import * as router from 'react-router-dom';


import {    
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppSidebarNav2 as AppSidebarNav
} from '@coreui/react';

import navigation from '../../_nav';
import routes from '../../routes';



function Dashboardsidebar(props) {    

    console.log("=====");
    console.log(props);
    return (
        <div>
            <AppSidebar fixed display="lg">
                <AppSidebarHeader />
                <AppSidebarForm />
                <AppSidebarNav navConfig={navigation} {...props} router={router} />
                <AppSidebarFooter />
                <AppSidebarMinimizer />
            </AppSidebar>
        </div>
    );
}


export default Dashboardsidebar;