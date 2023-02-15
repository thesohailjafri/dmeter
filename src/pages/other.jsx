import React from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";

import { Button } from "primereact/button";
import { useState } from "react";
import set from "lodash/set";
import classNames from "classnames";
import { registerBranchApi, registerRetaurantApi, registerStaffApi } from "../api";
import { Toast } from "primereact/toast";
import { useRef } from "react";

export const other = () => {
    const toast = useRef(null);
    const restaurantDetails_empty = {
        restaurant_name: "",
        restaurant_address: {
            addressline: "",
            phone: "",
            alt_phone: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
            landmark: "",
        },
        owner_address: {
            addressline: "",
            phone: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
            landmark: " ",
        },
        owner: {
            email: "",
            firstname: "",
            lastname: "",
            password: "",
            c_password: "",
            phone: "",
        },
    };
    const branchDetails_empty = {
        branch_name: "",
        branch_address: {
            addressline: "",
            phone: ["", ""],
            landmark: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
            otherDetails: "",
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
            phone: "",
            pincode: "",
            city: "Mumbai",
            state: "",
            country: "",
            landmark: "",
        },
    };
    const staffDetails_empty = {
        branch_id: "",
        branch: {},
        member_address: {
            addressline: "",
            phone: "",
            landmark: "",
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
    const restaurantAndBranchDetails_empty = {
        restaurant_id: "",
        restaurant_name: "",
        branches: [],
    };
    const [activeIndex, setActiveIndex] = useState(0);

    const [restaurantAndBranchDetails, setRestaurantAndBranchDetails] = useState(restaurantAndBranchDetails_empty);

    const [restaurantDetails, setRestaurantDetails] = useState(restaurantDetails_empty);
    const [branchDetails, setBranchDetails] = useState([branchDetails_empty]);
    const [staffDetails, setStaffDetails] = useState([staffDetails_empty]);
    const [saveloaders, setSaveloaders] = useState({
        restaurant: false,
        branch: false,
        staff: false,
    });
    const saveloadersChangeHandler = (target, value) => {
        setSaveloaders((ps) => ({ ...ps, [target]: value }));
    };
    const addBranch = () => {
        setBranchDetails((ps) => [...ps, branchDetails_empty]);
    };
    const deleteBranch = (index) => {
        setBranchDetails((ps) => [...ps.filter((_, idx) => idx !== index)]);
    };
    const addStaff = () => {
        setStaffDetails((ps) => [...ps, staffDetails_empty]);
    };
    const deleteStaff = (index) => {
        setStaffDetails((ps) => [...ps.filter((_, idx) => idx !== index)]);
    };
    const restaurantDetailsChangeHandler = (path, value) => {
        setRestaurantDetails((ps) => ({ ...set(ps, path, value) }));
    };
    const branchDetailsChangeHandler = (path, value) => {
        setBranchDetails((ps) => [...set(ps, path, value)]);
    };
    const staffDetailsChangeHandler = (path, value) => {
        setStaffDetails((ps) => [...set(ps, path, value)]);
    };
    const saveRestaurant = async () => {
        saveloadersChangeHandler("restaurant", true);
        const res = await registerRetaurantApi(restaurantDetails);
        if (res) {
            saveloadersChangeHandler("restaurant", false);
            if (res.status === 201) {
                toast.current.show({ severity: "success", summary: "Successful", detail: res.data.msg, life: 5000 });
                setRestaurantAndBranchDetails((ps) => ({ ...ps, restaurant_id: res.data.restaurant._id, restaurant_name: res.data.restaurant.restaurant_name }));
                setActiveIndex(1);
            }
        }
    };
    const saveBranch = async () => {
        saveloadersChangeHandler("branch", true);
        const res = await registerBranchApi({ restaurant_id: restaurantAndBranchDetails.restaurant_id, branches: branchDetails });
        if (res) {
            saveloadersChangeHandler("branch", false);
            if (res.status === 201) {
                toast.current.show({ severity: "success", summary: "Successful", detail: res.data.msg, life: 5000 });
                setRestaurantAndBranchDetails((ps) => ({ ...ps, branches: res.data.branches }));
                setActiveIndex(2);
            }
        }
    };
    const saveStaff = async () => {
        saveloadersChangeHandler("staff", true);
        const res = await registerStaffApi({ restaurant_id: restaurantAndBranchDetails.restaurant_id, staff: staffDetails });
        if (res) {
            saveloadersChangeHandler("staff", false);
            if (res.status === 201) {
                toast.current.show({ severity: "success", summary: "Successful", detail: res.data.msg, life: 5000 });
            }
        }
    };
    return (
        <div className="">
            <Toast ref={toast} />
            <div className="card">
                <h3>Sign Up</h3>
                <TabView className="" activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    {/* Restaurant */}
                    <TabPanel header="Restaurant" leftIcon="pi pi-home mr-2">
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <h6 className=" mt-2 ">Restaurant Details</h6>
                                <div className="p-fluid formgrid grid card">
                                    <div className="field col-12">
                                        <label htmlFor="">Restaurant Name</label>
                                        <InputText
                                            placeholder="Cake Cafe"
                                            value={restaurantDetails.restaurant_name}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_name", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12">
                                        <label htmlFor="">Address</label>
                                        <InputTextarea
                                            placeholder="Eg. 301 Long Road"
                                            value={restaurantDetails.restaurant_address.addressline}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.addressline", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Phone</label>
                                        <InputText
                                            placeholder="Eg. +910123456789"
                                            value={restaurantDetails.restaurant_address.phone}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.phone", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">City</label>
                                        <InputText
                                            placeholder="Eg. Mumbai"
                                            value={restaurantDetails.restaurant_address.city}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.city", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Pincode</label>
                                        <InputText
                                            placeholder="Eg. 400400"
                                            value={restaurantDetails.restaurant_address.pincode}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.pincode", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">State</label>
                                        <InputText
                                            placeholder="Eg. Maharastra"
                                            value={restaurantDetails.restaurant_address.state}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.state", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Country</label>
                                        <InputText
                                            placeholder="Eg. India"
                                            value={restaurantDetails.restaurant_address.country}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.country", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Lankmark</label>
                                        <InputText
                                            placeholder="Eg. Victor circle"
                                            value={restaurantDetails.restaurant_address.landmark}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("restaurant_address.landmark", e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 md:col-6">
                                <h6 className=" mt-2 ">Owner Details</h6>
                                <div className="p-fluid formgrid grid card">
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">First name</label>
                                        <InputText
                                            placeholder="Eg. John"
                                            value={restaurantDetails.owner.firstname}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.firstname", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Last name</label>
                                        <InputText
                                            placeholder="Eg. Doe"
                                            value={restaurantDetails.owner.lastname}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.lastname", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Email</label>
                                        <InputText
                                            placeholder="Eg. john.doe@random.com"
                                            value={restaurantDetails.owner.email}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.email", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Phone</label>
                                        <InputText
                                            placeholder="Eg. +910123456789"
                                            value={restaurantDetails.owner.phone}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.phone", e.target.value);
                                                restaurantDetailsChangeHandler("owner_address.phone", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12">
                                        <label htmlFor="">Address</label>
                                        <InputTextarea
                                            placeholder="Eg. 301/MountView, Long Road"
                                            value={restaurantDetails.owner_address.addressline}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.addressline", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">City</label>
                                        <InputText
                                            placeholder="Eg. Mumbai"
                                            value={restaurantDetails.owner_address.city}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.city", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Pincode</label>
                                        <InputText
                                            placeholder="Eg. 400400"
                                            value={restaurantDetails.owner_address.pincode}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.pincode", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">State</label>
                                        <InputText
                                            placeholder="Eg. Maharastra"
                                            value={restaurantDetails.owner_address.state}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.state", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Country</label>
                                        <InputText
                                            placeholder="Eg. India"
                                            value={restaurantDetails.owner_address.country}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.country", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12">
                                        <label htmlFor="">Lankmark</label>
                                        <InputText
                                            placeholder="Eg. Victor circle"
                                            value={restaurantDetails.owner_address.landmark}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner_address.landmark", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12  md:col-6">
                                        <label htmlFor="">Password</label>
                                        <Password
                                            toggleMask
                                            value={restaurantDetails.owner.password}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.password", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12  md:col-6">
                                        <label htmlFor="">Confirm password</label>
                                        <Password
                                            toggleMask
                                            value={restaurantDetails.owner.c_password}
                                            onChange={(e) => {
                                                restaurantDetailsChangeHandler("owner.c_password", e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="formgrid grid">
                                    <div className="field col-6 md:col-3 lg:col-2">
                                        <Button className="w-full" label="Save" icon="pi pi-save" onClick={() => saveRestaurant()} disabled={saveloaders.restaurant} loading={saveloaders.restaurant} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    {/* Branch */}
                    <TabPanel header="Branch" leftIcon="pi pi-map-marker mr-2" disabled={!restaurantAndBranchDetails.restaurant_id}>
                        <h6 className="mt-2 ">Branch Details</h6>
                        {branchDetails.map((item, idx) => {
                            return (
                                <div className="p-fluid formgrid grid card">
                                    <div className="field col-12">
                                        <label htmlFor="">Branch Name</label>
                                        <InputText value={item.branch_name} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_name`, e.target.value)} placeholder="Eg. Sion" />
                                    </div>

                                    <div className="field col-12">
                                        <label htmlFor="">Address</label>
                                        <InputTextarea value={item.branch_address.addressline} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.addressline`, e.target.value)} placeholder="Eg. 301 Long Road" ea />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Phone (Primary)</label>
                                        <InputText value={item.branch_address.phone[0]} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.phone[0]`, e.target.value)} placeholder="Eg. +910123456789" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Phone (Secondary)</label>
                                        <InputText value={item.branch_address.phone[1]} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.phone[1]`, e.target.value)} placeholder="Eg. +910123456789" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">City</label>
                                        <InputText value={item.branch_address.city} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.city`, e.target.value)} placeholder="Eg. Mumbai" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Pincode</label>
                                        <InputText value={item.branch_address.pincode} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.pincode`, e.target.value)} placeholder="Eg. 400400" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">State</label>
                                        <InputText value={item.branch_address.state} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.state`, e.target.value)} placeholder="Eg. Maharastra" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Country</label>
                                        <InputText value={item.branch_address.country} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.country`, e.target.value)} placeholder="Eg. India" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Lankmark</label>
                                        <InputText value={item.branch_address.landmark} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.landmark`, e.target.value)} placeholder="Eg. Victor circle" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Google-map location</label>
                                        <InputText value={item.branch_address.google_location} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.google_location`, e.target.value)} placeholder="Eg. https://goo.gl/maps/xyz" />
                                    </div>
                                    <div className="field col-12">
                                        <label htmlFor="">Addional Info</label>
                                        <InputTextarea value={item.branch_address.otherDetails} onChange={(e) => branchDetailsChangeHandler(`[${idx}].branch_address.otherDetails`, e.target.value)} placeholder="Eg. Take left from Victor circle" ea />
                                    </div>

                                    <hr />
                                    <h6 className="opacity-70 mt-2 mb-2 ">Branch Manager Details</h6>
                                    <hr className="col-12 m-0 pb-3" />
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">First name</label>
                                        <InputText value={item.manager.firstname} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager.firstname`, e.target.value)} placeholder="Eg. John" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Last name</label>
                                        <InputText value={item.manager.lastname} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager.lastname`, e.target.value)} placeholder="Eg. Doe" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Email</label>
                                        <InputText value={item.manager.email} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager.email`, e.target.value)} placeholder="Eg. john.doe@random.com" />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Phone</label>
                                        <InputText
                                            value={item.manager.phone}
                                            onChange={(e) => {
                                                branchDetailsChangeHandler(`[${idx}].manager.phone`, e.target.value);
                                                branchDetailsChangeHandler(`[${idx}].manager_address.phone`, e.target.value);
                                            }}
                                            placeholder="Eg. +910123456789"
                                        />
                                    </div>
                                    <div className="field col-12">
                                        <label htmlFor="">Address</label>
                                        <InputTextarea value={item.manager_address.addressline} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.addressline`, e.target.value)} placeholder="Eg. 301/MountView, Long Road" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">City</label>
                                        <InputText value={item.manager_address.city} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.city`, e.target.value)} placeholder="Eg. Mumbai" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Pincode</label>
                                        <InputText value={item.manager_address.pincode} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.pincode`, e.target.value)} placeholder="Eg. 400400" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">State</label>
                                        <InputText value={item.manager_address.state} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.state`, e.target.value)} placeholder="Eg. Maharastra" />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label htmlFor="">Country</label>
                                        <InputText value={item.manager_address.country} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.country`, e.target.value)} placeholder="Eg. India" />
                                    </div>

                                    <div className="field col-12">
                                        <label htmlFor="">Lankmark</label>
                                        <InputText value={item.manager_address.landmark} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager_address.landmark`, e.target.value)} placeholder="Eg. Victor circle" />
                                    </div>
                                    <div
                                        className={classNames(
                                            "field",
                                            {
                                                "col-12  md:col-6": branchDetails.length <= 1,
                                            },
                                            {
                                                "col-10  md:col-5": branchDetails.length > 1,
                                            }
                                        )}
                                    >
                                        <label htmlFor="">Password</label>
                                        <Password toggleMask value={item.manager.password} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager.password`, e.target.value)} placeholder="Eg. Ss@1234" />
                                    </div>
                                    <div
                                        className={classNames(
                                            "field",
                                            {
                                                "col-12  md:col-6": branchDetails.length <= 1,
                                            },
                                            {
                                                "col-10  md:col-5": branchDetails.length > 1,
                                            }
                                        )}
                                    >
                                        <label htmlFor="">Confirm password</label>
                                        <Password toggleMask value={item.manager.c_password} onChange={(e) => branchDetailsChangeHandler(`[${idx}].manager.c_password`, e.target.value)} placeholder="Eg. Ss@1234" />
                                    </div>
                                    {branchDetails.length > 1 && (
                                        <div className="field col-2  flex">
                                            <Button icon="pi pi-trash" onClick={() => deleteBranch(idx)} className="p-button-danger" label="Delete" />
                                        </div>
                                    )}
                                </div>
                            );
                        })}

                        <div className="formgrid grid">
                            <div className="field col-6 md:col-3 lg:col-2">
                                <Button label="Add branch" onClick={() => addBranch()} className="w-full p-button-help" icon="pi pi-plus" />
                            </div>
                            <div className="field col-6 md:col-3 lg:col-2">
                                <Button label="Save" className="w-full" icon="pi pi-save" onClick={() => saveBranch()} disabled={saveloaders.branch} loading={saveloaders.branch} />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel header="Staff" leftIcon="pi pi-users mr-2" disabled={restaurantAndBranchDetails.branches.length === 0}>
                        <div className="">
                            <h6 className="mt-2 ">Staff Member Details</h6>
                            {staffDetails.map((item, idx) => {
                                return (
                                    <div className="p-fluid formgrid grid card">
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Branch</label>
                                            <Dropdown
                                                options={restaurantAndBranchDetails.branches}
                                                value={item.branch}
                                                onChange={(e) => {
                                                    staffDetailsChangeHandler(`[${idx}].branch`, e.value);
                                                    staffDetailsChangeHandler(`[${idx}].branch_id`, e.value._id);
                                                }}
                                                optionLabel="branch_name"
                                                placeholder="Select Branch"
                                            />
                                        </div>
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Position</label>
                                            <InputText
                                                value={item.member_details.position}
                                                onChange={(e) => {
                                                    staffDetailsChangeHandler(`[${idx}].member_details.position`, e.target.value);
                                                }}
                                            />
                                        </div>
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">First name</label>
                                            <InputText value={item.member_details.firstname} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_details.firstname`, e.target.value)} placeholder="Eg. John" />
                                        </div>
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Last name</label>
                                            <InputText value={item.member_details.lastname} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_details.lastname`, e.target.value)} placeholder="Eg. Doe" />
                                        </div>
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Email</label>
                                            <InputText value={item.member_details.email} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_details.email`, e.target.value)} placeholder="Eg. john.doe@random.com" />
                                        </div>
                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Phone</label>
                                            <InputText
                                                value={item.member_details.phone}
                                                onChange={(e) => {
                                                    staffDetailsChangeHandler(`[${idx}].member_details.phone`, e.target.value);
                                                    staffDetailsChangeHandler(`[${idx}].member_address.phone`, e.target.value);
                                                }}
                                                placeholder="Eg. +910123456789"
                                            />
                                        </div>
                                        <div className="field col-12">
                                            <label htmlFor="">Address</label>
                                            <InputTextarea value={item.member_address.addressline} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.addressline`, e.target.value)} placeholder="Eg. 301 Long Road" />
                                        </div>

                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">City</label>
                                            <InputText value={item.member_address.city} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.city`, e.target.value)} placeholder="Eg. Mumbai" />
                                        </div>

                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Pincode</label>
                                            <InputText value={item.member_address.pincode} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.pincode`, e.target.value)} placeholder="Eg. 400400" />
                                        </div>

                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">State</label>
                                            <InputText value={item.member_address.state} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.state`, e.target.value)} placeholder="Eg. Maharastra" />
                                        </div>

                                        <div className="field col-12 md:col-6">
                                            <label htmlFor="">Country</label>
                                            <InputText value={item.member_address.country} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.country`, e.target.value)} placeholder="Eg. India" />
                                        </div>

                                        <div className="field col-12">
                                            <label htmlFor="">Landmark</label>
                                            <InputText value={item.member_address.landmark} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_address.landmark`, e.target.value)} placeholder="Eg. Victor circle" />
                                        </div>
                                        <div
                                            className={classNames(
                                                "field",
                                                {
                                                    "col-12  md:col-6": staffDetails.length <= 1,
                                                },
                                                {
                                                    "col-10  md:col-5": staffDetails.length > 1,
                                                }
                                            )}
                                        >
                                            <label htmlFor="">Password</label>
                                            <InputText value={item.member_details.password} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_details.password`, e.target.value)} placeholder="Eg. Ss@1234" />
                                        </div>
                                        <div
                                            className={classNames(
                                                "field",
                                                {
                                                    "col-12  md:col-6": staffDetails.length <= 1,
                                                },
                                                {
                                                    "col-10  md:col-5": staffDetails.length > 1,
                                                }
                                            )}
                                        >
                                            <label htmlFor="">Confirm password</label>
                                            <InputText value={item.member_details.c_password} onChange={(e) => staffDetailsChangeHandler(`[${idx}].member_details.c_password`, e.target.value)} placeholder="Eg. Ss@1234" />
                                        </div>
                                        {staffDetails.length > 1 && (
                                            <div className="field col-2 flex">
                                                <Button icon="pi pi-trash" onClick={() => deleteStaff(idx)} className="p-button-danger" label="Delete" />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="grid formgrid">
                                <div className="field col-6 md:col-3 lg:col-2">
                                    <Button label="Add member" className="w-full p-button-help" icon="pi pi-plus" onClick={() => addStaff()} />
                                </div>
                                <div className="field col-6 md:col-3 lg:col-2">
                                    <Button label="Save" className="w-full" icon="pi pi-save" onClick={() => saveStaff()} disabled={saveloaders.staff} loading={saveloaders.staff} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </TabView>
            </div>
        </div>
    );
};
