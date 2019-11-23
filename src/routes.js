import React from 'react';

const Login = React.lazy(() => import('./component/userauth/login'));
const Dashboardhome = React.lazy(() => import('./component/dashboard/dashboard.home'));
const Uom = React.lazy(() => import('./component/dashboard/uom/uom.component'));
const Attributes = React.lazy(() => import('./component/dashboard/attributes/attributes.component'));
const AttributeValue = React.lazy(() => import('./component/dashboard/attribute-value/attributes.value.component'));
const Suppliers = React.lazy(() => import('./component/dashboard/suppliers/suppliers.component'));
const Customer = React.lazy(() => import('./component/dashboard/customer/customer.component'));
const Inventory = React.lazy(() => import('./component/dashboard/customer/customer.component'));




// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
    { path: '/', exact: true, name: 'Home', component: Login },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboardhome },
    { path: '/dashboard/manage-uom', exact: true, name: 'Uom', component: Uom },
    { path: '/dashboard/manage-attributes', exact: true, name: 'Attributes', component: Attributes },
    { path: '/dashboard/manage-attribute-value', exact: true, name: 'Attribute Value', component: AttributeValue },
    { path: '/dashboard/suppliers', exact: true, name: 'Suppliers', component: Suppliers },
    { path: '/dashboard/customer', exact: true, name: 'Customer', component: Customer }
    { path: '/dashboard/inventory', exact: true, name: 'Inventory', component: Inventory }
  
];

export default routes;
