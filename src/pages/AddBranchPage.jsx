import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useState } from "react";
import set from "lodash/set";
import classNames from "classnames";
import { registerBranchApi } from "../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";
import { branchesAtom } from "../recoil/atoms/branchAtom";

export const AddBranchPage = () => {
    useEffect(() => {
        document.title = "Add New Branch";
    }, []);
    const restaurant_id = useRecoilValue(userRestaurantIdAtom);
    const branchDetails_empty = {
        branch_name: "",
        branch_address: {
            addressline: "",
            phone: ["", ""],
            pincode: "",
            city: "",
            state: "",
            country: "",
            google_location: "",
        },
        manager: {
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            password: "",
            c_password: "",
        },
        manager_address: {
            addressline: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
        },
    };

    const [branchDetails, setBranchDetails] = useState(branchDetails_empty);
    const setBranches = useSetRecoilState(branchesAtom);
    const [saveloaders, setSaveloaders] = useState(false);
    const [errors, setErrors] = useState([]);
    const branchDetailsChangeHandler = (path, value) => {
        setBranchDetails((ps) => ({ ...set(ps, path, value) }));
    };
    const validate = () => {
        let _errors = [];
        if (!branchDetails.branch_name) {
            _errors.push("Branch name is required");
        }
        // branch_address
        if (!branchDetails.branch_address.addressline) {
            _errors.push("Branch address is required");
        }
        if (!branchDetails.branch_address.phone) {
            _errors.push("Branch address phone is required");
        }
        if (!branchDetails.branch_address.pincode) {
            _errors.push("Branch address pincode is required");
        }
        if (!branchDetails.branch_address.city) {
            _errors.push("Branch address city is required");
        }
        if (!branchDetails.branch_address.state) {
            _errors.push("Branch address state is required");
        }
        if (!branchDetails.branch_address.country) {
            _errors.push("Branch address country is required");
        }
        if (!branchDetails.branch_address.google_location) {
            _errors.push("Branch address google location is required");
        }
        // manager
        if (!branchDetails.manager.email) {
            _errors.push("Manager email location");
        }
        if (!branchDetails.manager.firstname) {
            _errors.push("Manager firstname location");
        }
        if (!branchDetails.manager.lastname) {
            _errors.push("Manager lastname location");
        }
        if (!branchDetails.manager.phone) {
            _errors.push("Manager phone location");
        }
        if (!branchDetails.manager.password) {
            _errors.push("Manager password location");
        }
        if (branchDetails.manager.password !== branchDetails.manager.c_password) {
            _errors.push("Confirm passwords dont much");
        }
        // manager_address
        if (!branchDetails.manager_address.addressline) {
            _errors.push("Manager address is required");
        }
        if (!branchDetails.manager_address.pincode) {
            _errors.push("Manager address pincode is required");
        }
        if (!branchDetails.manager_address.city) {
            _errors.push("Manager address city is required");
        }
        if (!branchDetails.manager_address.state) {
            _errors.push("Manager address state is required");
        }
        if (!branchDetails.manager_address.country) {
            _errors.push("Manager address country is required");
        }
        setErrors(_errors);
        console.log(_errors);
        return _errors.length === 0 ? true : false;
    };
    const saveBranch = async () => {
        const result = validate();
        if (!result) return;
        setSaveloaders(true);
        const res = await registerBranchApi({
            restaurant_id,
            branch: branchDetails,
        });
        if (res) {
            setSaveloaders(false);
            if (res.status === 201) {
                setBranchDetails(branchDetails_empty);
                setBranches((ps) => [res.data.branch, ...ps]);
            }
        }
    };
    return (
        <div className="">
            <div className="card h-full">
                <h3>Add Branch</h3>

                <div className="grid">
                    <div className="col-12 xl:col-6">
                        <div className="card h-full">
                            <h6 className="text-center">Branch Manager Details</h6>
                            <hr className="col-12" />
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">First name</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager.firstname}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.firstname && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager.firstname`, e.target.value)}
                                        placeholder="Enter manager firstname"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager.firstname && <small className="p-error block">Please enter manager first name.</small>}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Last name</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager.lastname}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.lastname && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager.lastname`, e.target.value)}
                                        placeholder="Enter manager lastname"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager.lastname && <small className="p-error block">Please enter manager last name.</small>}
                                </div>

                                <div className="field col-12">
                                    <label htmlFor="">Address</label>
                                    <InputTextarea
                                        disabled={saveloaders}
                                        value={branchDetails.manager_address.addressline}
                                        className={classNames({ "p-invalid block": !branchDetails.manager_address.addressline && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager_address.addressline`, e.target.value)}
                                        placeholder="Enter manager address"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager_address.addressline && <small className="p-error block">Please enter manager address.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">City</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager_address.city}
                                        className={classNames({ "p-invalid block": !branchDetails.manager_address.city && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager_address.city`, e.target.value)}
                                        placeholder="Enter manager city"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager_address.city && <small className="p-error block">Please enter manager city.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Pincode</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager_address.pincode}
                                        className={classNames({ "p-invalid block": !branchDetails.manager_address.pincode && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager_address.pincode`, e.target.value)}
                                        placeholder="Enter manager pincode"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager_address.pincode && <small className="p-error block">Please enter manager pincode.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">State</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager_address.state}
                                        className={classNames({ "p-invalid block": !branchDetails.manager_address.state && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager_address.state`, e.target.value)}
                                        placeholder="Enter manager state"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager_address.state && <small className="p-error block">Please enter manager state.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Country</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager_address.country}
                                        className={classNames({ "p-invalid block": !branchDetails.manager_address.country && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager_address.country`, e.target.value)}
                                        placeholder="Enter manager country"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager_address.country && <small className="p-error block">Please enter manager country.</small>}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Phone</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager.phone}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.phone && errors.length >= 1 })}
                                        onChange={(e) => {
                                            branchDetailsChangeHandler(`manager.phone`, e.target.value);
                                        }}
                                        placeholder="Enter manager phone number"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager.phone && <small className="p-error block">Please enter manager phone number.</small>}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Email</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.manager.email}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.email && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager.email`, e.target.value)}
                                        placeholder="Enter manager email"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager.email && <small className="p-error block">Please enter manager email address.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Password</label>
                                    <Password
                                        toggleMask
                                        disabled={saveloaders}
                                        value={branchDetails.manager.password}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.password && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager.password`, e.target.value)}
                                        placeholder="Enter manager password"
                                    />
                                    {errors.length >= 1 && !branchDetails.manager.password && <small className="p-error block">Please enter manager password.</small>}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Confirm password</label>
                                    <Password
                                        toggleMask
                                        disabled={saveloaders}
                                        value={branchDetails.manager.c_password}
                                        className={classNames({ "p-invalid block": !branchDetails.manager.c_password && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`manager.c_password`, e.target.value)}
                                        placeholder="Confirm manager password"
                                    />
                                    {errors.length >= 1 && branchDetails.manager.password !== branchDetails.manager.c_password && <small className="p-error block">Passwords dont match.</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 xl:col-6">
                        <div className="card h-full">
                            <h6 className="text-center">Branch Address</h6>
                            <hr className="col-12" />
                            <div className="p-fluid formgrid grid">
                                <div className="field col-12">
                                    <label htmlFor="">Branch Name</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_name}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_name && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_name`, e.target.value)}
                                        placeholder="Enter branch name"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_name && <small className="p-error block">Please enter branch name.</small>}
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="">Address</label>
                                    <InputTextarea
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.addressline}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.addressline && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.addressline`, e.target.value)}
                                        placeholder="Enter branch address"
                                        ea
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.addressline && <small className="p-error block">Please enter branch address.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">City</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.city}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.city && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.city`, e.target.value)}
                                        placeholder="Enter branch city"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.city && <small className="p-error block">Please enter branch city.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Pincode</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.pincode}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.pincode && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.pincode`, e.target.value)}
                                        placeholder="Enter branch pincode"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.pincode && <small className="p-error block">Please enter branch pincode.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">State</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.state}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.state && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.state`, e.target.value)}
                                        placeholder="Enter branch state"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.state && <small className="p-error block">Please enter branch state.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Country</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.country}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.country && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.country`, e.target.value)}
                                        placeholder="Enter branch country"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.country && <small className="p-error block">Please enter branch country.</small>}
                                </div>
                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Phone</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.phone[0]}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.phone[0] && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.phone[0]`, e.target.value)}
                                        placeholder="Enter branch phone number"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.phone[0] && <small className="p-error block">Please enter branch phone number.</small>}
                                </div>

                                <div className="field col-12 md:col-6">
                                    <label htmlFor="">Phone 2</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.phone[1]}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.phone[1] && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.phone[1]`, e.target.value)}
                                        placeholder="Enter branch phone number"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.phone[1] && <small className="p-error block">Please enter branch second phone number.</small>}
                                </div>
                                <div className="field col-12">
                                    <label htmlFor="">Google-map location</label>
                                    <InputText
                                        disabled={saveloaders}
                                        value={branchDetails.branch_address.google_location}
                                        className={classNames({ "p-invalid block": !branchDetails.branch_address.google_location && errors.length >= 1 })}
                                        onChange={(e) => branchDetailsChangeHandler(`branch_address.google_location`, e.target.value)}
                                        placeholder="Paste branch google location"
                                    />
                                    {errors.length >= 1 && !branchDetails.branch_address.google_location && <small className="p-error block">Please enter branch google-map location.</small>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field col-6 md:col-3 lg:col-2">
                    <Button label="Save" className="w-full" icon="pi pi-save" onClick={() => saveBranch()} disabled={saveloaders} loading={saveloaders} />
                </div>
            </div>
        </div>
    );
};
