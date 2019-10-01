import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSuppliers } from "../../../actions/suppliers.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

var userId = sessionStorage.currentUserId;

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import { useFormAddSupplies, useFormEditSupplies } from "../../common/useForm";
import { validateAddSupplies } from "../../common/form.validation";
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


export default function Suppliers() {
    //debugger;
    const SupplierSelector = useSelector((state) => state.SupplierReducer);
    const dispatch = useDispatch();
    const getAllSuppliers = () => dispatch(getSuppliers());
    const { valueSupply, handleChangeSupplier, handleSubmitSupplier, errorSupply } = useFormAddSupplies(createSupplies, validateAddSupplies);
    const { valueSupplyEdit, handleSubmitEditSupplies, handleChangeEditSupplies, errorsedit, setValueSupplyEdit } = useFormEditSupplies(editSupplier, validateAddSupplies);
    const alert = useAlert();

    //For modal
    const [modal, setModal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);

    //For edit and delete row
    const [selectionChanged, setSelectionChanged] = useState(false);
    //const [rowHighSelect, setRowHighSelect] = useState([]);
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

    const showEditModal = () => {
        debugger;
        setEditmodal(true);
    };
    const hideEditModal = () => {
        setEditmodal(false);
    };

    const handleDelete = () => {
        debugger;
        let rowid = selectedRowIndex.ID;
        console.log(rowid.id);
        forDelete(`suppliers/delete/${rowid}`)
            .then(response => {
                console.log(response.data);
                alert.success(response.data.message);
                setRowEdit("");
                getAllSuppliers();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
            });
    };


    function createSupplies() {
        debugger;
        forPost(`suppliers/add`, {
            PartnerId: userId,
            UserName: "",
            Password: "",
            FirstName: valueSupply.FirstName,
            LastName: valueSupply.LastName,
            PhoneNumber: valueSupply.PhoneNumber,
            MobileNumber: valueSupply.MobileNumber,
            Address1: valueSupply.Address1,
            Address2: valueSupply.Address2,
            City: valueSupply.City,
            State: valueSupply.State,
            PostalCode: valueSupply.PostalCode,
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
                getAllSuppliers();
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
    /*For Edit*/
    const handleSupplierEdit = () => {
        debugger;
        setEditmodal(true);
        console.log("****");
        console.log(selectedRowIndex);
        setValueSupplyEdit(selectedRowIndex);        
    };
    function editSupplier() {
        debugger;
        forPut(`suppliers/edit/${valueSupplyEdit.ID}`, {
            PartnerId: userId,
            UserName: valueSupplyEdit.UserName,
            Password: valueSupplyEdit.Password,
            FirstName: valueSupplyEdit.FirstName,
            LastName: valueSupplyEdit.LastName,
            PhoneNumber: valueSupplyEdit.PhoneNumber,
            MobileNumber: valueSupplyEdit.MobileNumber,
            Address1: valueSupplyEdit.Address1,
            Address2: valueSupplyEdit.Address2,
            City: valueSupplyEdit.City,
            State: valueSupplyEdit.State,
            PostalCode: valueSupplyEdit.PostalCode,
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
        debugger;
        const editable = editableRows[cellInfo.index];
        return (
            <div
                style={{ backgroundColor: editable ? "#fafafa" : null }}
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [SupplierSelector.Suppliers];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerText;
                    //setBusinessDivision({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: SupplierSelector.Suppliers[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    const columnsNew = [
        {
            columns: [
                {
                    Header: 'ID',
                    accessor: 'ID',
                    Cell: renderEditable
                },
                {
                    Header: 'Username',
                    accessor: 'UserName',
                    Cell: renderEditable
                },
                {
                    Header: 'Name',
                    accessor: 'FirstName' + 'LastName',
                    Cell: renderEditable
                },
                {
                    Header: 'Phone',
                    accessor: 'PhoneNumber',
                    Cell: renderEditable
                },
                {
                    Header: 'Mobile',
                    accessor: 'MobileNumber',
                    Cell: renderEditable
                },
                {
                    Header: 'Address',
                    accessor: 'Address1' + 'Address2',
                    Cell: renderEditable
                },
                {
                    Header: 'City',
                    accessor: 'City',
                    Cell: renderEditable
                },
                {
                    Header: 'State',
                    accessor: 'State'
                },
                {
                    Header: 'Postal Code',
                    accessor: 'PostalCode'
                },
                {
                    Header: 'Activation Code',
                    accessor: 'ActivationCode'
                },
                {
                    Header: 'Actions',
                    Cell: row => (
                        <div>
                            {/*<button className="dh_btn_action btn_edit" onClick={() => handleUomEdit(row.original)}>Edit</button>
                            <button className="dh_btn_action btn_remove" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(row.original)}}>Delete</button>*/}
                        </div>
                    )
                }

            ]
        }

    ]

    useEffect(() => {
        getAllSuppliers();
    }, []);

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Suppliers
                    <button onClick={showModal} className="btn_add dh_btn_action pull-right">Add Supplies</button>
                    {
                        rowEdit == "" ? <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete }} className="dh_btn_action disabled btn_remove pull-right">Delete Attributes</button>
                            <button onClick={handleSupplierEdit} className="dh_btn_action disabled btn_edit pull-right">Edit Attributes</button></span>
                            : <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action btn_remove pull-right">Delete Attributes</button>
                                <button onClick={handleSupplierEdit} className="dh_btn_action btn_edit pull-right">Edit Attributes</button></span>
                    }
                </div>
                <div className="card-body">
                    <Suspense fallback={loading}>
                        <ReactTable
                            data={SupplierSelector.Suppliers}
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
                                                console.log("info--");
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

            <Appmodal className={"modal-lg"} openModal={modal} closeModal={hideModal} modalHeader={"Add New Supplies"} errors={errorSupply} onSubmit={handleSubmitSupplier} btnContent={"Create Supplies"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>FirstName</label>
                                    <Inputfield
                                        className="form-control"
                                        name="FirstName"
                                        inputType="text"
                                        content={valueSupply.FirstName || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="FirstName"
                                    />
                                    {errorSupply.FirstName && (
                                        <p className="help error_text">{errorSupply.FirstName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>LastName</label>
                                    <Inputfield
                                        className="form-control"
                                        name="LastName"
                                        inputType="text"
                                        content={valueSupply.LastName || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="LastName"
                                    />
                                    {errorSupply.LastName && (
                                        <p className="help error_text">{errorSupply.LastName}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>PhoneNumber</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PhoneNumber"
                                        inputType="text"
                                        content={valueSupply.PhoneNumber || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="PhoneNumber"
                                    />
                                    {errorSupply.PhoneNumber && (
                                        <p className="help error_text">{errorSupply.PhoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>MobileNumber</label>
                                    <Inputfield
                                        className="form-control"
                                        name="MobileNumber"
                                        inputType="text"
                                        content={valueSupply.MobileNumber || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="MobileNumber"
                                    />
                                    {errorSupply.MobileNumber && (
                                        <p className="help error_text">{errorSupply.MobileNumber}</p>
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
                                        content={valueSupply.Address1 || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="Address1"
                                    />
                                    {errorSupply.Address1 && (
                                        <p className="help error_text">{errorSupply.Address1}</p>
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
                                        content={valueSupply.Address2 || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="Address2"
                                    />
                                    {errorSupply.Address2 && (
                                        <p className="help error_text">{errorSupply.Address2}</p>
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
                                        content={valueSupply.City || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="City"
                                    />
                                    {errorSupply.City && (
                                        <p className="help error_text">{errorSupply.City}</p>
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
                                        content={valueSupply.State || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="State"
                                    />
                                    {errorSupply.State && (
                                        <p className="help error_text">{errorSupply.State}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>PostalCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PostalCode"
                                        inputType="text"
                                        content={valueSupply.PostalCode || ''}
                                        controlFunc={handleChangeSupplier}
                                        placeholder="PostalCode"
                                    />
                                    {errorSupply.PostalCode && (
                                        <p className="help error_text">{errorSupply.PostalCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>

            {/*For Edit*/}
            <Appmodal className={"modal-lg"} openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit Supplies"} errors={errorsedit} onSubmit={handleSubmitEditSupplies} btnContent={"Save Supplies"}>
            
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>FirstName</label>
                                    <Inputfield
                                        className="form-control"
                                        name="FirstName"
                                        inputType="text"
                                        content={valueSupplyEdit.FirstName || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="FirstName"
                                    />
                                    {errorsedit.FirstName && (
                                        <p className="help error_text">{errorsedit.FirstName}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>LastName</label>
                                    <Inputfield
                                        className="form-control"
                                        name="LastName"
                                        inputType="text"
                                        content={valueSupplyEdit.LastName || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="LastName"
                                    />
                                    {errorsedit.LastName && (
                                        <p className="help error_text">{errorsedit.LastName}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>PhoneNumber</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PhoneNumber"
                                        inputType="text"
                                        content={valueSupplyEdit.PhoneNumber || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="PhoneNumber"
                                    />
                                    {errorsedit.PhoneNumber && (
                                        <p className="help error_text">{errorsedit.PhoneNumber}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>MobileNumber</label>
                                    <Inputfield
                                        className="form-control"
                                        name="MobileNumber"
                                        inputType="text"
                                        content={valueSupplyEdit.MobileNumber || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="MobileNumber"
                                    />
                                    {errorsedit.MobileNumber && (
                                        <p className="help error_text">{errorsedit.MobileNumber}</p>
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
                                        content={valueSupplyEdit.Address1 || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="Address1"
                                    />
                                    {errorsedit.Address1 && (
                                        <p className="help error_text">{errorsedit.Address1}</p>
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
                                        content={valueSupplyEdit.Address2 || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="Address2"
                                    />
                                    {errorsedit.address2 && (
                                        <p className="help error_text">{errorsedit.Address2}</p>
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
                                        content={valueSupplyEdit.City || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="City"
                                    />
                                    {errorsedit.City && (
                                        <p className="help error_text">{errorsedit.City}</p>
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
                                        content={valueSupplyEdit.State || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="State"
                                    />
                                    {errorsedit.State && (
                                        <p className="help error_text">{errorsedit.State}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-lg-6 col-md-6 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>PostalCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="PostalCode"
                                        inputType="text"
                                        content={valueSupplyEdit.PostalCode || ''}
                                        controlFunc={handleChangeEditSupplies}
                                        placeholder="PostalCode"
                                    />
                                    {errorsedit.PostalCode && (
                                        <p className="help error_text">{errorsedit.PostalCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>
            {/*For Edit*/}


        </section>);

}