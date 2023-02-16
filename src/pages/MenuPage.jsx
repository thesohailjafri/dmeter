import React, { useCallback, useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { InputTextarea } from "primereact/inputtextarea";

import { Button } from "primereact/button";
import classNames from "classnames";
import { Toast } from "primereact/toast";
import { Chips } from "primereact/chips";
import { useRef } from "react";
import { AddImage } from "../components/AddImage";
import { set } from "lodash";
import { useParams } from "react-router-dom";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { useRecoilValue } from "recoil";
import { Column, DataTable, Dropdown, RadioButton, SelectButton, Tag } from "primereact";
import { menuDietOptionsAtom, menuDiscountOptionsAtom, menuQuantityOptionsAtom } from "../recoil/atoms/menuAtom";
import { deleteMenuitem, getMenu, getMenuCategories, registerMenuitemApi } from "../api";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { MenuDatatable } from "../components/datatables/MenuDatatable";

export const MenuPage = () => {
    const params = useParams();
    const branches = useRecoilValue(branchesAtom);
    const [records, setRecords] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);
    const [branch, setBranch] = useState({});
    const [branchId, setBranchId] = useState("");
    const [newLoader, setNewLoader] = useState(false);

    const [errors, setErrors] = useState([]);
    const discountOptions = useRecoilValue(menuDiscountOptionsAtom);
    const dietOptions = useRecoilValue(menuDietOptionsAtom);
    const menuQuantityOptions = useRecoilValue(menuQuantityOptionsAtom);
    const emptyImage = { url: "", file: null };
    const [images, setImages] = useState([emptyImage]);
    const [thumbnail, setThumbnail] = useState(emptyImage);
    const price = {
        quantity: "",
        amount: 0,
        discountType: discountOptions[0],
        discountAmount: 0,
        discountMaxAmount: 0,
        discountMinAmount: 0,
    };
    const empty_newRecord = {
        name: "",
        description: "",
        category_id: "",
        alternateNames: [],
        ingredients: [],
        allergens: [],
        prices: [price],
        diet: dietOptions[0],
    };
    const [newRecord, setNewRecord] = useState(empty_newRecord);
    const [menuCategories, setMenuCategories] = useState([]);
    const menuChangeHandler = (path, value) => {
        setNewRecord((ps) => ({ ...set(ps, path, value) }));
    };
    const validate = () => {
        let _errors = [];
        if (!newRecord.name) {
            _errors.push("Name is required");
        }

        if (!thumbnail.file) {
            _errors.push("Thumbnail is required");
        }

        newRecord.prices.forEach((item) => {
            if (!item.quantity) {
                _errors.push("Quantity name is required");
            }
        });

        setErrors(_errors);
        return _errors.length === 0 ? true : false;
    };
    const clearNewRecord = () => {
        setNewLoader(false);
        setNewRecord(empty_newRecord);
        setThumbnail(emptyImage);
        setImages([emptyImage]);
    };
    const saveNewRecord = async () => {
        setNewLoader(true);
        const result = validate();
        if (!result) {
            return setNewLoader(false);
        }
        const formdata = new FormData();
        formdata.append("menuitem", JSON.stringify(newRecord));
        formdata.append("branchId", branchId);
        formdata.append("thumbnail", thumbnail.file);
        images.forEach((item) => {
            formdata.append("images", item.file);
        });
        const res = await registerMenuitemApi(formdata);
        if (res) {
            setNewLoader(false);
            if (res.status === 201) {
                setRecords((ps) => [res.data.record, ...ps]);
                clearNewRecord();
            }
        }
    };

    const handleClearThumbnail = () => {
        setThumbnail(emptyImage);
    };
    const handleThumbnailSelect = (e) => {
        console.log(e.target.files[0]);
        setThumbnail({
            file: e.target.files[0],
            url: URL.createObjectURL(new Blob(e.target.files), {
                type: e.target.files[0].type,
            }),
        });
    };
    const handleAddPrice = () => {
        const ps = { ...newRecord };
        ps.prices = [...ps.prices, price];
        setNewRecord(ps);
    };
    const handleRemovePrice = (index) => {
        const ps = { ...newRecord };
        ps.prices = ps.prices.filter((_, i) => i !== index);
        setNewRecord(ps);
    };
    const handleRemoveImage = (i) => {
        setImages((ps) => ps.filter((_, idx) => i !== idx));
    };
    const handleImageSelect = (e, i) => {
        const val = {
            file: e.target.files[0],
            url: URL.createObjectURL(new Blob(e.target.files), {
                type: e.target.files[0].type,
            }),
        };
        setImages((ps) =>
            ps.map((item, idx) => {
                if (idx === i) {
                    return val;
                }
                return item;
            })
        );
    };
    const handleAddImage = () => {
        setImages((ps) => ps.concat(emptyImage));
    };

    const newRecordChangeHandler = (path, value) => {
        setNewRecord((ps) => ({ ...set(ps, path, value) }));
    };

    useEffect(() => {
        const id = params?.branch_id;
        setBranchId(id);
        const re = branches.find((item) => item._id === id);
        setBranch(re);
    }, [params?.branch_id, branches]);

    useEffect(() => {
        document.title = branch?.branch_name + " Branch Menu";
    }, [branch]);

    const fetchMenu = useCallback(async () => {
        if (!restaurantId || !branchId) return;
        const res = await getMenu({
            restaurant_id: restaurantId,
            branch_id: branchId,
            fields: "diet name thumbnail prices alternateNames ingredients allergens",
        });
        if (res) {
            if (res.status === 200) {
                setRecords(res.data.records);
            }
        }
    }, [restaurantId, branchId]);

    const fetchMenuCategories = useCallback(async () => {
        if (!restaurantId || !branchId) return;
        const res = await getMenuCategories({
            restaurant_id: restaurantId,
            branch_id: branchId,
            fields: "name",
        });
        if (res) {
            if (res.status === 200) {
                setMenuCategories(res.data.records);
            }
        }
    }, [restaurantId, branchId]);

    useEffect(() => {
        fetchMenu();
        fetchMenuCategories();
    }, [fetchMenu, fetchMenuCategories]);

    return (
        <div className="">
            <ConfirmPopup />
            <div className="card">
                <h3>{branch?.branch_name} Branch Menu</h3>
                <TabView className="">
                    <TabPanel header="Existing Records" leftIcon="pi pi-th-large mr-2">
                        <MenuDatatable records={records} setRecords={setRecords} />
                    </TabPanel>
                    <TabPanel header="Add Record" leftIcon="pi pi-plus-circle mr-2">
                        <div className="mb-4">
                            <div className="formgrid grid">
                                <div className="col-12 xl:col-6">
                                    <div className="card">
                                        <h6 className="text-center">Menu Item Details</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid grid formgrid">
                                            <div className="field col-12">
                                                <label htmlFor="">Item Name</label>
                                                <InputText disabled={newLoader} value={newRecord.name} onChange={(e) => newRecordChangeHandler(`name`, e.target.value)} className={classNames({ "p-invalid block": !newRecord.name && errors.length >= 1 })} placeholder="Enter Item Name" />
                                                {errors.length >= 1 && !newRecord.name && <small className="p-error block">Please enter item name</small>}
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Description (optional)</label>
                                                <InputTextarea rows={5} disabled={newLoader} value={newRecord.description} onChange={(e) => newRecordChangeHandler(`description`, e.target.value)} placeholder="Enter Description" />
                                            </div>
                                            <div className="field col-12 xl:col-6">
                                                <label htmlFor="">Category</label>
                                                <Dropdown disabled={newLoader} value={newRecord.category_id} options={menuCategories} optionLabel="name" optionValue="_id" onChange={(e) => newRecordChangeHandler("category_id", e.value)} placeholder="Select Category" />
                                            </div>
                                            <div className="field col-12 xl:col-6">
                                                <label htmlFor="">Alternate Names (optional)</label>
                                                <Chips tooltip="Press enter to save value" disabled={newLoader} value={newRecord.alternateNames} onChange={(e) => newRecordChangeHandler("alternateNames", e.value)} placeholder="Enter Alternate Names"></Chips>
                                            </div>
                                            <div className="field col-12 xl:col-6">
                                                <label htmlFor="">Ingredients (optional)</label>
                                                <Chips tooltip="Press enter to save value" disabled={newLoader} value={newRecord.ingredients} onChange={(e) => newRecordChangeHandler("ingredients", e.value)} placeholder="Enter Ingredients"></Chips>
                                            </div>
                                            <div className="field col-12 xl:col-6">
                                                <label htmlFor="">Allergens (optional)</label>
                                                <Chips tooltip="Press enter to save value" disabled={newLoader} value={newRecord.allergens} onChange={(e) => newRecordChangeHandler("allergens", e.value)} placeholder="Enter Allergens"></Chips>
                                            </div>
                                            <div className="field col-12 mb-0">
                                                <label htmlFor="">Diet</label>
                                                <div className="ml-2 md:flex flex-wrap column-gap-3">
                                                    {dietOptions.map((item) => {
                                                        return (
                                                            <div className="field-radiobutton">
                                                                <RadioButton
                                                                    name="diet"
                                                                    disabled={newLoader}
                                                                    value={item}
                                                                    checked={newRecord.diet === item}
                                                                    onChange={(e) => {
                                                                        newRecordChangeHandler("diet", e.value);
                                                                    }}
                                                                />
                                                                <label htmlFor="">{item}</label>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <h6 className="text-center">Pricing</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid grid formgrid">
                                            {newRecord.prices.map((item, idx) => (
                                                <>
                                                    <div className="field col-12 md:col-6">
                                                        <label htmlFor="">Quantity</label>
                                                        <Dropdown editable options={menuQuantityOptions} disabled={newLoader} value={item.quantity} onChange={(e) => menuChangeHandler(`prices[${idx}].quantity`, e.value)} placeholder="Enter/Select Quantity" />
                                                        {errors.length >= 1 && !item.quantity && <small className="p-error block">Please enter quantity</small>}
                                                    </div>
                                                    <div className="field col-12 md:col-6">
                                                        <label htmlFor="">Amount</label>
                                                        <InputNumber min={0} mode="currency" currency="INR" disabled={newLoader} value={item.amount} onChange={(e) => menuChangeHandler(`prices[${idx}].amount`, e.value)} placeholder="Enter amount" />
                                                    </div>
                                                    <div className="field col-12 md:col-6">
                                                        <label htmlFor="">Discount Type</label>
                                                        <SelectButton unselectable={false} options={discountOptions} disabled={newLoader} value={item.discountType} onChange={(e) => menuChangeHandler(`prices[${idx}].discountType`, e.value)} />
                                                    </div>
                                                    <div className="field col-12 md:col-6">
                                                        <label htmlFor="">Discount Value</label>
                                                        <InputNumber
                                                            min={0}
                                                            disabled={newLoader}
                                                            value={item.discountAmount}
                                                            suffix={item.discountType === "Percent" ? "%" : null}
                                                            prefix={item.discountType === "Amount" ? "₹" : null}
                                                            onChange={(e) => menuChangeHandler(`prices[${idx}].discountAmount`, e.value)}
                                                            placeholder="Enter Value"
                                                        />
                                                    </div>
                                                    <div className={classNames("field", { "col-12 md:col-6": newRecord.prices.length <= 1 }, { "col-9 md:col-4": newRecord.prices.length > 1 })}>
                                                        <label htmlFor="">Minimum Amount</label>
                                                        <InputNumber
                                                            tooltip="Minimum amount on which discount will be applicable"
                                                            min={0}
                                                            mode="currency"
                                                            currency="INR"
                                                            disabled={newLoader}
                                                            value={item.discountMinAmount}
                                                            onChange={(e) => menuChangeHandler(`prices[${idx}].discountMinAmount`, e.value)}
                                                            placeholder="Enter Minimum Amount"
                                                        />
                                                    </div>
                                                    <div className="field col-12 md:col-6">
                                                        <label htmlFor="">Maximum Discount</label>
                                                        <InputNumber
                                                            tooltip="Maximum discount that will be given"
                                                            min={0}
                                                            mode="currency"
                                                            currency="INR"
                                                            disabled={newLoader}
                                                            value={item.discountMaxAmount}
                                                            onChange={(e) => menuChangeHandler(`prices[${idx}].discountMaxAmount`, e.value)}
                                                            placeholder="Enter Maximum Discount"
                                                        />
                                                    </div>
                                                    {newRecord.prices.length > 1 && (
                                                        <div className="field col-3 md:col-2">
                                                            <Button className="h-full w-full p-button-danger" icon="pi pi-minus" tooltip="Remove Price" onClick={() => handleRemovePrice(idx)} />
                                                        </div>
                                                    )}
                                                    <hr className="col-12" />
                                                </>
                                            ))}
                                            <div className="field col-12">
                                                <Button disabled={newLoader} label="Add Price" className="p-button-secondary" icon="pi pi-plus" onClick={handleAddPrice} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12 xl:col-6">
                                    <div className="card">
                                        <h6 className="text-center">Images</h6>
                                        <hr />
                                        <div className="p-fluid grid formgrid">
                                            <div className="field col-12 mb-4">
                                                <label htmlFor="">Select Thumbnail</label>
                                                <AddImage disabled={newLoader} isClear={true} image={thumbnail} handleClearImage={handleClearThumbnail} className={classNames({ "p-invalid block": !thumbnail.url && errors.length >= 1 })} handleImageSelect={handleThumbnailSelect} />

                                                {errors.length >= 1 && !thumbnail.url && <small className="p-error block">Please select a thumbnail.</small>}
                                            </div>
                                            <div className="field col-12 h-full">
                                                <label htmlFor="">Dish Images (optional)</label>
                                                {images.map((image, idx) => {
                                                    return (
                                                        <div className="field">
                                                            <AddImage disabled={newLoader} isRemove={true} image={image} handleRemoveImage={() => handleRemoveImage(idx)} handleImageSelect={(e) => handleImageSelect(e, idx)} />
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <Button disabled={newLoader} label="Add Image" icon="pi pi-plus" onClick={() => handleAddImage()} className="p-button-secondary w-full"></Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="formgrid grid">
                                <div className="field col-12 md:col-6 xl:col-3">
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
                                <div className="field col-12 md:col-6 xl:col-3">
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
