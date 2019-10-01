import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAttributeValue } from "../../../actions/attribute.value.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

var userId = sessionStorage.currentUserId;

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import { useFormAddattValue, useFormEditAddattValue } from "../../common/useForm";
import { validateAddAttValue, validateEditAttValue } from "../../common/form.validation";
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

export default function Attributevalue() {
    //debugger;
    const AttributeValueSelector = useSelector((state) => state.AttributeValueReducer);
    const dispatch = useDispatch();
    const getAllAttributevalue = () => dispatch(getAllAttributeValue());
    const { values, handleChangeAttValue, handleSubmitAttrValue, errors, isSubmitting } = useFormAddattValue(createAttValue, validateAddAttValue);
    const { valuesEdit, handleChangeEditAttValue, handleSubmitEditAttrValue, errorsedit, setValuesEdit } = useFormEditAddattValue(editAttributeValue, validateEditAttValue);
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
        console.log(rowid.id);       
        forDelete(`attributesValues/delete/${rowid}`)
            .then(response => {
                console.log(response.data);
                alert.success(response.data.message);
                setRowEdit("");
                getAllAttributevalue();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
            });
    };


    function createAttValue() {
        debugger;
        forPost("attributesValues/add", {
            AttributeValue: values.AttributeValue,
            AttributeSKUValue: values.AttributeSKUValue,
            AttributeValueDescription: values.AttributeValueDescription,
            LastUpdatedBy: "",
            IsActive: 1,
            BpartnerId: userId
        }).then(response => {
            //setMessage("");
            console.log(response.data);
            //History.push('/login');
            //setMessage(response.data);
            setModal(false);
            alert.success(response.data.message);
            getAllAttributevalue();
        }).catch((error) => {
            console.log("--------");
            console.log(error.response);
            setModal(false);
            alert.error(error.response.statusText);
        });

    };
    /*For UOM Edit*/
    const handleArticleEdit = () => {
        debugger;
        setEditmodal(true);
        setValuesEdit(selectedRowIndex);
    };
    function editAttributeValue() {
        debugger;
        forPut(`attributesValues/edit/${valuesEdit.ID}`, {
            AttributeValue: valuesEdit.AttributeValue,
            AttributeSKUValue: valuesEdit.AttributeSKUValue,
            AttributeValueDescription: valuesEdit.AttributeValueDescription,
            LastUpdatedBy: "",
            IsActive: 1,
            BpartnerId: userId
        })
            .then(response => {
                //setMessage("");
                console.log(response.data);
                //History.push('/login');
                //setMessage(response.data);
                setEditmodal(false);
                alert.success(response.data.message);
                setRowEdit("");
                getAllAttributevalue();
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
                    const data = [AttributeValueSelector.Attributevalue];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerText;
                    //setBusinessDivision({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: AttributeValueSelector.Attributevalue[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };

    const columnsNew = [
        {
            columns: [
                {
                    Header: 'attributeValue',
                    accessor: 'AttributeValue',
                    Cell: renderEditable
                },
                {
                    Header: 'attributeSKUValue',
                    accessor: 'AttributeSKUValue',
                    Cell: renderEditable
                },
                {
                    Header: 'attributeValueDescription',
                    accessor: 'AttributeValueDescription',
                    Cell: renderEditable
                },
                {
                    Header: 'createdDate',
                    accessor: 'CreateedOn',
                    Cell: renderEditable
                },
                {
                    Header: 'partnerId',
                    accessor: 'BpartnerId',
                    Cell: renderEditable
                },
                /*{
                    Header: 'Actions',
                    Cell: row => (
                        <div>
                            <button className="dh_btn_action btn_edit" onClick={() => handleArticleEdit(row.original)}>Edit</button>
                            <button className="dh_btn_action btn_remove" onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(row.original) }}>Delete</button>
                        </div>
                    )
                }*/

            ]
        }

    ]

    useEffect(() => {
        getAllAttributevalue();
    }, []);

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Attribute Value
                    <button onClick={showModal} className="btn_add dh_btn_action pull-right">Add Attributes</button>
                    {
                        rowEdit == "" ? <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action disabled btn_remove pull-right">Delete Attributes</button>
                            <button onClick={handleArticleEdit} className="dh_btn_action disabled btn_edit pull-right">Edit Attributes</button></span>
                            : <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action btn_remove pull-right">Delete Attributes</button>
                                <button onClick={handleArticleEdit} className="dh_btn_action btn_edit pull-right">Edit Attributes</button></span>
                    }
                </div>
                <div className="card-body">
                    <Suspense fallback={loading}>
                        <ReactTable
                            data={AttributeValueSelector.Attributevalue}
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

            <Appmodal openModal={modal} closeModal={hideModal} isSubmitting={isSubmitting} modalHeader={"Add New Attribute Value"} errors={errors} onSubmit={handleSubmitAttrValue} btnContent={"Create Attribute Value"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Value</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeValue"
                                        inputType="text"
                                        content={values.AttributeValue}
                                        controlFunc={handleChangeAttValue}
                                        placeholder="Attribute Value"
                                    />
                                    {errors.AttributeValue && (
                                        <p className="help error_text">{errors.AttributeValue}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute SKUValue</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeSKUValue"
                                        inputType="text"
                                        content={values.AttributeSKUValue}
                                        controlFunc={handleChangeAttValue}
                                        placeholder="Attribute SKUValue"
                                    />
                                    {errors.AttributeSKUValue && (
                                        <p className="help error_text">{errors.AttributeSKUValue}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Value Description</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeValueDescription"
                                        inputType="text"
                                        content={values.AttributeValueDescription}
                                        controlFunc={handleChangeAttValue}
                                        placeholder="Attribute Value Description"
                                    />
                                    {errors.AttributeValueDescription && (
                                        <p className="help error_text">{errors.AttributeValueDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>

            {/*For Edit*/}
            <Appmodal openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit Attribute"} errors={errorsedit} onSubmit={handleSubmitEditAttrValue} btnContent={"Save Attribute"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Value</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeValue"
                                        inputType="text"
                                        content={valuesEdit.AttributeValue}
                                        controlFunc={handleChangeEditAttValue}
                                        placeholder="Attribute Value"
                                    />
                                    {errorsedit.AttributeValue && (
                                        <p className="help error_text">{errorsedit.AttributeValue}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute SKUValue</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeSKUValue"
                                        inputType="text"
                                        content={valuesEdit.AttributeSKUValue}
                                        controlFunc={handleChangeEditAttValue}
                                        placeholder="Attribute SKUValue"
                                    />
                                    {errorsedit.AttributeSKUValue && (
                                        <p className="help error_text">{errorsedit.AttributeSKUValue}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Value Description</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeValueDescription"
                                        inputType="text"
                                        content={valuesEdit.AttributeValueDescription}
                                        controlFunc={handleChangeEditAttValue}
                                        placeholder="Attribute Value Description"
                                    />
                                    {errorsedit.AttributeValueDescription && (
                                        <p className="help error_text">{errorsedit.AttributeValueDescription}</p>
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