import React, { useRef, useState } from "react";
import { Button, Column, DataTable, Tag } from "primereact";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteMenuCategory } from "../../api";

export const MenuCategoryDatatable = ({ records, setRecords, allRecords = true, fetchRecords }) => {
    const dt = useRef(null);
    const [deleteLoader, setDeleteLoader] = useState(false);

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

    const dtHeader = () => {
        return (
            <div className="flex flex-wrap justify-content-between align-items-center">
                <div className="">Menu Categories</div>
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
                breakpoint="1600px"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                rows={10}
                paginator
                rowsPerPageOptions={[10, 50, 100, 250, 500]}
                removableSort
            >
                <Column header="Branch" field="branch_id.branch_name" hidden={!allRecords} />

                <Column header="Name" field="name" />
                <Column header="Description" field="description" />

                <Column header="Action" body={actionBody} />
            </DataTable>
        </div>
    );
};
