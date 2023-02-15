import React, { useRef, useState } from "react";
import { Button, Column, DataTable } from "primereact";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteStaffMember } from "../../api";

export const StaffDatatable = ({ records, setRecords, allRecords = true }) => {
    const dt = useRef(null);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const handleRecordDelete = async (id) => {
        setDeleteLoader(true);
        const res = await deleteStaffMember(id);
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
    return (
        <div>
            <ConfirmPopup />
            <DataTable
                ref={dt}
                value={records}
                rowHover
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                rows={10}
                paginator
                rowsPerPageOptions={[10, 50, 100]}
                removableSort
            >
                <Column header="Branch" field="branch_id.branch_name" hidden={!allRecords} />
                <Column header="Position" field="position" sortable />
                <Column header="Firstname" field="name.first" sortable />
                <Column header="Lastname" field="name.last" sortable />
                <Column header="Phone" field="phone" sortable />
                <Column header="Email" field="email" sortable />
                <Column header="Action" body={actionBody} />
            </DataTable>
        </div>
    );
};
