import React from "react";

const Inputfield = (props) => (

    <input
        className={props.className}
        name={props.name}
        type={props.inputType}
        value={props.content}
        onChange={props.controlFunc}
        placeholder={props.placeholder}
        required
        
     />
   
);


export default Inputfield;
