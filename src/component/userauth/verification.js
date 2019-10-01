import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URI } from "../common/api.uri";
import "./login.style.scss";
import { Link } from "react-router-dom";

import { useFormVarification } from "../common/useForm";
import { validateVarification } from "../common/form.validation";
import Inputfield from "../common/input.component";
import logo from "../../assets/image/logo.png";


export default function Verification() {

    const { values, handleChange, handleSubmit, errors } = useFormVarification(verification, validateVarification);
    const [vcode, setVcode] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        //debugger;
        const code = location.pathname.slice(14, 50);      
        
        axios.get(`${API_URI}/account/verification/${code}`)       
            .then(response => {
                console.log("Vcode User detail");
                console.log(response);
                setUser(response.data.userData);
                //History.push('/login');   
            }).catch((error) => {
                // Error
                if (error.response) {
                    //setMessage("");
                    //console.log("--------");
                    console.log(error.response);
                } else if (error.request) {
                    //console.log(error.request);
                } else {
                    //console.log('Error', error.message);
                }
            });
    }, []);


    function verification() {
        const code = location.pathname.slice(14, 50);
        debugger;
        axios.put(`${API_URI}/account/verification/${code}`, { UserName: user.UserName, Password: values.Password })
            .then(response => {
                console.log("User password updated now");
                console.log(response);
                History.push('/login');   
            }).catch((error) => {
                // Error
                if (error.response) {
                    //setMessage("");
                    console.log("User password updated now");
                    console.log(error.response);
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    //console.log('Error', error.message);
                }
                // console.log(error.status);
            });
    }

    return (
        <section className="wrapper">
            <section className="login_wrapper">
                <section className="container">
                    <div className="page_content">
                        <div className="row">
                            <div className="col-lg-3 text-center">
                                <div className="brand_logo">
                                    <img src={logo} alt="logo" />
                                </div>
                                <div className="login_heading">
                                    Start your free 30 days trial
                        </div>
                                <p className="login_sub_heading">
                                    No credit card, no commitments.
                        </p>

                            </div>
                            <div className="col-lg-9">
                                <div className="form_panel">
                                    <div className="row">
                                        <div className="col-lg-3"></div>
                                        <div className="col-lg-6">
                                            <div className="varification_form">
                                                <div className="form_heading">
                                                    User Varification
                                        </div>
                                                <div>
                                                    <form onSubmit={handleSubmit} noValidate>
                                                        <div className="form-group">
                                                            <Inputfield
                                                                className="form-control"
                                                                name="UserName"
                                                                inputType="email"
                                                                content={user.UserName}
                                                                controlFunc={handleChange}
                                                                placeholder="Username"
                                                                required="true"
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
                                                                content={values.Password}
                                                                controlFunc={handleChange}
                                                                placeholder="Password"
                                                                required="true"
                                                            />
                                                            {errors.Password && (
                                                                <p className="help error_text">{errors.Password}</p>
                                                            )}
                                                        </div>
                                                        <div className="form-group">
                                                            <Inputfield
                                                                className="form-control"
                                                                name="ConfirmPassword"
                                                                inputType="password"
                                                                content={values.ConfirmPassword}
                                                                controlFunc={handleChange}
                                                                placeholder="Confirm Password"
                                                                required="true"
                                                            />
                                                            {errors.ConfirmPassword && (
                                                                <p className="help error_text">{errors.ConfirmPassword}</p>
                                                            )}
                                                        </div>
                                                        <div className="form-group text-center mt-5">
                                                            <button type="submit" className="btn_dark">Save Password</button>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-3"></div>
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