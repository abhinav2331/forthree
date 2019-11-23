import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCustomers } from "../../../actions/customers.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

var userId = sessionStorage.currentUserId;

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import { useFormAddCustomer, useFormEditCustomer } from "../../common/useForm";
import { validateAddCustomer } from "../../common/form.validation";
import { forPost, forPut, forDelete } from "../../common/api.call";

const loading = () => <div className="loader_wrap">
    <div>
        <div id="block_1" className="barlittle"></div>
        <div id="block_2" className="barlittle"></div>
        <div id="block_3" className="barlittle"></div>
        <div id="block_4" className="barlittle"></div>
        <div id="block_5" className="barlittle"></div>
    </div>
</div>;

export default function Inventory() {
    //debugger;
    const CustomerSelector = useSelector((state) => state.CustomerReducer);
    const dispatch = useDispatch();
    const getAllCustomer = () => dispatch(getCustomers());
    const { valueCustomerAdd, handleSubmitCustomer, handleChangeCustomers, errors } = useFormAddCustomer(createCustomer, validateAddCustomer);
    const { valueCustomerEdit, handleChangeEditCustomers, handleEditCustomer, errorsCustomerEdit, setValueCustomerEdit } = useFormEditCustomer(editCustomer, validateAddCustomer);
    const alert = useAlert();

    //For modal
    const [modal, setModal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    //For edit and delete row
    const [selectionChanged, setSelectionChanged] = useState(false);
    const [rowHighSelect, setRowHighSelect] = useState([]);
    const [rowEdit, setRowEdit] = useState("");
    const [editableRows, setEditableRows] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState([]);

    const showModal = (event) => {
        debugger;
        event.preventDefault();
        setModal(true);
    };
    const hideModal = (event) => {
        event.preventDefault();
        setModal(false);
    };
    const hideEditModal = () => {
        setEditmodal(false);
    };
    //handle delete
    const handleDelete = () => {
        debugger;
        let rowid = selectedRowIndex.ID;
        console.log(rowid.id);
        forDelete(`customers/delete/${rowid}`)
            .then(response => {
                console.log(response.data);
                alert.success(response.data.message);
                setRowEdit("");
                getAllCustomer();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
            });
    };

    //Add Customer
    function createCustomer() {
        debugger;
        forPost(`customers/add`, { 
            CountryId:1,
            PartnerId: userId,
            UserName: "qqq",
            Password: "www",
            FirstName: valueCustomerAdd.FirstName,
            LastName: valueCustomerAdd.LastName,
            PhoneNumber: valueCustomerAdd.PhoneNumber,
            MobileNumber: valueCustomerAdd.MobileNumber,
            Address1: valueCustomerAdd.Address1,
            Address2: valueCustomerAdd.Address2,
            City: valueCustomerAdd.City,
            State: valueCustomerAdd.State,
            PostalCode: valueCustomerAdd.PostalCode,
            LastUpdatedBy: "1",
            IsActive: "1",
            IsVerified: "1"
        })
            .then(response => {
                //setMessage("");
                console.log(response.data);
                //History.push('/login');
                //setMessage(response.data);
                setModal(false);
                alert.success(response.data.message);
                getAllCustomer();
            }).catch((error) => {
                // Error
                if (error.response) {
                    //setMessage("");
                    console.log("--------");
                    console.log(error.response);
                    //setMessage(error.response);
                    setModal(false);
                    alert.error(error.response.statusText);
                } else if (error.request) {
                    //console.log(error.request);
                } else {
                    //console.log('Error', error.message);
                }
                // console.log(error.status);
            });

    };
    //Edit Customers
    const handleCustomerEdit = () => {
        debugger;
        setEditmodal(true);
        console.log("****");
        console.log(selectedRowIndex);
        setValueCustomerEdit(selectedRowIndex);
    };

    function editCustomer() {
        debugger;
        forPut(`customers/edit/${valueCustomerEdit.ID}`, {
            CountryId: 1,
            PartnerId: userId,
            UserName: "",
            Password: "",
            FirstName: valueCustomerEdit.FirstName,
            LastName: valueCustomerEdit.LastName,
            PhoneNumber: valueCustomerEdit.PhoneNumber,
            MobileNumber: valueCustomerEdit.MobileNumber,
            Address1: valueCustomerEdit.Address1,
            Address2: valueCustomerEdit.Address2,
            City: valueCustomerEdit.City,
            State: valueCustomerEdit.State,
            PostalCode: valueCustomerEdit.PostalCode,
            LastUpdatedBy: "1",
            IsActive: "1",
            IsVerified: "1"
        })
            .then(response => {
                //setMessage("");
                console.log(response.data);
                //History.push('/login');
                //setMessage(response.data);
                setEditmodal(false);
                alert.success(response.data.message);
                getAllSuppliers();
            }).catch((error) => {
                // Error
                if (error.response) {
                    //setMessage("");
                    console.log("--------");
                    console.log(error.response);
                    //setMessage(error.response);
                    setEditmodal(false);
                    alert.error(error.response.statusText);
                } else if (error.request) {
                    //console.log(error.request);
                } else {
                    //console.log('Error', error.message);
                }
                // console.log(error.status);
            });
    };

    /*For Select row*/
    function renderEditable(cellInfo) {       
        const editable = editableRows[cellInfo.index];
        return (
            <div
                style={{ backgroundColor: editable ? "#fafafa" : null }}
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [CustomerSelector.Customers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerText;
                    //setBusinessDivision({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: CustomerSelector.Customers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    const columnsNew = [
        {
            columns: [
                {
                    Header: 'First Name',
                    accessor: 'FirstName',
                    Cell: renderEditable
                },
                {
                    Header: 'Last Name',
                    accessor: 'LastName',
                    Cell: renderEditable
                },
                {
                    Header: 'Address 1',
                    accessor: 'Address1',
                    Cell: renderEditable
                },
                {
                    Header: 'Address 2',
                    accessor: 'Address2',
                    Cell: renderEditable
                },
                {
                    Header: 'City',
                    accessor: 'City',
                    Cell: renderEditable
                },
                {
                    Header: 'MobileNumber',
                    accessor: 'MobileNumber',
                    Cell: renderEditable
                },
                {
                    Header: 'PhoneNumber',
                    accessor: 'PhoneNumber',
                    Cell: renderEditable
                },
                {
                    Header: 'CreateedOn',
                    accessor: 'CreateedOn',
                    Cell: renderEditable
                },
                {
                    Header: 'PartnerId',
                    accessor: 'PartnerId',
                    Cell: renderEditable
                }
            ]
        }

    ]

    useEffect(() => {
        getAllCustomer();
    }, []);

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Customer
                    <button onClick={showModal} className="btn_add dh_btn_action pull-right">Add Uom</button>
                    {
                        rowEdit == "" ? <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete }} className="dh_btn_action disabled btn_remove pull-right">Delete Attributes</button>
                            <button onClick={handleCustomerEdit} className="dh_btn_action disabled btn_edit pull-right">Edit Attributes</button></span>
                            : <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action btn_remove pull-right">Delete Attributes</button>
                                <button onClick={handleCustomerEdit} className="dh_btn_action btn_edit pull-right">Edit Attributes</button></span>
                    }
                </div>
                <div className="card-body">
                    <Suspense fallback={loading}>
                        <ReactTable
                            data={CustomerSelector.Customers}
                            columns={columnsNew}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.row) {
                                    return {
                                        onClick: e => {
                                            if (rowInfo.index !== rowEdit) {
                                                setRowEdit(rowInfo.index);
                                                setSelectedRowIndex(rowInfo.original);
                                                setSelectionChanged(selectionChanged ? false : true);
                                                console.log(rowInfo.original);
                                            } else {
                                                setRowEdit("");
                                            }
                                        },
                                        style: {
                                            background:
                                                rowInfo.index === rowEdit ? "#8220ff" : "white",
                                            color:
                                                rowInfo.index === rowEdit ? "white" : "black"
                                        }
                                    };
                                } else {
                                    return {};
                                }
                            }}
                        />
                    </Suspense>
                </div>
            </div>

            <Appmodal className={"modal-lg"} openModal={modal} closeModal={hideModal} modalHeader={"Add New Customer"} errors={errors} onSubmit={handleSubmitCustomer} btnContent={"Create Customer"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>First Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="FirstName"
                                        inputType="text"
                                        content={valueCustomerAdd.FirstName || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="FirstName"
                                    />
                                    {errors.FirstName && (
                                        <p className="help error_text">{errors.FirstName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Last Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="LastName"
                                        inputType="text"
                                        content={valueCustomerAdd.LastName || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="LastName"
                                    />
                                    {errors.LastName && (
                                        <p className="help error_text">{errors.LastName}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Phone Number</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PhoneNumber"
                                        inputType="text"
                                        content={valueCustomerAdd.PhoneNumber || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="PhoneNumber"
                                    />
                                    {errors.PhoneNumber && (
                                        <p className="help error_text">{errors.PhoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Mobile Number</label>
                                    <Inputfield
                                        className="form-control"
                                        name="MobileNumber"
                                        inputType="text"
                                        content={valueCustomerAdd.MobileNumber || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="MobileNumber"
                                    />
                                    {errors.MobileNumber && (
                                        <p className="help error_text">{errors.MobileNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Address1</label>
                                    <Inputfield
                                        className="form-control"
                                        name="Address1"
                                        inputType="text"
                                        content={valueCustomerAdd.Address1 || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="Address1"
                                    />
                                    {errors.Address1 && (
                                        <p className="help error_text">{errors.Address1}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Address2</label>
                                    <Inputfield
                                        className="form-control"
                                        name="Address2"
                                        inputType="text"
                                        content={valueCustomerAdd.Address2 || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="Address2"
                                    />
                                    {errors.Address2 && (
                                        <p className="help error_text">{errors.Address2}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>City</label>
                                    <Inputfield
                                        className="form-control"
                                        name="City"
                                        inputType="text"
                                        content={valueCustomerAdd.City || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="City"
                                    />
                                    {errors.City && (
                                        <p className="help error_text">{errors.City}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>State</label>
                                    <Inputfield
                                        className="form-control"
                                        name="State"
                                        inputType="text"
                                        content={valueCustomerAdd.State || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="State"
                                    />
                                    {errors.State && (
                                        <p className="help error_text">{errors.State}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Postal Code</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PostalCode"
                                        inputType="text"
                                        content={valueCustomerAdd.PostalCode || ''}
                                        controlFunc={handleChangeCustomers}
                                        placeholder="PostalCode"
                                    />
                                    {errors.PostalCode && (
                                        <p className="help error_text">{errors.PostalCode}</p>
                                    )}
                                </div>
                            </div>
                            
                        </div>
                    </form>
                </div>
            </Appmodal>

            {/*Edit Modal*/}
            <Appmodal className={"modal-lg"} openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit Customer"} errors={errorsCustomerEdit} onSubmit={handleEditCustomer} btnContent={"Save Customer"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>First Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="FirstName"
                                        inputType="text"
                                        content={valueCustomerEdit.FirstName || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="FirstName"
                                    />
                                    {errors.FirstName && (
                                        <p className="help error_text">{errors.FirstName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Last Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="LastName"
                                        inputType="text"
                                        content={valueCustomerEdit.LastName || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="LastName"
                                    />
                                    {errors.LastName && (
                                        <p className="help error_text">{errors.LastName}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Phone Number</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PhoneNumber"
                                        inputType="text"
                                        content={valueCustomerEdit.PhoneNumber || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="PhoneNumber"
                                    />
                                    {errors.PhoneNumber && (
                                        <p className="help error_text">{errors.PhoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Mobile Number</label>
                                    <Inputfield
                                        className="form-control"
                                        name="MobileNumber"
                                        inputType="text"
                                        content={valueCustomerEdit.MobileNumber || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="MobileNumber"
                                    />
                                    {errors.MobileNumber && (
                                        <p className="help error_text">{errors.MobileNumber}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Address1</label>
                                    <Inputfield
                                        className="form-control"
                                        name="Address1"
                                        inputType="text"
                                        content={valueCustomerEdit.Address1 || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="Address1"
                                    />
                                    {errors.Address1 && (
                                        <p className="help error_text">{errors.Address1}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Address2</label>
                                    <Inputfield
                                        className="form-control"
                                        name="Address2"
                                        inputType="text"
                                        content={valueCustomerEdit.Address2 || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="Address2"
                                    />
                                    {errors.Address2 && (
                                        <p className="help error_text">{errors.Address2}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>City</label>
                                    <Inputfield
                                        className="form-control"
                                        name="City"
                                        inputType="text"
                                        content={valueCustomerEdit.City || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="City"
                                    />
                                    {errors.City && (
                                        <p className="help error_text">{errors.City}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>State</label>
                                    <Inputfield
                                        className="form-control"
                                        name="State"
                                        inputType="text"
                                        content={valueCustomerEdit.State || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="State"
                                    />
                                    {errors.State && (
                                        <p className="help error_text">{errors.State}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Postal Code</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PostalCode"
                                        inputType="text"
                                        content={valueCustomerEdit.PostalCode || ''}
                                        controlFunc={handleChangeEditCustomers}
                                        placeholder="PostalCode"
                                    />
                                    {errors.PostalCode && (
                                        <p className="help error_text">{errors.PostalCode}</p>
                                    )}
                                </div>
                            </div>

                        </div>
                    </form>
                </div>
            </Appmodal>




        </section>);

}