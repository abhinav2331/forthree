import React, { useState, useEffect, Suspense } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllAttributes } from "../../../actions/attribute.action";
import { getBusinessTypeDivision } from "../../../actions/business.type.division.action";
import ReactTable from 'react-table';
import { useAlert } from "react-alert";

var userId = sessionStorage.currentUserId;

import Appmodal from "../../modal/modal.component";
import Inputfield from "../../common/input.component";
import Selectfield from "../../common/select.component";
import { useFormAddattribute, useFormeditAttribute } from "../../common/useForm";
import { validateAddattribute, validateEditattribute } from "../../common/form.validation";
import { forPost, forPut, forDelete, forGet } from "../../common/api.call";

const loading = () => <div className="loader_wrap">
    <div>
        <div id="block_1" className="barlittle"></div>
        <div id="block_2" className="barlittle"></div>
        <div id="block_3" className="barlittle"></div>
        <div id="block_4" className="barlittle"></div>
        <div id="block_5" className="barlittle"></div>
    </div>
</div>;

export default function Attributes() {
    //debugger;
    const AttributesSelector = useSelector((state) => state.AttributeReducer);
    const dispatch = useDispatch();
    const getAllAttribute = () => dispatch(getAllAttributes());

    //const BusinessTypeDivisionSelector = useSelector((state) => state.BusinessTypeDiviReducer);
    //const getBusinessTypeDivisn = () => dispatch(getBusinessTypeDivision());

    const { valuesA, handleChangeAttribute, handleSubmit, errors, isSubmitting } = useFormAddattribute(createAttribute, validateAddattribute);
    const { valuesedit, handleeditChange, handleeditSubmit, errorsedit, setValuesedit } = useFormeditAttribute(editAttribute, validateEditattribute);
    const alert = useAlert();

    //For modal
    const [modal, setModal] = useState(false);
    const [editmodal, setEditmodal] = useState(false);
    //For row select
    const [businessDivision, setBusinessDivision] = useState([]);
    const [selectionChanged, setSelectionChanged] = useState(false);
    const [rowHighSelect, setRowHighSelect] = useState([]);
    const [rowEdit, setRowEdit] = useState("");
    const [editableRows, setEditableRows] = useState({});
    const [selectedRowIndex, setSelectedRowIndex] = useState([]);
    const [selectedItem, setSelectedItem] = useState("");
    

   
    const showModal = (event) => {
        debugger;
        //getBusinessTypeDivisn();
        event.preventDefault();
        setModal(true);
        forGet(`businesstypeDivision/alldivision/${userId}`)
            .then(response => {
                console.log("Division Data");
                console.log(response.data.DivisionList);
                setBusinessDivision(response.data.DivisionList);               
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
            });
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
        forDelete(`attributes/delete/${rowid}`)
            .then(response => {
                console.log(response.data);
                alert.success(response.data.message);
                setRowEdit("");
                getAllAttribute();
            }).catch((error) => {
                console.log("--------");
                console.log(error.response);
                alert.error(error.response.statusText);
            });
    };

    function createAttribute() {
        debugger;
        forPost("attributes/add", {
            BTDivisionId: 1,
            ParentAttributeId: 1,
            AttributeName: valuesA.AttributeName,
            AttributeType: valuesA.AttributeType,
            AttributeDescription: valuesA.AttributeDescription,
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
                getAllAttribute();
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
    /*For UOM Edit*/
    const handleArticleEdit = () => {
        //debugger;
        setEditmodal(true);
        setValuesedit(selectedRowIndex);
    };
    function editAttribute() {
        //debugger;
        forPut(`attributes/edit/${valuesedit.ID}`, {
            BTDivisionId: 1, ParentAttributeId: 1, AttributeName: valuesedit.AttributeName,
            AttributeType: valuesedit.AttributeType,
            AttributeDescription: valuesedit.AttributeDescription,
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
                getAllAttribute();
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
    /*For checkbox*/
    function renderEditable(cellInfo){        
        const editable = editableRows[cellInfo.index];
        return (
            <div
                style={{ backgroundColor: editable ? "#fafafa" : null }}
                contentEditable={editable}
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [AttributesSelector.Attributes];
                    data[cellInfo.index][cellInfo.column.id] = e.target.innerText;
                    //setBusinessDivision({ data });
                }}
                dangerouslySetInnerHTML={{
                    __html: AttributesSelector.Attributes[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    };


    const columnsNew = [
        {
            columns: [                
                {
                    Header: 'divisionName',
                    accessor: 'DivisionName',
                    Cell: renderEditable
                },
                {
                    Header: 'attributeName',
                    accessor: 'AttributeName',
                    Cell: renderEditable
                },
                {
                    Header: 'attributeDescription',
                    accessor: 'AttributeDescription',
                    Cell: renderEditable
                },
                {
                    Header: 'partnerId',
                    accessor: 'BpartnerId',
                    Cell: renderEditable
                }                

            ]
        }

    ]

    useEffect(() => {
        getAllAttribute(); 
    }, []);

    return (
        <section>
            <div className="card">
                <div className="card-header">
                    Attributes
                    <button onClick={showModal} className="btn_add dh_btn_action pull-right">Add Attributes</button>
                    {
                        rowEdit == "" ? <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete }} className="dh_btn_action disabled btn_remove pull-right">Delete Attributes</button>
                            <button onClick={handleArticleEdit} className="dh_btn_action disabled btn_edit pull-right">Edit Attributes</button></span> 
                            : <span><button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete() }} className="dh_btn_action btn_remove pull-right">Delete Attributes</button>
                                <button onClick={handleArticleEdit} className="dh_btn_action btn_edit pull-right">Edit Attributes</button></span>
                    }
                    
                </div>
                <div className="card-body">
                    <Suspense fallback={loading}>
                        <ReactTable
                            data={AttributesSelector.Attributes}
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
                                                console.log("@@@");
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

            <Appmodal openModal={modal} closeModal={hideModal} isSubmitting={isSubmitting} modalHeader={"Add New Attribute"} errors={errors} onSubmit={handleSubmit} btnContent={"Create Attribute"}>
                                
                <div>
                    <form noValidate>

                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Business Type Division {valuesA.divisionName}</label>
                                    <Selectfield
                                        className="form-control"
                                        name="DivisionName"
                                        options={businessDivision.map(w => {
                                            return { name: w.DivisionName, value: w.id };
                                        })}
                                        controlFunc={handleChangeAttribute}
                                        placeholder="Business Type Division"
                                        selectedOption={valuesA.DivisionName}
                                    />
                                    {errors.divisionName && (
                                        <p className="help error_text">{errors.divisionName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeName"
                                        inputType="text"
                                        content={valuesA.AttributeName}
                                        controlFunc={handleChangeAttribute}
                                        placeholder="Attribute Name"
                                    />
                                    {errors.AttributeName && (
                                        <p className="help error_text">{errors.AttributeName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Type</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeType"
                                        inputType="text"
                                        content={valuesA.AttributeType}
                                        controlFunc={handleChangeAttribute}
                                        placeholder="Attribute Type"
                                    />
                                    {errors.AttributeType && (
                                        <p className="help error_text">{errors.AttributeType}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Description</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeDescription"
                                        inputType="text"
                                        content={valuesA.AttributeDescription}
                                        controlFunc={handleChangeAttribute}
                                        placeholder="Attribute Description"
                                    />
                                    {errors.AttributeDescription && (
                                        <p className="help error_text">{errors.AttributeDescription}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </Appmodal>

            {/*For Edit*/}
            <Appmodal openModal={editmodal} closeModal={hideEditModal} modalHeader={"Edit Attribute"} errors={errorsedit}  onSubmit={handleeditSubmit} btnContent={"Save Attribute"}>
                <div>
                    <form noValidate>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Name</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeName"
                                        inputType="text"
                                        content={valuesedit.AttributeName || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="Attribute Name"
                                    />
                                    {errorsedit.AttributeName && (
                                        <p className="help error_text">{errorsedit.AttributeName}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Type</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeType"
                                        inputType="text"
                                        content={valuesedit.AttributeType || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="Attribute Type"
                                    />
                                    {errorsedit.AttributeType && (
                                        <p className="help error_text">{errorsedit.AttributeType}</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="form-group dh-m">
                                    <label>Attribute Description</label>
                                    <Inputfield
                                        className="form-control"
                                        name="AttributeDescription"
                                        inputType="text"
                                        content={valuesedit.AttributeDescription || ''}
                                        controlFunc={handleeditChange}
                                        placeholder="Attribute Description"
                                    />
                                    {errorsedit.AttributeDescription && (
                                        <p className="help error_text">{errorsedit.AttributeDescription}</p>
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