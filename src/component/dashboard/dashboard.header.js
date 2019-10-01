import React from "react";
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import logo from "../../assets/image/logo.png";
import dummyuser from "../../assets/image/5.jpg";


//import logo from "../../assets/image/logo.svg";
//import logosmall from "../../assets/image/logosmall.png";

import { AppAsideToggler, AppNavbarBrand, AppSidebarToggler } from '@coreui/react';

export default function Dashheader() {
    return (        
            <React.Fragment>
                <AppSidebarToggler className="d-lg-none" display="md" mobile />
            {/*<AppNavbarBrand
                    full={{ src: logo, width: 89, height: 25, alt: 'Logo' }}
                    minimized={{ src: logosmall, width: 30, height: 30, alt: 'CoreUI Logo' }}
                />*/}
            <div className="d_br"><img src={logo} alt="" /></div>
                <AppSidebarToggler className="d-md-down-none" display="lg" />

            {/*<Nav className="d-md-down-none" navbar>
                    <NavItem className="px-3">
                        <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
                    </NavItem>
                    <NavItem className="px-3">
                        <Link to="/users" className="nav-link">Users</Link>
                    </NavItem>
                    <NavItem className="px-3">
                        <NavLink to="#" className="nav-link">Settings</NavLink>
                    </NavItem>
                </Nav>*/}
                <Nav className="ml-auto" navbar>                    
                    <UncontrolledDropdown nav direction="down">
                        <DropdownToggle nav>
                        <img src={dummyuser} className="img-avatar" alt="User" />
                        Abhinav Katiyar
                        </DropdownToggle>
                        <DropdownMenu right>
                            <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
                        {/*<DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
                            <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
                            <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
                            <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
                            <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
                            <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
                            <DropdownItem divider />*/}
                            <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>
                            <DropdownItem><Link to="/logout"><i className="fa fa-lock"></i> Logout</Link></DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>                
            </React.Fragment>        
        );
}