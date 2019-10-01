import * as React from 'react';

const Selectfield = (props) => (
    <div className="selectdiv">
        <select
            name={props.name}            
            onChange={props.controlFunc}
            className="form-control"
            value={props.selectedOption}>
            <option value="">{props.placeholder}</option>
            {props.options.map((opt, index) => {
                return <option
                    key={index}
                    value={opt.name}>{opt.name}</option>;
            })});
    })}
        </select>
    </div>
);

export default Selectfield;
