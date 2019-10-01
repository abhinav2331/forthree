import React from "react";

const CheckBox = (props) => (
    <div className="form-group">
        <div className="checkbox">
            <label className="checkbox-inline">
                <input
                    type={props.type}
                    id={props.id}
                    name={props.name}
                    onChange={props.changeFn}                    
                    //value={option}
                    //checked={props.selectedOptions.indexOf(option) > -1}
                />
            </label>
        </div>
    </div>
);

export default CheckBox;
