import React, { useState } from "react";
import "./login.style.scss";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import history from '../../history.js';
import { forPostNormal } from "../common/api.call";

import { useFormLogin } from "../common/useForm";
import Inputfield from "../common/input.component";
import { validateLogin } from '../common/form.validation';
import logo from "../../assets/image/logo.png";


export default function Login() {

    const { values, handleChange, handleSubmit, errors } = useFormLogin(login, validateLogin);
    const [isLoading, setIsloading] = useState(false);
    //const [crtuser, setCrtuser] = useState("");
    const alert = useAlert();


    function login() {        
        setIsloading(true);
        forPostNormal("token", 'grant_type=password&username=' + values.UserName + '&password=' + values.Password)
            .then(response => {
                console.log(response.data);
                sessionStorage.setItem('currentUserToken', response.data.access_token);
                sessionStorage.setItem('currentUserId', response.data.ID);
                //window.sessionStorage.setItem(userdata, JSON.stringify(response.data));
                history.push('/dashboard');
            }).catch((error) => {
                console.log("--------");
                console.log(error.response.statusText);                
                alert.error(error.response.statusText);
            });
    }

    return (
        <section className="wrapper">
            <section className="login_wrapper clearfix">
                <section className="container">
                    <div className="page_content">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 text-center">
                                <div className="brand_logo">
                                    <img src={logo} alt="logo" />
                                </div>
                                <div className="login_heading">
                                    Start your free 30 days trial
                        </div>
                                <p className="login_sub_heading">
                                    No credit card, no commitments.
                        </p>

                                <div className="btn_section">
                                    <Link className="btn_lite" to="/register"><span>Register</span></Link>
                                </div>

                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-12">
                                <div className="form_panel">
                                    <div className="row">
                                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                                        <div className="col-lg-6 col-md-6 col-sm-12">
                                            <div className="login_form">
                                                <div className="form_heading">
                                                    Login
                                        </div>
                                                <div>
                                                    <form onSubmit={handleSubmit} noValidate>
                                                        <div className="form-group">
                                                            <Inputfield
                                                                className="form-control"
                                                                name="UserName"
                                                                inputType="email"
                                                                content={values.UserName || ""}
                                                                controlFunc={handleChange}
                                                                placeholder="Username"
                                                            />
                                                            {errors.UserName && (
                                                                <p className="help error_text">{errors.UserName}</p>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <Inputfield
                                                                className="form-control"
                                                                name="Password"
                                                                inputType="password"
                                                                content={values.Password || ""}
                                                                controlFunc={handleChange}
                                                                placeholder="Password"
                                                            />
                                                            {errors.Password && (
                                                                <p className="help error_text">{errors.Password}</p>
                                                            )}
                                                        </div>
                                                        <div className="form-group text-right">
                                                            <Link className="forgot_link" to="/login">Forgotten Password</Link>
                                                        </div>
                                                        <div className="form-group text-center mt-5">
                                                            <button type="submit" className="btn_dark">{isLoading ? <span>Loading...</span> : <span>Login</span>}</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3 col-md-3 col-sm-12"></div>
                                    </div>

                                </div>
                            </div>
                        </div>


                    </div>
                </section>
            </section>
        </section>
    )
}