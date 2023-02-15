import React, { useRef, useState } from "react";
import { Button, Column, DataTable, Tag } from "primereact";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
export const OrdersDatatable = ({ records, setRecords }) => {
    const dt = useRef(null);
    const [deleteLoader, setDeleteLoader] = useState(false);
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
    return (
        <div>
            <ConfirmPopup />
            <DataTable
                ref={dt}
                value={records}
                showGridlines
                // breakpoint="1600px"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                rows={10}
                paginator
                rowsPerPageOptions={[10, 50, 100]}
                removableSort
            >
                <Column header="Cust. Name" field="customer_name" />
                <Column header="Cust. Phone" field="customer_phone" />
                <Column header="Type" field="order_type" />
                <Column header="Source" field="order_source" />
                <Column header="Status" field="order_status" />

                <Column header="Amount" field="grand_total" body={(rd) => `$${rd.grand_total}`} />
                <Column header="Action" field="grand_total" body={actionBody} />
            </DataTable>
        </div>
    );
};
