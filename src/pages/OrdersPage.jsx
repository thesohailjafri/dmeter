import classNames from "classnames";
import { set } from "lodash";
import { Button, Dropdown, InputText, InputTextarea, TabPanel, TabView, Toast, DataTable, Column, RadioButton, Checkbox } from "primereact";
import { InputNumber } from "primereact/inputnumber";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { getMenu, getOrders, postOrderManual } from "../api";
import { OrdersDatatable } from "../components/datatables/OrdersDatatable";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { orderPaymentModeOptionsAtom, orderSourceOptionsAtom, orderTypeOptionsAtom } from "../recoil/atoms/orderAtom";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";

export const OrdersPage = () => {
    const orderTypeOptions = useRecoilValue(orderTypeOptionsAtom);
    const orderSourceOptions = useRecoilValue(orderSourceOptionsAtom);
    const orderPaymentModeOptions = useRecoilValue(orderPaymentModeOptionsAtom);

    const restaurantId = useRecoilValue(userRestaurantIdAtom);
    const [newRecordSubTotal, setNewRecordSub] = useState(0);
    const [newRecordDisocunt, setNewRecordDiscount] = useState(0);
    const [newRecordGrandTotal, setNewRecordGrandTotal] = useState(0);

    const toast = useRef(null);
    const params = useParams();
    const [branch, setBranch] = useState({});
    const [branch_id, setBranchId] = useState("");

    const branches = useRecoilValue(branchesAtom);

    const [records, setRecords] = useState([]);
    const [menu, setMenu] = useState([]);

    const [newLoader, setNewLoader] = useState(false);
    const empty_newProduct = {
        product_id: "",
        product_name: "",
        temp_product_name: "",

        product_category: "",
        quantity: "",
        quantity_count: 1,

        temp_quantity: "",

        amount: 0,
        discount: 0,
        quantity_options: [],
    };

    const empty_newRecord = {
        order_address: "",
        order_city: "",
        order_state: "",
        order_country: "",
        order_type: orderTypeOptions[0],
        order_source: orderSourceOptions[0],
        order_note: "",
        order_delivery_charges: 0,
        customer_name: "",
        customer_phone: "",
        send_notifications: false,
        order_payment_source: orderPaymentModeOptions[0],
    };
    const [newRecord, setNewRecord] = useState(empty_newRecord);
    const [newRecordOrderProducts, setNewRecordOrderProducts] = useState([{ ...empty_newProduct }]);
    const addOrderProducts = () => {
        setNewRecordOrderProducts((ps) => [...ps, { ...empty_newProduct }]);
    };
    const removeOrderProducts = (idx) => {
        setNewRecordOrderProducts((ps) => [...ps].filter((_, i) => i !== idx));
    };
    const [errors, setErrors] = useState([]);
    const newRecordChangeHandler = (path, value) => {
        setNewRecord((ps) => set({ ...ps }, path, value));
    };
    const newRecordOrderProductsChangeHandler = (idx, path, value) => {
        const prevVal = [...newRecordOrderProducts];
        prevVal[idx][path] = value;
        setNewRecordOrderProducts(prevVal);
    };

    const validate = () => {
        let _errors = [];
        if (!newRecord.customer_name) {
            _errors.push("customer_name is required");
        }
        if (!newRecord.customer_phone) {
            _errors.push("customer_phone is required");
        }
        if (!newRecord.order_source) {
            _errors.push("order_source is required");
        }
        if (!newRecord.order_type) {
            _errors.push("order_type is required");
        }
        const op_status = [...newRecordOrderProducts].every((i1) => {
            const p = {
                product_id: i1.product_id,
                product_name: i1.product_name,
                product_category: i1.product_category,
                quantity: i1.quantity,
                amount: i1.amount,
            };
            console.log({ p });
            return Object.values(p).every((i2) => i2);
        });
        if (!op_status) {
            _errors.push("order item are invalid");
        }
        console.log({ _errors });
        setErrors(_errors);

        return _errors.length === 0 ? true : false;
    };
    const clearNewRecord = () => {
        setNewLoader(false);
        setNewRecord(empty_newRecord);
        setNewRecordOrderProducts([empty_newProduct]);
    };
    const saveNewRecord = async () => {
        console.log("hello");
        setNewLoader(true);
        const result = validate();
        if (!result) {
            return setNewLoader(false);
        }
        console.log({ result });
        const order_products = [...newRecordOrderProducts].map((i) => {
            const p = {
                product_id: i.product_id,
                product_name: i.product_name,
                product_category: i.product_category,
                quantity: i.quantity,
                amount: i.amount,
                discount: i.discount,
                quantity_count: i.quantity_count,
            };
            return p;
        });
        const payload = { ...newRecord, branch_id, order_products, grand_total: newRecordGrandTotal, sub_total: newRecordSubTotal };
        console.log({ payload });
        const res = await postOrderManual(payload);
        if (res) {
            setNewLoader(false);
            if (res.status === 201) {
                setRecords((ps) => [res.data.record, ...ps]);
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

    const fetchMenu = useCallback(async () => {
        if (!restaurantId || !branch_id) return;
        const res = await getMenu({
            restaurant_id: restaurantId,
            branch_id: branch_id,
            fields: "name prices",
        });
        if (res) {
            if (res.status === 200) {
                setMenu(res.data.records);
            }
        }
    }, [restaurantId, branch_id]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    const fetchRecords = useCallback(async () => {
        if (!restaurantId || !branch_id) return;
        const res = await getOrders({
            restaurant_id: restaurantId,
            branch_id: branch_id,
            fields: `customer_name customer_phone 
						order_type order_source order_note 
						order_payment_source grand_total 
						order_status order_products order_delivery_charges`,
        });
        if (res) {
            if (res.status === 200) {
                setRecords(res.data.records);
            }
        }
    }, [restaurantId, branch_id]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    useEffect(() => {
        document.title = branch?.branch_name + " Orders";
    }, [branch]);

    // calculate subtotal and discount
    useEffect(() => {
        const av = newRecordOrderProducts.reduce((a, b) => ({
            discount: a.discount + b.discount,
            amount: a.amount + b.amount,
        }));
        const gt = av.amount - av.discount + newRecord.order_delivery_charges;
        setNewRecordDiscount(av.discount);
        setNewRecordSub(av.amount);
        setNewRecordGrandTotal(gt);
    }, [newRecordOrderProducts, newRecord.order_delivery_charges]);

    // calculate grand-total

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <h3>{branch?.branch_name} Branch Orders</h3>
                <TabView className="">
                    <TabPanel header="Existing Records" leftIcon="pi pi-th-large mr-2">
                        <OrdersDatatable records={records} setRecords={setRecords} allRecords={false} fetchRecords={fetchRecords} />
                    </TabPanel>
                    <TabPanel header="Add Record" leftIcon="pi pi-plus-circle mr-2">
                        <div className="mb-4">
                            <div className="formgrid grid">
                                <div className="col-12 xl:col-9">
                                    <div className="card">
                                        <h6 className="text-center">Order Details</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid grid formgrid">
                                            <div className="field col-2">
                                                <label htmlFor="">Menu-Item</label>
                                            </div>
                                            <div className="field col-2">
                                                <label htmlFor="">Quantity</label>
                                            </div>
                                            <div className="field col-2">
                                                <label htmlFor="">Count</label>
                                            </div>
                                            <div className="field col-2">
                                                <label htmlFor="">Discount</label>
                                            </div>
                                            <div className="field col-2">
                                                <label htmlFor="">Amount</label>
                                            </div>
                                            <div className="field col-2">
                                                <label htmlFor="">Action</label>
                                            </div>
                                            {newRecordOrderProducts.map((order_prod, idx) => {
                                                return (
                                                    <>
                                                        <div className="field col-2">
                                                            <Dropdown
                                                                tooltip={order_prod.product_name}
                                                                options={menu}
                                                                optionLabel="name"
                                                                disabled={newLoader}
                                                                value={order_prod.temp_product_name}
                                                                onChange={(e) => {
                                                                    const val = e.value;
                                                                    newRecordOrderProductsChangeHandler(idx, `temp_product_name`, val);
                                                                    newRecordOrderProductsChangeHandler(idx, `quantity_options`, val.prices);
                                                                    newRecordOrderProductsChangeHandler(idx, `product_name`, val.name);
                                                                    newRecordOrderProductsChangeHandler(idx, `product_category`, val.category_id.name);
                                                                    newRecordOrderProductsChangeHandler(idx, `product_id`, val._id);
                                                                }}
                                                                className={classNames({ "p-invalid": !order_prod.product_name && errors.length >= 1 })}
                                                                placeholder="Item Name"
                                                            />
                                                            {errors.length >= 1 && !order_prod.product_name && <small className="p-error block">Please select menu item</small>}
                                                        </div>
                                                        <div className="field col-2">
                                                            <Dropdown
                                                                options={order_prod.quantity_options}
                                                                disabled={newLoader}
                                                                optionLabel="quantity"
                                                                value={order_prod.temp_quantity}
                                                                onChange={(e) => {
                                                                    const val = e.value;
                                                                    newRecordOrderProductsChangeHandler(idx, `temp_quantity`, val);
                                                                    newRecordOrderProductsChangeHandler(idx, `quantity`, val.quantity);
                                                                    newRecordOrderProductsChangeHandler(idx, `amount`, val.amount * order_prod.quantity_count);
                                                                }}
                                                                className={classNames({ "p-invalid": !order_prod.quantity && errors.length >= 1 })}
                                                                placeholder="Quantity"
                                                            />
                                                            {errors.length >= 1 && !order_prod.quantity && <small className="p-error block">Please select item quantity</small>}
                                                        </div>
                                                        <div className="field col-2">
                                                            <InputNumber
                                                                disabled={newLoader}
                                                                min={1}
                                                                value={order_prod.quantity_count}
                                                                onChange={(e) => {
                                                                    newRecordOrderProductsChangeHandler(idx, `quantity_count`, e.value);
                                                                    newRecordOrderProductsChangeHandler(idx, `amount`, order_prod.temp_quantity.amount * e.value);
                                                                }}
                                                                placeholder="Count"
                                                            />
                                                        </div>
                                                        <div className="field col-2">
                                                            <InputNumber mode="currency" currency="INR" disabled={newLoader} value={order_prod.discount} onChange={(e) => newRecordOrderProductsChangeHandler(idx, `discount`, e.value)} placeholder="Discount" />
                                                        </div>
                                                        <div className="field col-2">
                                                            <InputNumber mode="currency" currency="INR" disabled value={order_prod.amount} placeholder="Select Item" />
                                                        </div>

                                                        <div className="field col-1">
                                                            <div className="flex gap-3">
                                                                <div>
                                                                    <Button icon="pi pi-plus" onClick={() => addOrderProducts()} />
                                                                </div>
                                                                <div>
                                                                    <Button disabled={newRecordOrderProducts.length <= 1} icon="pi pi-minus" className="p-button-secondary" onClick={() => removeOrderProducts(idx)} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                            <div className="field col-12">
                                                <DataTable
                                                    value={[
                                                        {
                                                            sub: newRecordSubTotal,
                                                            discount: newRecordDisocunt,
                                                            delivery: newRecord.order_delivery_charges,
                                                            total: newRecordGrandTotal,
                                                        },
                                                    ]}
                                                >
                                                    <Column header="Sub-Total" field="sub" body={(rd) => <InputNumber disabled value={rd.sub} mode="currency" currency="INR" />} />
                                                    <Column header="Discount" field="discount" body={(rd) => <InputNumber disabled value={rd.discount} mode="currency" currency="INR" />} />
                                                    <Column header="Delivery Charge" field="delivery" body={(rd) => <InputNumber value={rd.delivery} onChange={(e) => newRecordChangeHandler("order_delivery_charges", e.value)} mode="currency" currency="INR" />} />
                                                    <Column header="Grand-Total" field="total" body={(rd) => <InputNumber disabled value={rd.total} mode="currency" currency="INR" />} />
                                                </DataTable>
                                            </div>
                                            <div className="field col-4 xl:col-3">
                                                <label htmlFor="">Order Type</label>
                                                {orderTypeOptions.map((op) => {
                                                    return (
                                                        <div key={op} className="field-radiobutton">
                                                            <RadioButton inputId={op} name="order_type" value={newRecord.order_type} onChange={(e) => newRecordChangeHandler("order_type", op)} checked={newRecord.order_type === op} />
                                                            <label htmlFor={op}>{op}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="field col-4 xl:col-3">
                                                <label htmlFor="">Order Source</label>
                                                {orderSourceOptions.map((op) => {
                                                    return (
                                                        <div key={op} className="field-radiobutton">
                                                            <RadioButton inputId={op} name="order_source" value={newRecord.order_source} onChange={(e) => newRecordChangeHandler("order_source", op)} checked={newRecord.order_source === op} />
                                                            <label htmlFor={op}>{op}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="field col-4 xl:col-3">
                                                <label htmlFor="">Payment Mode</label>
                                                {orderPaymentModeOptions.map((op) => {
                                                    return (
                                                        <div key={op} className="field-radiobutton">
                                                            <RadioButton inputId={op} name="order_payment_source" value={newRecord.order_payment_source} onChange={(e) => newRecordChangeHandler("order_payment_source", op)} checked={newRecord.order_payment_source === op} />
                                                            <label htmlFor={op}>{op}</label>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                            <div className="field col-12 xl:col-3">
                                                <div className="field">
                                                    <label htmlFor="">Order Note (optional)</label>
                                                    <InputTextarea autoResize disabled={newLoader} value={newRecord.order_note} onChange={(e) => newRecordChangeHandler(`order_note`, e.target.value)} placeholder="Enter note if any" />
                                                </div>
                                                <div className="field flex align-item-center gap-2">
                                                    <Checkbox inputId="binary" checked={newRecord.send_notifications} onChange={(e) => newRecordChangeHandler("send_notifications", e.checked)} />
                                                    <label htmlFor="">Send Notification (optional)</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 xl:col-3">
                                    <div className="card">
                                        <h6 className="text-center">Other Details</h6>
                                        <hr className="col-12" />
                                        <div className="p-fluid grid formgrid">
                                            <div className="field col-12">
                                                <label htmlFor="">Customer Name</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={newRecord.customer_name}
                                                    onChange={(e) => newRecordChangeHandler(`customer_name`, e.target.value)}
                                                    className={classNames({ "p-invalid": !newRecord.customer_name && errors.length >= 1 })}
                                                    placeholder="Enter Customer Name"
                                                />
                                                {errors.length >= 1 && !newRecord.customer_name && <small className="p-error block">Please enter customer name</small>}
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Customer Phone</label>
                                                <InputText
                                                    disabled={newLoader}
                                                    value={newRecord.customer_phone}
                                                    onChange={(e) => newRecordChangeHandler(`customer_phone`, e.target.value)}
                                                    className={classNames({ "p-invalid": !newRecord.customer_phone && errors.length >= 1 })}
                                                    placeholder="Enter Customer Phone"
                                                />
                                                {errors.length >= 1 && !newRecord.customer_phone && <small className="p-error block">Please enter customer phone</small>}
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Order Address (optional)</label>
                                                <InputTextarea autoResize disabled={newLoader} value={newRecord.order_address} onChange={(e) => newRecordChangeHandler(`order_address`, e.target.value)} placeholder="Enter order address" />
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Order City (optional)</label>
                                                <InputText disabled={newLoader} value={newRecord.order_city} onChange={(e) => newRecordChangeHandler(`order_city`, e.target.value)} placeholder="Enter order city" />
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Order State (optional)</label>
                                                <InputText disabled={newLoader} value={newRecord.order_state} onChange={(e) => newRecordChangeHandler(`order_state`, e.target.value)} placeholder="Enter Order State" />
                                            </div>
                                            <div className="field col-12">
                                                <label htmlFor="">Order Country (optional)</label>
                                                <InputText disabled={newLoader} value={newRecord.order_country} onChange={(e) => newRecordChangeHandler(`order_country`, e.target.value)} placeholder="Enter order country" />
                                            </div>
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
        </div>
    );
};
