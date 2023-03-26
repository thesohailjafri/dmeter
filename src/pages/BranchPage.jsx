import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import React, { useState } from "react";
import { useCallback } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBranchApi } from "../api";

export const BranchPage = () => {
    // find branch name from branch id
    const params = useParams();
    const [branchId, setBranchId] = useState("");
    const [branchName, setBranchName] = useState("");
    const [data, setData] = useState({});
    const [draftData, setDraftData] = useState({});
    const [mode, setMode] = useState("view");

    const fetchBranch = useCallback(async () => {
        if (!branchId) return;
        const res = await getBranchApi(branchId);
        if (res) {
            setData(res.data);
            setBranchName(res?.data?.branch?.branch_name);
        }
    }, [branchId]);

    const handleEdit = () => {
        setMode("edit");
    };

    const handleSave = () => {
        setMode("view");
    };

    const handleCancle = () => {
        setMode("view");
    };

    useEffect(() => {
        const id = params?.branch_id;
        setBranchId(id);
    }, [params?.branch_id]);

    useEffect(() => {
        document.title = branchName + " Branch";
    }, [branchName]);

    useEffect(() => {
        fetchBranch();
    }, [fetchBranch]);

    return (
        <div>
            <div className="card">
                <h3>{branchName} Branch</h3>
                <div className="field formgrid grid">
                    <div className="col-12 xl:col-6">
                        <div className="card">
                            <h6 className="text-center">Branch Manager Details</h6>
                            <hr className="col-12" />
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">First name</label>
                                    <InputText disabled={mode === "view"} value={data?.manager?.name?.first} placeholder="Eg. John" />
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Last name</label>
                                    <InputText disabled={mode === "view"} value={data?.manager?.name?.last} placeholder="Eg. Doe" />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="">Phone</label>
                                    <InputText disabled={mode === "view"} value={data?.manager?.phone} placeholder="Eg. +910123456789" />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="">Email</label>
                                    <InputText disabled={mode === "view"} value={data?.manager?.email} placeholder="Eg. john.doe@random.com" />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="">Address</label>
                                    <InputTextarea disabled={mode === "view"} value={data?.manager_address?.addressline} placeholder="Eg. 301/MountView, Long Road" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">City</label>
                                    <InputText disabled={mode === "view"} value={data?.manager_address?.city} placeholder="Eg. Mumbai" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Pincode</label>
                                    <InputText disabled={mode === "view"} value={data?.manager_address?.pincode} placeholder="Eg. 400400" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">State</label>
                                    <InputText disabled={mode === "view"} value={data?.manager_address?.state} placeholder="Eg. Maharastra" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Country</label>
                                    <InputText disabled={mode === "view"} value={data?.manager_address?.country} placeholder="Eg. India" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card">
                            <h6 className="text-center">Branch Address</h6>
                            <hr className="col-12" />
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <label htmlFor="">Branch Name</label>
                                    <InputText value={data?.branch?.branch_name} disabled={mode === "view"} placeholder="Eg. Sion" />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="">Branch About Us</label>
                                    <InputTextarea autoResize value={data?.branch?.branch_aboutus} disabled={mode === "view"} placeholder="Eg. Sion" />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="">Branch Slug</label>
                                    <div className="flex gap-3">
                                        <InputText value={data?.branch?.branch_slug} disabled={mode === "view"} placeholder="Eg. Sion" />
                                        <a href={process.env.REACT_APP_CLIENT_APP_URL + "branch/" + data?.branch?.branch_slug} target="_blank" rel="noreferrer">
                                            <Button icon="pi pi-external-link" label="Open" />
                                        </a>
                                    </div>
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Phone</label>
                                    <InputText value={data?.branch_address?.phone[0]} disabled={mode === "view"} placeholder="Eg. +910123456789" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Phone 2</label>
                                    <InputText value={data?.branch_address?.phone[1]} disabled={mode === "view"} placeholder="Eg. +910123456789" />
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="">Address</label>
                                    <InputTextarea value={data?.branch_address?.addressline} disabled={mode === "view"} placeholder="Eg. 301 Long Road" ea />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">City</label>
                                    <InputText value={data?.branch_address?.city} disabled={mode === "view"} placeholder="Eg. Mumbai" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Pincode</label>
                                    <InputText value={data?.branch_address?.pincode} disabled={mode === "view"} placeholder="Eg. 400400" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">State</label>
                                    <InputText value={data?.branch_address?.state} disabled={mode === "view"} placeholder="Eg. Maharastra" />
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Country</label>
                                    <InputText value={data?.branch_address?.country} disabled={mode === "view"} placeholder="Eg. India" />
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="">Google-map location</label>
                                    <InputText value={data?.branch_address?.google_location} disabled={mode === "view"} placeholder="Eg. https://goo.gl/maps/xyz" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="formgrid grid">
                    {mode === "view" && (
                        <div className="field col-6 md:col-3 lg:col-2">
                            <Button label="Edit" className="w-full" icon="pi pi-pencil" onClick={handleEdit} />
                        </div>
                    )}
                    {mode === "edit" && (
                        <>
                            <div className="field col-6 md:col-3 lg:col-2">
                                <Button label="Save" className="w-full" icon="pi pi-save" onClick={handleSave} />
                            </div>
                            <div className="field col-6 md:col-3 lg:col-2">
                                <Button label="Cancle" className="w-full p-button-danger" icon="pi pi-times" onClick={handleCancle} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
