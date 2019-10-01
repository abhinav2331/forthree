import React from "react";
import { Link } from "react-router-dom";
import "../userauth/login.style.scss";

export default function Notfound() {
    return (
        <section className="wrapper">
            <section className="login_wrapper clearfix">
                <section className="container">
                    <div className="page_content">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 text-center">
                                <div className="brand_logo">
                                    <img src="./assets/image/logo.png" alt="logo" />
                                </div>
                                <div className="login_heading">
                                    Start your free 30 days trial
                        </div>
                                <p className="login_sub_heading">
                                    No credit card, no commitments.
                        </p>

                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-12">
                                <div className="form_panel">
                                    <div className="row">
                                        <div className="col-lg-1 col-md-1 col-sm-12"></div>
                                        <div className="col-lg-10 col-md-10 col-sm-12">
                                            <div className="notfound_area">
                                                <div className="notfound_image">
                                                    <img src="./assets/image/404-error.png" />
                                                </div>
                                                <div className="notfound">
                                                    404 Page not found!
                                        </div>
                                                <div className="text-center not_found_btn">
                                                    <Link className="btn_dark_small" to="/"><span>Go to Home</span></Link>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-1 col-md-1 col-sm-12"></div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </section>>

        </section>
    )
}