import React, { useEffect, useState } from "react";

import set from "lodash/set";
import classNames from "classnames";
import { getBranchStaffApi, registerStaffApi } from "../api";
import { Toast, Dropdown, TabView, TabPanel, InputText, InputTextarea, Password, Button } from "primereact";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { StaffDatatable } from "../components/datatables/StaffDatatable";

export const StaffPage = () => {
    const toast = useRef(null);
    const params = useParams();
    const [branch, setBranch] = useState({});
    const [branchId, setBranchId] = useState("");

    const branches = useRecoilValue(branchesAtom);

    const [records, setRecords] = useState([]);

    const staffDetails_empty = {
        member_address: {
            addressline: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
        },
        member_details: {
            email: "",
            firstname: "",
            lastname: "",
            phone: "",
            password: "",
            c_password: "",
            position: "",
        },
    };

    const [staffDetails, setStaffDetails] = useState(staffDetails_empty);
    const [newLoader, setNewLoader] = useState(false);
    const [errors, setErrors] = useState([]);

    const staffDetailsChangeHandler = (path, value) => {
        setStaffDetails((ps) => ({ ...set(ps, path, value) }));
    };

    const validate = () => {
        let _errors = [];
        if (!staffDetails.member_details.position) {
            _errors.push("Position is required");
        }
        if (!staffDetails.member_details.firstname) {
            _errors.push("Staff First name is required");
        }
        if (!staffDetails.member_details.lastname) {
            _errors.push("Staff Last name is required");
        }
        if (!staffDetails.member_details.email) {
            _errors.push("Staff email is required");
        }
        if (!staffDetails.member_address.addressline) {
            _errors.push("Address is required");
        }
        if (!staffDetails.member_address.city) {
            _errors.push("City is required");
        }
        if (!staffDetails.member_address.pincode) {
            _errors.push("Pincode is required");
        }
        if (!staffDetails.member_address.state) {
            _errors.push("State is required");
        }
        if (!staffDetails.member_address.country) {
            _errors.push("Country is required");
        }
        if (!staffDetails.member_details.password) {
            _errors.push("Password is required");
        }
        if (staffDetails.member_details.password !== staffDetails.member_details.c_password) {
            _errors.push("Passwords do not match");
        }
        setErrors(_errors);
        console.log(_errors);
        return _errors.length === 0 ? true : false;
    };

    const saveStaff = async () => {
        const result = validate();
        if (!result) return;
        setNewLoader(true);
        const res = await registerStaffApi({
            member_details: staffDetails.member_details,
            member_address: staffDetails.member_address,
            branch_id: branch._id,
        });
        if (res) {
            setNewLoader(false);
            if (res.status === 201) {
                setStaffDetails(staffDetails_empty);
                setRecords((ps) => [...ps, res.data?.staffMember]);
            }
        }
    };

    const fetchStaffMembers = useCallback(async () => {
        if (!branchId) return;
        const res = await getBranchStaffApi(branchId);
        if (res) {
            if (res.status === 200) {
                setRecords(res.data?.staff);
            }
        }
    }, [branchId]);

    useEffect(() => {
        fetchStaffMembers();
    }, [fetchStaffMembers]);

    useEffect(() => {
        const id = params?.branch_id;
        setBranchId(id);
        const re = branches.find((item) => item._id === id);
        setBranch(re);
    }, [params?.branch_id, branches]);

    useEffect(() => {
        document.title = branch?.branch_name + " Branch Staff";
    }, [branch]);

    return (
        <div className="">
            <Toast ref={toast} />
            <div className="card">
                <h3>{branch?.branch_name} Branch Staff</h3>
                <TabView className="">
                    <TabPanel header="Existing Records" leftIcon="pi pi-th-large mr-2">
                        <StaffDatatable records={records} setRecords={setRecords} allRecords={false} />
                    </TabPanel>
                    <TabPanel header="Add Record" leftIcon="pi pi-plus-circle mr-2">
                        <div className="mb-4">
                            <div className="formgrid grid">
                                <h5 className="col-12 text-center">Staff Member Details</h5>
                                <div className="col-12 xl:col-6">
                                    <div className="card">
                                        <h6 className="text-center">Staff Personal Details</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid formgrid grid">
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">First name</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.firstname}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.firstname && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_details.firstname`, e.target.value)}
                                                    placeholder="Enter firstname"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.firstname && <small className="p-error block">Please enter first name.</small>}
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Last name</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.lastname}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.lastname && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_details.lastname`, e.target.value)}
                                                    placeholder="Enter lastname"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.lastname && <small className="p-error block">Please enter lastname</small>}
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Position</label>
                                                <Dropdown
                                                    options={["cook", "staff"]}
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.position}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.position && errors.length >= 1 })}
                                                    onChange={(e) => {
                                                        staffDetailsChangeHandler(`member_details.position`, e.value);
                                                    }}
                                                    placeholder="Enter position"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.position && <small className="p-error block">Please enter postion.</small>}
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Phone</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.phone}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.phone && errors.length >= 1 })}
                                                    onChange={(e) => {
                                                        staffDetailsChangeHandler(`member_details.phone`, e.target.value);
                                                    }}
                                                    placeholder="Enter phone number"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.phone && <small className="p-error block">Please enter phone number</small>}
                                            </div>

                                            <div className="field col-12">
                                                <label htmlFor="">Email</label>

                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.email}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.email && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_details.email`, e.target.value)}
                                                    placeholder="Enter email address"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.email && <small className="p-error block">Please enter email</small>}
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Password</label>
                                                <Password
                                                    toggleMask
                                                    disabled={newLoader}
                                                    value={staffDetails.member_details.password}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_details.password && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_details.password`, e.target.value)}
                                                    placeholder="Enter password"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_details.password && <small className="p-error block">Password field cannot be empty</small>}
                                            </div>
                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Confirm password</label>
                                                <Password toggleMask disabled={newLoader} value={staffDetails.member_details.c_password} onChange={(e) => staffDetailsChangeHandler(`member_details.c_password`, e.target.value)} placeholder="Confirm password" />
                                                {errors.length >= 1 && !staffDetails.member_details.c_password && <small className="p-error block">Confirm password field cannot be empty</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 xl:col-6">
                                    <div className="card">
                                        <h6 className="text-center">Staff Address Details</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid formgrid grid">
                                            <div className="field col-12 ">
                                                <label htmlFor="">Address</label>
                                                <InputTextarea
                                                    disabled={newLoader}
                                                    value={staffDetails.member_address.addressline}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_address.addressline && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_address.addressline`, e.target.value)}
                                                    placeholder="Enter address"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_address.addressline && <small className="p-error block">Please enter address</small>}
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">City</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_address.city}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_address.city && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_address.city`, e.target.value)}
                                                    placeholder="Enter city"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_address.city && <small className="p-error block">Please enter city</small>}
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">State</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_address.state}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_address.state && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_address.state`, e.target.value)}
                                                    placeholder="Enter state"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_address.state && <small className="p-error block">Please enter state</small>}
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Pincode</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_address.pincode}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_address.pincode && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_address.pincode`, e.target.value)}
                                                    placeholder="Enter pincode"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_address.pincode && <small className="p-error block">Please enter pincode</small>}
                                            </div>

                                            <div className="field col-12 md:col-6">
                                                <label htmlFor="">Country</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={staffDetails.member_address.country}
                                                    className={classNames({ "p-invalid block": !staffDetails.member_address.country && errors.length >= 1 })}
                                                    onChange={(e) => staffDetailsChangeHandler(`member_address.country`, e.target.value)}
                                                    placeholder="Enter country"
                                                />
                                                {errors.length >= 1 && !staffDetails.member_address.country && <small className="p-error block">Please enter country</small>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="grid formgrid">
                            <div className="field col-6 md:col-3 lg:col-2">
                                <Button label="Save" loading={newLoader} disabled={newLoader} className="w-full" icon="pi pi-save" onClick={() => saveStaff()} />
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};
