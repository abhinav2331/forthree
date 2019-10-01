import React from "react";

export default function Message(props) {
    return (
        <div> 

            {
                props.message.status == "400"  ? <section className="error_msg message_box">
                    <i className="fa fa-thumbs-down"></i>  {props.message.statusText}
                </section> : props.message.status == "200" ? <section className="success_msg message_box">
                    <i className="fa fa-thumbs"></i> {props.message.message}
                    </section> : props.message.status == "422" ? <section className="error_msg message_box">
                        <i className="fa fa-thumbs-down"></i>  {props.message.statusText}
                        </section> : props.message.status == "500" ? <section className="error_msg message_box">
                            <i className="fa fa-thumbs-down"></i>  {props.message.statusText}
                            </section> : props.message.status == "401" ? <section className="error_msg message_box">
                                <i className="fa fa-thumbs-down"></i>  {props.message.statusText}
                                </section> : props.message.status == "402" ? <section className="error_msg message_box">
                                    <i className="fa fa-thumbs-down"></i>  {props.message.statusText}
                                </section> : ""
            }
            
            
        </div>
    )
}