import { useState, useEffect } from 'react';

// 1-For register
export const useRegisterForm = (callback, validateRegister) => {

    const [valuesRe, setValuesRe] = useState({});
    const [errReg, setErrReg] = useState({});
    const [isSubmittingnew, setIsSubmittingnew] = useState(false);   

    useEffect(() => {        
        if (Object.keys(errReg).length === 0 && isSubmittingnew) {
            callback();
        }        
    }, [errReg]);

    const handleReSubmit = (event) => {        
        if (event) event.preventDefault();
        setErrReg(validateRegister(valuesRe));
        setIsSubmittingnew(true);          
    };
   
    const handleReChange = (event) => {
        event.persist();
        setValuesRe(valuesRe => ({ ...valuesRe, [event.target.name]: event.target.value }));   
        //setIsSubmitting(false);
        //setErrReg(validateRegister(valuesRe));
       
    };    

    return {
        handleReChange,
        handleReSubmit,
        valuesRe,
        errReg        
    }
};

//2.For Login
export const useFormLogin = (callback, validateLogin) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {        
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }        
    }, [errors]);

    const handleSubmit = (event) => {        
        if (event) event.preventDefault();
        setErrors(validateLogin(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        setIsSubmitting(false);
        setErrors(validateLogin(values));
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors   
    }
};

//3.For Verificatio
export const useFormVarification = (callback, validateVarification) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const clear = (event) => {
        setValues("");
    };


    useEffect(() => {
        //debugger;
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errors]);

    const handleSubmit = (event) => {
        //debugger;
        if (event) event.preventDefault();
        setErrors(validateVarification(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        setErrors(validateVarification(values));

    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
};

//4.For Uom Edit
export const useFormEdit = (callback, validateEdituom) => {

    const [valuesedit, setValuesedit] = useState({});
    const [errorsedit, setErrorsedit] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //const clear = (event) => {
    //    setValuesedit("");
    //};


    useEffect(() => {
        //debugger;
        if (Object.keys(errorsedit).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errorsedit]);

    const handleeditSubmit = (event) => {
        //debugger;
        if (event) event.preventDefault();
        setErrorsedit(validateEdituom(valuesedit));
        setIsSubmitting(true);
    };

    const handleeditChange = (event) => {
        event.persist();
        setValuesedit(valuesedit => ({ ...valuesedit, [event.target.name]: event.target.value }));
        setErrorsedit(validateEdituom(valuesedit));
    };

    return {
        valuesedit,
        handleeditChange,
        handleeditSubmit,
        errorsedit,
        setValuesedit
    }
};

//5.For Add Uom
export const useFormAdduom = (callback, validateLogin) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //const clear = (event) => {
    //    setValues("");
    //};


    useEffect(() => {        
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errors]);

    const handleSubmit = (event) => {        
        if (event) event.preventDefault();
        setErrors(validateLogin(values));
        setIsSubmitting(true);
    };

    const handleChange = (event) => {
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        setIsSubmitting(false);
        setErrors(validateLogin(values));        
    };

    return {
        handleChange,
        handleSubmit,
        values,
        errors
    }
};


//6.For Create Attributes
export const useFormAddattribute = (callback, validateAddattribute) => {

    const [valuesA, setValuesA] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    //const clear = (event) => {
    //    setValues("");
    //};


    useEffect(() => {        
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errors]);

    const handleSubmit = (event) => {        
        if (event) event.preventDefault();
        setErrors(validateAddattribute(valuesA));
        setIsSubmitting(true);
        //clear();
    };

    const handleChangeAttribute = (event) => {        
        event.persist();
        setValuesA(valuesA => ({ ...valuesA, [event.target.name]: event.target.value }));
        //setErrors(validateAddattribute(valuesA));
        setIsSubmitting(false);
    };

    return {
        handleChangeAttribute,
        handleSubmit,
        valuesA,
        errors        
    }
};

//7.For Attribute Edit
export const useFormeditAttribute = (callback, validateEditattribute) => {

    const [valuesedit, setValuesedit] = useState({});
    const [errorsedit, setErrorsedit] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    
    useEffect(() => {        
        if (Object.keys(errorsedit).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errorsedit]);

    const handleeditSubmit = (event) => {       
        if (event) event.preventDefault();
        setErrorsedit(validateEditattribute(valuesedit));
        setIsSubmitting(true);
    };

    const handleeditChange = (event) => {
        event.persist();
        setValuesedit(valuesedit => ({ ...valuesedit, [event.target.name]: event.target.value }));
        setErrorsedit(validateEditattribute(valuesedit));
    };

    return {
        valuesedit,
        handleeditChange,
        handleeditSubmit,
        errorsedit,
        setValuesedit,
    }
};


//8.For Create Attribute Value
export const useFormAddattValue = (callback, validateAddAttValue) => {

    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {        
        if (Object.keys(errors).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errors]);

    const handleSubmitAttrValue = (event) => {        
        if (event) event.preventDefault();
        setErrors(validateAddAttValue(values));
        setIsSubmitting(true);
        //clear();
    };

    const handleChangeAttValue = (event) => {        
        event.persist();
        setValues(values => ({ ...values, [event.target.name]: event.target.value }));
        //setErrors(validateAddAttValue(values));
        setIsSubmittingS(false);
    };

    return {
        handleChangeAttValue,
        handleSubmitAttrValue,
        values,
        errors
    }
};

//9.For Edit Attribute Value
export const useFormEditAddattValue = (callback, validateAddAttValue) => {

    const [valuesEdit, setValuesEdit] = useState({});
    const [errorsedit, setErrorsedit] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {        
        if (Object.keys(errorsedit).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errorsedit]);

    const handleSubmitEditAttrValue = (event) => {        
        if (event) event.preventDefault();
        setErrorsedit(validateAddAttValue(valuesEdit));
        setIsSubmitting(true);
        //clear();
    };

    const handleChangeEditAttValue = (event) => {        
        event.persist();
        setValuesEdit(valuesEdit => ({ ...valuesEdit, [event.target.name]: event.target.value }));
        setErrorsedit(validateAddAttValue(valuesEdit));
    };

    return {
        handleChangeEditAttValue,
        handleSubmitEditAttrValue,
        valuesEdit,
        errorsedit,
        setValuesEdit
    }
};

//10.For Add Supplies
export const useFormAddSupplies = (callback, validateAddSupplies) => {    
    const [valueSupply, setValueSupply] = useState({});
    const [errorSupply, setErrorSupply] = useState({});
    const [isSubmittingS, setIsSubmittingS] = useState(false);

    const clear = () => {
        setValueSupply("");
    };

    useEffect(() => {        
        if (Object.keys(errorSupply).length === 0 && isSubmittingS) {
            callback();
        }        
    }, [errorSupply]);

    const handleSubmitSupplier = (event) => {        
        if (event) event.preventDefault();
        setIsSubmittingS(true);
        setErrorSupply(validateAddSupplies(valueSupply));        
        //clear();
    };

    const handleChangeSupplier = (event) => {         
        event.persist();        
        setValueSupply(valueSupply => ({ ...valueSupply, [event.target.name]: event.target.value }));
        //setErrorSupply(validateAddSupplies(valueSupply)); 
        setIsSubmittingS(false);
    };

    return {
        handleChangeSupplier,
        handleSubmitSupplier,
        valueSupply,
        errorSupply,
    }
};
//11.For Edit Supplies
export const useFormEditSupplies = (callback, validateAddSupplies) => {

    const [valueSupplyEdit, setValueSupplyEdit] = useState({});
    const [errorsedit, setErrorsedit] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {        
        if (Object.keys(errorsedit).length === 0 && isSubmitting) {
            callback();
        }
        //clear();
    }, [errorsedit]);

    const handleSubmitEditSupplies = (event) => {       
        if (event) event.preventDefault();
        setErrorsedit(validateAddSupplies(valueSupplyEdit));
        setIsSubmitting(true);
        //clear();
    };

    const handleChangeEditSupplies = (event) => {        
        event.persist();
        setValueSupplyEdit(valueSupplyEdit => ({ ...valueSupplyEdit, [event.target.name]: event.target.value }));
        //setErrorsedit(validateAddSupplies(valuesEdit));
    };

    return {
        handleSubmitEditSupplies,
        handleChangeEditSupplies,
        valueSupplyEdit,
        errorsedit,
        setValueSupplyEdit
    }
};