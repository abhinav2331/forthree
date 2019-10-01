import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUom } from "../../../actions/uom.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

var userId = sessionStorage.currentUserId;

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import { useFormAdduom, useFormEdit } from "../../common/useForm";
import { validateAdduom, validateEdituom } from "../../common/form.validation";
import { forPost, forPut, forDelete } from "../../common/api.call";



const loading = () => (<div className="loader_wrap">
    <div>
        <div id="block_1" className="barlittle"></div>
        <div id="block_2" className="barlittle"></div>
        <div id="block_3" className="barlittle"></div>
        <div id="block_4" className="barlittle"></div>
        <div id="block_5" className="barlittle"></div>
    </div>
</div>);


export default function Uom() {
    //debugger;
    const UomSelector = useSelector((state) => state.UomReducer);
    const dispatch = useDispatch();
    const getAllUom = () => dispatch(getUom());
    const { values, handleChange, handleSubmit, errors } = useFormAdduom(createuom, validateAdduom);
    const { valuesedit, handleeditChange, handleeditSubmit, errorsedit, setValuesedit } = useFormEdit(edituom, validateEdituom);
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
        console.log(rowid.Id);        
        //console.log(row.Id);
        //setModal(true);
        forDelete(`uom/delete/${rowid}`)
            .then(response => {
                console.log(response.data);
                alert.success(response.data.message);
                setRowEdit("");
                getAllUom();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
            });
    };

    function createuom() {        
        forPost(`uom/add`, { UOMCode: values.UOMCode, UOMDescription: values.UOMDescription, lastUpdatedBy: "", BpartnerId: userId})
            .then(response => {
                //setMessage("");
                console.log(response.data);
                //History.push('/login');
                //setMessage(response.data);
                setModal(false);
                alert.success(response.data.message);
                getAllUom();
            }).catch((error) => {
                // Error
                console.log("--------");
                console.log(error.response);
                //setMessage(error.response);
                setModal(false);
                alert.error(error.response.statusText);
                // console.log(error.status);
            });
    };

    /*For UOM Edit*/
    const handleUomEdit = () => {
        debugger;
        setEditmodal(true); 
        setValuesedit(selectedRowIndex);        
        console.log(selectedRowIndex);
    };

    function edituom() {
        debugger;
        forPut(`uom/edit/${valuesedit.ID}`, { UOMCode: valuesedit.UOMCode, UOMDescription: valuesedit.UOMDescription, lastUpdatedBy: "", isActive: 1, BpartnerId: userId})
            .then(response => {                
                console.log(response.data);                
                setEditmodal(false);
                alert.success(response.data.message);
                setRowEdit("");
                getAllUom();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);                
                setEditmodal(false);
                alert.error(error.response.statusText);                
            });
    };

    {/*For Select row*/ }
    function renderEditable(cellInfo) {
        //debugger;
        const editable = editableRows[cellInfo.index];
        return (
            <div
                style={{ backgroundColor: editable ? "#fafafa" : null }}
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [UomSelector.Uoms];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerText;
                    //setBusinessDivision({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: UomSelector.Uoms[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    const columnsNew = [
        {
            columns: [
                {
                    Header: 'UOMDescription',
                    accessor: 'UOMDescription',
                    Cell: renderEditable
                },
                {
                    Header: 'UOMCode',
                    accessor: 'UOMCode',
                    Cell: renderEditable
                },
                {
                    Header: 'CreateedOn',
                    accessor: 'CreateedOn',
                    Cell: renderEditable
                },
                {
                    Header: 'BpartnerId',
                    accessor: 'BpartnerId',
                    Cell: renderEditable
                }
            ]
        }

    ]

    useEffect(() => {
        getAllUom();
    }, []);

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    UOM
                    <button onClick={showModal} className="btn_add dh_btn_action pull-right">Add Uom</button>
                    {
                        rowEdit == "" ? <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete }} className="dh_btn_action disabled btn_remove pull-right">Delete Attributes</button>
                            <button onClick={handleUomEdit} className="dh_btn_action disabled btn_edit pull-right">Edit Attributes</button></span>
                            : <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action btn_remove pull-right">Delete Attributes</button>
                                <button onClick={handleUomEdit} className="dh_btn_action btn_edit pull-right">Edit Attributes</button></span>
                    }
                </div>
                <div className="card-body">
                    <Suspense fallback={loading}>
                        <ReactTable
                            data={UomSelector.Uoms}
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
                                                console.log("***");
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

            <Appmodal openModal={modal} closeModal={hideModal} modalHeader={"Add New UOM"} errors={errors} onSubmit={handleSubmit} btnContent={"Create UOM"}>
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="UOMCode"
                                        inputType="text"
                                        content={values.UOMCode}
                                        controlFunc={handleChange}
                                        placeholder="UOMCode"
                                    />
                                    {errors.UOMCode && (
                                        <p className="help error_text">{errors.UOMCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMDescription</label>
                                    <Inputfield
                                        className="form-control"
                                        name="UOMDescription"
                                        inputType="text"
                                        content={values.UOMDescription}
                                        controlFunc={handleChange}
                                        placeholder="UOMDescription"
                                    />
                                    {errors.UOMDescription && (
                                        <p className="help error_text">{errors.UOMDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>

            {/*For Edit*/}
            <Appmodal openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit UOM"} errors={errorsedit} onSubmit={handleeditSubmit} btnContent={"Save UOM"}>
                <div>
                    <form  noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="UOMCode"
                                        inputType="text"
                                        content={valuesedit.UOMCode || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="UOMCode"
                                    />
                                    {errorsedit.UOMCode && (
                                        <p className="help error_text">{errorsedit.UOMCode}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMDescription</label>
                                    <Inputfield
                                        className="form-control"
                                        name="UOMDescription"
                                        inputType="text"
                                        content={valuesedit.UOMDescription || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="UOMDescription"
                                    />
                                    {errorsedit.UOMDescription && (
                                        <p className="help error_text">{errorsedit.UOMDescription}</p>
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