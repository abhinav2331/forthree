import React, { useState} from "react";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { forRegPost } from "../common/api.call";

import "./register.style.scss";
import "./login.style.scss";

import { useRegisterForm } from "../common/useForm";
import Inputfield from "../common/input.component";
import { validateRegister } from '../common/form.validation';
import logo from "../../assets/image/logo.png";

export default function Register() {

    const { valuesRe, handleReChange, handleReSubmit, errReg } = useRegisterForm(register, validateRegister);  
    const [isLoading, setIsloading] = useState(false);
    const alert = useAlert();


    function register() {        
        setIsloading(true);
        forRegPost(`account/registration`, {
            FirstName: valuesRe.FirstName,
            LastName: valuesRe.LastName,
            UserName: valuesRe.UserName,
            City: valuesRe.City,
            CountryId: valuesRe.CountryId,
            MobileNumber: valuesRe.MobileNumber            
        })
            .then(response => {                
                console.log(response.data);
                //History.push('/login');                
                alert.success(response.data.message);
                //setIsloading(false);
                //clear();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
                setIsloading(false);
            });
    }


    return (
        <section className="wrapper">
            <section className="login_wrapper clearfix">
                <section className="container">
                    <section className="register_wrapper">
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
                                        <Link className="btn_lite" to="/login"><span>Login</span></Link>
                                    </div>

                                </div>
                                <div className="col-lg-9 col-md-9 col-sm-12">
                                    <div className="form_panel">
                                        <div className="row">
                                            <div className="col-lg-1 col-md-1 col-sm-12">&nbsp;</div>
                                            <div className="col-lg-10 col-md-10 col-sm-12">
                                                <div className="register_form">
                                                    <div className="form_heading">
                                                        Please fill with your details
                                        </div>
                                                    <div>
                                                        <form onSubmit={handleReSubmit} noValidate>
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <Inputfield
                                                                            className="form-control"
                                                                            name="FirstName"
                                                                            inputType="text"
                                                                            content={valuesRe.FirstName || ''}
                                                                            controlFunc={handleReChange}
                                                                            placeholder="First Name"                                                                            
                                                                        />
                                                                        {errReg.FirstName && (
                                                                            <p className="help error_text">{errReg.FirstName}</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <Inputfield
                                                                            className="form-control"
                                                                            name="LastName"
                                                                            inputType="text"
                                                                            content={valuesRe.LastName || ''}
                                                                            controlFunc={handleReChange}
                                                                            placeholder="Last Name"                                                                            
                                                                        />
                                                                        {errReg.LastName && (
                                                                            <p className="help error_text">{errReg.LastName}</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <Inputfield
                                                                            className="form-control"
                                                                            name="UserName"
                                                                            inputType="email"
                                                                            content={valuesRe.UserName || ''}
                                                                            controlFunc={handleReChange}
                                                                            placeholder="Email"                                                                            
                                                                        />
                                                                        {errReg.UserName && (
                                                                            <p className="help error_text">{errReg.UserName}</p>
                                                                        )}

                                                                    </div>
                                                                </div>
                                                                <div className="col-lg-6 col-md-6 col-sm-12">
                                                                    <div className="form-group">
                                                                        <Inputfield
                                                                            className="form-control"
                                                                            name="City"
                                                                            inputType="text"
                                                                            content={valuesRe.City || ''}
                                                                            controlFunc={handleReChange}
                                                                            placeholder="City"                                                                            
                                                                        />
                                                                        {errReg.City && (
                                                                            <p className="help error_text">{errReg.City}</p>
                                                                        )}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="row">
                                                                            <div className="col-lg-3 col-md-3 col-sm-3 col-xs-3 col-4">
                                                                                <Inputfield
                                                                                    className="form-control"
                                                                                    name="CountryId"
                                                                                    inputType="number"
                                                                                    content={valuesRe.CountryId || ''}
                                                                                    controlFunc={handleReChange}
                                                                                    placeholder="Code"                                                                                    
                                                                                />
                                                                                {errReg.CountryId && (
                                                                                    <p className="help error_text">{errReg.CountryId}</p>
                                                                                )}
                                                                            </div>
                                                                            <div className="col-lg-3col-md-9 col-sm-9 col-sx-9 col-8">
                                                                                <Inputfield
                                                                                    className="form-control"
                                                                                    name="MobileNumber"
                                                                                    inputType="text"
                                                                                    content={valuesRe.MobileNumber || ''}
                                                                                    controlFunc={handleReChange}
                                                                                    placeholder="Mobile"                                                                                    
                                                                                />
                                                                                {errReg.MobileNumber && (
                                                                                    <p className="help error_text">{errReg.MobileNumber}</p>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group text-left mt-5">
                                                                        <button type="submit" className="btn_dark">{isLoading ? <span>Loading...</span> : <span>Get Started Now</span>}</button>                                                                        
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-1 col-md-1 col-sm-12">&nbsp;</div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </section>
                </section>
            </section>
        </section>
    )
}