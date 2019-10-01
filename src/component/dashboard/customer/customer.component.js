import React, { useState, useEffect, Suspense } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUom } from "../../../actions/uom.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import { useFormAdduom, useFormEdit } from "../../common/useForm";
import { validateAdduom, validateEdituom } from "../../common/form.validation";
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


export default function Customers() {
    //debugger;
    const UomSelector = useSelector((state) => state.UomReducer);
    const dispatch = useDispatch();
    const getAllUom = () => dispatch(getUom());
    //const { values, handleChange, handleSubmit, errors } = useFormAdduom(createuom, validateAdduom);
    //const { valuesedit, handleeditChange, handleeditSubmit, errorsedit, setValuesedit } = useFormEdit(edituom, validateEdituom);
    const alert = useAlert();

    //For modal
    //const [modal, setModal] = useState(false);
    //const [editmodal, setEditmodal] = useState(false);
    //For edit and delete row
    const [selectionChanged, setSelectionChanged] = useState(false);
    const [rowHighSelect, setRowHighSelect] = useState([]);
    const [rowEdit, setRowEdit] = useState("");
    const [editableRows, setEditableRows] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState([]);

    {/*const showModal = (event) => {
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
    };*/}

    {/*const handleDelete = () => {
        debugger;
        let rowid = selectedRowIndex.Id;
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
                if (error.response) {
                    console.log("--------");
                    console.log(error.response);
                    alert.error(error.response.statusText);
                } else if (error.request) {
                } else {
                }
            });
    };*/}


    /*function createuom() {
        debugger;
        forPost(`uom/add`, { uomCode: values.uomCode, uomDescription: values.uomDescription, lastUpdatedBy: "", BpartnerId: 14 })
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

    };*/
    /*For UOM Edit*/
    /*const handleUomEdit = () => {
        debugger;
        setEditmodal(true);
        setValuesedit(selectedRowIndex);
    };
    function edituom() {
        debugger;
        forPut(`uom/edit/${valuesedit.Id}`, { uomCode: valuesedit.uomCode, uomDescription: valuesedit.uomDescription, lastUpdatedBy: "", isActive: 1, BpartnerId: 14 })
            .then(response => {
                //setMessage("");
                console.log(response.data);
                //History.push('/login');
                //setMessage(response.data);
                setEditmodal(false);
                alert.success(response.data.message);
                setRowEdit("");
                getAllUom();
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
    };*/

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
                    accessor: 'uomDescription',
                    Cell: renderEditable
                },
                {
                    Header: 'UOMCode',
                    accessor: 'uomCode',
                    Cell: renderEditable
                },
                {
                    Header: 'CreateedOn',
                    accessor: 'createedDate',
                    Cell: renderEditable
                },
                {
                    Header: 'BpartnerId',
                    accessor: 'Id',
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
                                            if (rowInfo.index != rowEdit) {
                                                setRowEdit(rowInfo.index);
                                                setSelectedRowIndex(rowInfo.original);
                                                setSelectionChanged(selectionChanged ? false : true);
                                                console.log(rowInfo.original);
                                            } else {
                                                setRowEdit("");
                                            }
                                            //console.log(rowInfo.index);
                                            //console.log(rowEdit);
                                            //console.log(rowInfo.original);
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

            {/*<Appmodal openModal={modal} closeModal={hideModal} modalHeader={"Add New UOM"} errors={errors} onSubmit={handleSubmit} btnContent={"Create UOM"}>
                <div>
                    <form onSubmit={handleSubmit} noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="uomCode"
                                        inputType="text"
                                        content={values.uomCode}
                                        controlFunc={handleChange}
                                        placeholder="uomCode"
                                    />
                                    {errors.uomCode && (
                                        <p className="help error_text">{errors.uomCode}</p>
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
                                        name="uomDescription"
                                        inputType="text"
                                        content={values.uomDescription}
                                        controlFunc={handleChange}
                                        placeholder="uomDescription"
                                    />
                                    {errors.uomDescription && (
                                        <p className="help error_text">{errors.uomDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>*/}

            {/*For Edit*/}
            {/*<Appmodal openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit UOM"} errors={errorsedit} onSubmit={handleeditSubmit} btnContent={"Save UOM"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>UOMCode</label>
                                    <Inputfield
                                        className="form-control"
                                        name="uomCode"
                                        inputType="text"
                                        content={valuesedit.uomCode || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="uomCode"
                                    />
                                    {errorsedit.uomCode && (
                                        <p className="help error_text">{errorsedit.uomCode}</p>
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
                                        name="uomDescription"
                                        inputType="text"
                                        content={valuesedit.uomDescription || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="uomDescription"
                                    />
                                    {errorsedit.uomDescription && (
                                        <p className="help error_text">{errorsedit.uomDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>*/}
            {/*For Edit*/}


        </section>);

}