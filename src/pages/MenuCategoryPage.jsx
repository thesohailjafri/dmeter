import React, { useCallback, useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import classNames from "classnames";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { useRecoilValue } from "recoil";
import { Column, DataTable } from "primereact";
import { deleteMenuCategory, getMenuCategories, postMenuCategory } from "../api";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";

export const MenuCategoryPage = () => {
    const dt = useRef(null);
    const params = useParams();
    const branches = useRecoilValue(branchesAtom);
    const [records, setRecords] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);
    const [branch, setBranch] = useState({});
    const [branch_id, setBranchId] = useState("");
    const [newLoader, setNewLoader] = useState(false);
    const [deleteLoader, setDeleteLoader] = useState(false);

    const empty_newRecord = {
        name: "",
        description: "",
    };
    const [newRecord, setNewRecord] = useState(empty_newRecord);
    const [errors, setErrors] = useState([]);
    const newRecordChangeHandler = (path, value) => {
        setNewRecord((ps) => ({ ...ps, [path]: value }));
    };

    const validate = () => {
        let _errors = [];
        if (!newRecord.name) {
            _errors.push("Name is required");
        }

        setErrors(_errors);
        console.log("hii", _errors);

        return _errors.length === 0 ? true : false;
    };
    const clearNewRecord = () => {
        setNewRecord(empty_newRecord);
    };
    const saveNewRecord = async () => {
        setNewLoader(true);
        const result = validate();
        if (!result) {
            return setNewLoader(false);
        }
        const res = await postMenuCategory({ ...newRecord, branch_id });
        if (res) {
            setNewLoader(false);
            if (res.status === 201) {
                setRecords((ps) => [...ps, res.data.record]);
                clearNewRecord();
            }
        }
    };

    useEffect(() => {
        const id = params?.branch_id;
        setBranchId(id);
        const re = branches.find((item) => item._id === id);
        setBranch(re);
    }, [params?.branch_id, branches]);

    useEffect(() => {
        document.title = branch?.branch_name + " Branch Menu Categories";
    }, [branch]);

    const fetchMenu = useCallback(async () => {
        if (!restaurantId || !branch_id) return;
        const res = await getMenuCategories({
            restaurant_id: restaurantId,
            branch_id: branch_id,
            fields: "name description",
        });
        if (res) {
            if (res.status === 200) {
                setRecords(res.data.records);
            }
        }
    }, [restaurantId, branch_id]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    const handleRecordDelete = async (id) => {
        setDeleteLoader(true);
        const res = await deleteMenuCategory(id);
        if (res) {
            setDeleteLoader(false);
            if (res.status === 200) {
                setRecords((ps) => [...ps].filter((r) => r._id !== id));
            }
        }
    };
    const deleteRecordConfirm = (event, id) => {
        confirmPopup({
            target: event.currentTarget,
            message: "Do you want to delete this record?",
            icon: "pi pi-info-circle",
            acceptClassName: "p-button-danger",
            accept: () => handleRecordDelete(id),
        });
    };
    const actionBody = (rd) => {
        return (
            <div className="flex gap-1">
                <Button label="Edit" icon="pi pi-pencil" />
                <Button disabled={deleteLoader} label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={(e) => deleteRecordConfirm(e, rd._id)} />
            </div>
        );
    };
    return (
        <div className="">
            <ConfirmPopup />
            <div className="card">
                <h3>{branch?.branch_name} Branch Menu Categories</h3>
                <TabView className="">
                    <TabPanel header="Existing Records" leftIcon="pi pi-th-large mr-2">
                        <DataTable
                            ref={dt}
                            value={records}
                            showGridlines
                            breakpoint="1600px"
                            className="datatable-responsive"
                            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                            rows={10}
                            paginator
                            rowsPerPageOptions={[10, 50, 100, 250, 500]}
                            removableSort
                        >
                            <Column header="Name" field="name" />
                            <Column header="Description" field="description" />

                            <Column header="Action" body={actionBody} />
                        </DataTable>
                    </TabPanel>
                    <TabPanel header="Add Record" leftIcon="pi pi-plus-circle mr-2">
                        <div className="mb-4">
                            <div className="formgrid grid">
                                <div className="col-12">
                                    <div className="card">
                                        <div className="p-fluid grid formgrid">
                                            <div className="field col-12">
                                                <label htmlFor="">Category Name</label>
                                                <InputText disabled={newLoader} value={newRecord.name} onChange={(e) => newRecordChangeHandler(`name`, e.target.value)} className={classNames({ "p-invalid block": !newRecord.name && errors.length >= 1 })} placeholder="Enter Category Name" />
                                                {errors.length >= 1 && !newRecord.name && <small className="p-error block">Please enter category name</small>}
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Description (optional)</label>
                                                <InputTextarea rows={5} disabled={newLoader} value={newRecord.description} onChange={(e) => newRecordChangeHandler(`description`, e.target.value)} placeholder="Enter Description" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="field col-12 md:col-4 lg:col-3 xl:col-2">
                                    <Button
                                        loading={newLoader}
                                        disabled={newLoader}
                                        label={newLoader ? "Saving" : "Save"}
                                        className="w-full"
                                        icon="pi pi-save"
                                        onClick={() => {
                                            saveNewRecord();
                                        }}
                                    />
                                </div>
                                <div className="field col-12 md:col-4 lg:col-3 xl:col-2">
                                    <Button
                                        label="Clear Details"
                                        className="w-full p-button-danger"
                                        icon="pi pi-trash"
                                        onClick={() => {
                                            clearNewRecord();
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
            {/* {console.log(menuDetails)} */}
        </div>
    );
};
