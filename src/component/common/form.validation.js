export function validateRegister(valuesRe) {    
    let errReg = {};

    if (!valuesRe.FirstName) {
        errReg.FirstName = 'First Name is required';
    } 
    if (!valuesRe.LastName) {
        errReg.LastName = 'Last Name is required';
    } 
    if (!valuesRe.UserName) {
        errReg.UserName = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(valuesRe.UserName)) {
        errReg.UserName = 'Email address is invalid';
    }
    if (!valuesRe.City) {
        errReg.City = 'City is required';
    } 
    if (!valuesRe.CountryId) {
        errReg.CountryId = 'Id is required';
    } else if (valuesRe.CountryId > 0 || valuesRe.CountryId < 3) {
        errors.CountryId = 'Please enter right country id.';
    }
    if (!valuesRe.MobileNumber) {
        errReg.MobileNumber = 'Mobile Number is required';
    }    
    return errReg;
};

//For validate login form
export function validateLogin(values) {    
    let errors = {};

    if (!values.UserName) {
        errors.UserName = 'User Name is required';
    } else if (!/\S+@\S+\.\S+/.test(values.UserName)) {
        errors.UserName = 'User Name address is invalid';
    }
    if (!values.Password) {
        errors.Password = 'Password is required';
    } else if (values.Password.length < 6) {
        errors.Password = 'Password must be 6 or more characters';
    }
    return errors;
};

export function validateAdduom(values) {    
    let errors = {};

    if (!values.UOMCode) {
        errors.UOMCode = 'UOMCode is required';
    }
    if (!values.UOMDescription) {
        errors.UOMDescription = 'UOM Description is required';
    }

    return errors;
};

export function validateEdituom(valuesedit) {    
    let errors = {};

    if (!valuesedit.UOMCode) {
        errors.UOMCode = 'UOMCode is required';
    }
    if (!valuesedit.UOMDescription) {
        errors.UOMDescription = 'UOM Description is required';
    }

    return errors;
};

export function validateVarification(values) {    
    let errors = {};
   
    if (!values.Password) {
        errors.Password = 'Password is required';
    } else if (values.Password.length < 6) {
        errors.Password = 'Password must be 6 or more characters';
    }
    if (!values.ConfirmPassword) {
        errors.ConfirmPassword = 'Confirm Password is required';
    } else if (values.ConfirmPassword !== values.Password) {
        errors.ConfirmPassword = 'Confirm Password must be same';
    }
    return errors;
};


export function validateAddattribute(valuesA) {    
    let errors = {};

    if (!valuesA.AttributeName) {
        errors.AttributeName = 'AttributeName is required';
    }
    if (!valuesA.AttributeType) {
        errors.AttributeType = 'AttributeType is required';
    }
    if (!valuesA.AttributeDescription) {
        errors.AttributeDescription = 'Attribute Description is required';
    }

    return errors;
};

export function validateEditattribute(valuesedit) {    
    let errors = {};

    if (!valuesedit.AttributeName) {
        errors.AttributeName = 'AttributeName is required';
    }
    if (!valuesedit.AttributeType) {
        errors.AttributeType = 'AttributeType is required';
    }
    if (!valuesedit.AttributeDescription) {
        errors.AttributeDescription = 'Attribute Description is required';
    }

    return errors;
};

export function validateAddAttValue(values) {   
    let errors = {};

    if (!values.AttributeValue) {
        errors.AttributeValue = 'AttributeValue is required';
    }
    if (!values.AttributeSKUValue) {
        errors.AttributeSKUValue = 'AttributeSKUValue is required';
    }
    if (!values.AttributeValueDescription) {
        errors.AttributeValueDescription = 'AttributeValueDescription is required';
    }    

    return errors;
};

export function validateEditAttValue(valuesEdit) {    
    let errorsedit = {};

    if (!valuesEdit.AttributeValue) {
        errorsedit.AttributeValue = 'attributeValue is required';
    }
    if (!valuesEdit.AttributeSKUValue) {
        errorsedit.AttributeSKUValue = 'AttributeSKUValue is required';
    }
    if (!valuesEdit.AttributeValueDescription) {
        errorsedit.AttributeValueDescription = 'AttributeValueDescription is required';
    }

    return errorsedit;
};

export function validateAddSupplies(valueSupply) {    
    let errorSupply = {};

    if (!valueSupply.FirstName) {
        errorSupply.FirstName = 'FirstName is required';
    }
    if (!valueSupply.LastName) {
        errorSupply.LastName = 'LastName is required';
    }
    if (!valueSupply.PhoneNumber) {
        errorSupply.PhoneNumber = 'PhoneNumber is required';
    }
    if (!valueSupply.MobileNumber) {
        errorSupply.MobileNumber = 'MobileNumber is required';
    }
    if (!valueSupply.Address1) {
        errorSupply.Address1 = 'Address1 is required';
    }
    if (!valueSupply.Address2) {
        errorSupply.Address2 = 'Address2 is required';
    }
    if (!valueSupply.City) {
        errorSupply.City = 'City is required';
    }
    if (!valueSupply.State) {
        errorSupply.State = 'State is required';
    }
    if (!valueSupply.PostalCode) {
        errorSupply.PostalCode = 'PostalCode is required';
    }
    return errorSupply;
};

export function validateAddCustomer(valueCustomerAdd) {
    let errors = {};   

    if (!valueCustomerAdd.FirstName) {
        errors.FirstName = 'FirstName is required';
    }
    if (!valueCustomerAdd.LastName) {
        errors.LastName = 'LastName is required';
    }
    if (!valueCustomerAdd.PhoneNumber) {
        errors.PhoneNumber = 'PhoneNumber is required';
    }
    if (!valueCustomerAdd.MobileNumber) {
        errors.MobileNumber = 'MobileNumber is required';
    }
    if (!valueCustomerAdd.Address1) {
        errors.Address1 = 'Address1 is required';
    }
    if (!valueCustomerAdd.Address2) {
        errors.Address2 = 'Address2 is required';
    }
    if (!valueCustomerAdd.City) {
        errors.City = 'City is required';
    }
    if (!valueCustomerAdd.State) {
        errors.State = 'State is required';
    }
    if (!valueCustomerAdd.PostalCode) {
        errors.PostalCode = 'PostalCode is required';
    }

    return errors;
};


