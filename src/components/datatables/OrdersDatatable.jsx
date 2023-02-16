import React, { useEffect, useRef, useState } from "react";
import { Button, Column, DataTable, Dropdown, Dialog } from "primereact";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { userPositionAtom } from "../../recoil/atoms/userAtom";
import { orderStatusAllOptionsAtom, orderStatusCookOptionsAtom, orderStatusStaffOptionsAtom } from "../../recoil/atoms/orderAtom";
import { useRecoilValue } from "recoil";
export const OrdersDatatable = ({ records, setRecords, allRecords = true, fetchRecords }) => {
    const userPosition = useRecoilValue(userPositionAtom);
    const orderStatusAllOptions = useRecoilValue(orderStatusAllOptionsAtom);
    const orderStatusStaffOptions = useRecoilValue(orderStatusStaffOptionsAtom);
    const orderStatusCookOptions = useRecoilValue(orderStatusCookOptionsAtom);
    const [orderStatusOptions, setOrderStatusOptions] = useState([]);

    useEffect(() => {
        if (["manager", "owner"].includes(userPosition)) {
            setOrderStatusOptions(orderStatusAllOptions);
        }
        if (userPosition === "cook") {
            setOrderStatusOptions(orderStatusCookOptions);
        }
        if (userPosition === "staff") {
            setOrderStatusOptions(orderStatusStaffOptions);
        }
    }, [userPosition, orderStatusAllOptions, orderStatusCookOptions, orderStatusStaffOptions]);

    const dt = useRef(null);
    const [deleteLoader, setDeleteLoader] = useState(false);

    const orderStatusBody = (rd) => {
        return (
            <div>
                <Dropdown className="w-full" options={orderStatusOptions} value={rd.order_status} />
            </div>
        );
    };

    const handleRecordDelete = async (id) => {
        setDeleteLoader(true);
        // const res = await deleteMenuitem(id);
        // if (res) {
        // 		setDeleteLoader(false);
        // 		if (res.status === 200) {
        // 				setRecords((ps) => [...ps].filter((r) => r._id !== id));
        // 		}
        // }
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
                <Button label="View" icon="pi pi-eye" />
                <Button disabled={deleteLoader} label="Delete" icon="pi pi-trash" className="p-button-danger" onClick={(e) => deleteRecordConfirm(e, rd._id)} />
            </div>
        );
    };

    const orderProductsBody = (rd) => {
        const records = rd.order_products;
        return (
            <div className="">
                <DataTable value={records}>
                    <Column header="Name" field="product_name" />
                    <Column header="Quantity" field="quantity" />
                    <Column header="Count" field="quantity_count" />
                    <Column header="Price" field="amount" body={(rd) => <>₹{rd.amount}</>} />
                    <Column header="Discount" field="discount" body={(rd) => <>₹{rd.discount}</>} />
                </DataTable>
            </div>
        );
    };
    const dtHeader = () => {
        return (
            <div className="flex flex-wrap justify-content-between align-items-center">
                <div className="">Ordes</div>
                <div className="">
                    <div>
                        <Button icon="pi pi-refresh" onClick={fetchRecords} />
                    </div>
                </div>
            </div>
        );
    };
    return (
        <div>
            <ConfirmPopup />
            <DataTable
                ref={dt}
                header={dtHeader}
                value={records}
                showGridlines
                breakpoint="1700px"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                rows={10}
                paginator
                rowsPerPageOptions={[10, 50, 100]}
                removableSort
            >
                <Column header="Branch" field="branch_id.branch_name" hidden={!allRecords} />

                <Column header="Cust. Name" field="customer_name" />
                <Column header="Cust. Phone" field="customer_phone" />
                <Column header="Type" field="order_type" />
                <Column header="Source" field="order_source" />
                <Column header="Status" field="order_status" body={orderStatusBody} />
                <Column header="Products" field="" body={orderProductsBody} />
                <Column header="Delivery" field="order_delivery_charges" body={(rd) => `₹${rd.order_delivery_charges}`} />
                <Column header="Amount" field="grand_total" body={(rd) => `₹${rd.grand_total}`} />
                <Column header="Action" field="grand_total" body={actionBody} />
            </DataTable>
            <Dialog visible={false}></Dialog>
        </div>
    );
};
