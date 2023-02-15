import React, { useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useState } from "react";
import set from "lodash/set";
import { registerRetaurantApi } from "../api";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { userEmailAtom } from "../recoil/atoms/userAtom";
import { useSetRecoilState } from "recoil";
import delay from "../utils/delay";
export const RegisterPage = () => {
    const history = useHistory();
    const setUserEmail = useSetRecoilState(userEmailAtom);
    const toast = useRef(null);
    const empty_newRecord = {
        restaurant_name: "",
        restaurant_address: {
            addressline: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
        },
        owner_address: {
            addressline: "",
            pincode: "",
            city: "",
            state: "",
            country: "",
        },
        owner: {
            email: "",
            phone: "",
            firstname: "",
            lastname: "",
            password: "",
            c_password: "",
        },
    };
    const [newRecord, setNewRecord] = useState(empty_newRecord);
    const [loading, setLoading] = useState(false);

    const newRecordChangeHandler = (path, value) => {
        setNewRecord((ps) => ({ ...set(ps, path, value) }));
    };
    const saveRestaurant = async () => {
        setLoading(true);
        const res = await registerRetaurantApi(newRecord);
        if (res) {
            setLoading(false);
            if (res.status === 201) {
                setUserEmail(newRecord.owner.email);
                setNewRecord(empty_newRecord);
                history.push("/login");
            }
        }
    };

    useEffect(() => {
        document.title = "Register";
    }, []);
    return (
        <div className="">
            <Toast ref={toast} />
            <div className="min-h-screen p-3 md:p-4">
                <div className="card h-full card-container w-12 xl:w-10 mx-auto">
                    <h3>Register</h3>

                    <div className="grid">
                        <div className="col-12 lg:col-6">
                            <div className="card h-full">
                                <div className="p-fluid formgrid grid">
                                    <h6 className="col-12 mb-0">Owner Details</h6>
                                    <hr className="col-12" />
                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">First name</label>
                                        <InputText
                                            placeholder="Enter your firstname"
                                            value={newRecord.owner.firstname}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.firstname", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Last name</label>
                                        <InputText
                                            placeholder="Enter your lastname"
                                            value={newRecord.owner.lastname}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.lastname", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Email</label>
                                        <InputText
                                            placeholder="Enter your email"
                                            value={newRecord.owner.email}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.email", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Phone</label>
                                        <InputText
                                            placeholder="Enter your phone number"
                                            value={newRecord.owner.phone}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.phone", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12">
                                        <label aria-label="">Address</label>
                                        <InputTextarea
                                            placeholder="Enter your address"
                                            value={newRecord.owner_address.addressline}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner_address.addressline", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">City</label>
                                        <InputText
                                            placeholder="Enter your city"
                                            value={newRecord.owner_address.city}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner_address.city", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Pincode</label>
                                        <InputText
                                            placeholder="Enter your pincode"
                                            value={newRecord.owner_address.pincode}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner_address.pincode", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">State</label>
                                        <InputText
                                            placeholder="Enter your state"
                                            value={newRecord.owner_address.state}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner_address.state", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Country</label>
                                        <InputText
                                            placeholder="Enter your country"
                                            value={newRecord.owner_address.country}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner_address.country", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12  md:col-6">
                                        <label aria-label="">Password</label>
                                        <Password
                                            placeholder="Enter your password"
                                            toggleMask
                                            value={newRecord.owner.password}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.password", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12  md:col-6">
                                        <label aria-label="">Confirm password</label>
                                        <Password
                                            placeholder="Confirm your password"
                                            toggleMask
                                            value={newRecord.owner.c_password}
                                            onChange={(e) => {
                                                newRecordChangeHandler("owner.c_password", e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 lg:col-6">
                            <div className="card h-full">
                                <div className="p-fluid formgrid grid">
                                    <h6 className="col-12 mb-0">Restaurant Details</h6>
                                    <hr className="col-12" />

                                    <div className="field col-12">
                                        <label aria-label="Restaurant Name">Restaurant Name</label>
                                        <InputText
                                            placeholder="Enter restaurant name"
                                            value={newRecord.restaurant_name}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_name", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12">
                                        <label aria-label="">Address</label>
                                        <InputTextarea
                                            placeholder="Enter restaurant address"
                                            value={newRecord.restaurant_address.addressline}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_address.addressline", e.target.value);
                                            }}
                                        />
                                    </div>
                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">City</label>
                                        <InputText
                                            placeholder="Enter restaurant city"
                                            value={newRecord.restaurant_address.city}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_address.city", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Pincode</label>
                                        <InputText
                                            placeholder="Enter restaurant pincode"
                                            value={newRecord.restaurant_address.pincode}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_address.pincode", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">State</label>
                                        <InputText
                                            placeholder="Enter restaurant state"
                                            value={newRecord.restaurant_address.state}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_address.state", e.target.value);
                                            }}
                                        />
                                    </div>

                                    <div className="field col-12 md:col-6">
                                        <label aria-label="">Country</label>
                                        <InputText
                                            placeholder="Enter restaurant country"
                                            value={newRecord.restaurant_address.country}
                                            onChange={(e) => {
                                                newRecordChangeHandler("restaurant_address.country", e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="grid">
                                <div className="col-6 md:col-3 lg:col-2">
                                    <Button className="w-full" label="Register" icon="pi pi-user-plus" p onClick={() => saveRestaurant()} disabled={loading} loading={loading} />
                                </div>
                                <div className="text-center flex align-items-center">
                                    <span className="text-600 font-medium line-height-3">Already have an account?</span>
                                    <Link to={"/login"} className="font-medium no-underline ml-2 text-blue-500 cursor-pointer">
                                        Login
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
