import React, { useRef, useState } from "react";
import { Button, Column, DataTable, Tag } from "primereact";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { deleteMenuitem } from "../../api";

export const MenuDatatable = ({ records, setRecords }) => {
    const dt = useRef(null);
    const [deleteLoader, setDeleteLoader] = useState(false);
    const menuThumbnailBody = (rd) => {
        return (
            <div>
                <img className="w-10rem shadow-1 p-1 border-round" src={process.env.REACT_APP_MEDIA_URL + rd.thumbnail} onError={(e) => (e.target.src = "/images/background_404.png")} />
            </div>
        );
    };

    const menuPriceBody = (rd) => {
        const { prices } = rd;
        return (
            <div>
                <DataTable value={prices}>
                    <Column header="Quantity" field="quantity" />
                    <Column header="Amount" field="amount" body={(rd) => "₹" + rd.amount} />
                </DataTable>
            </div>
        );
    };

    const ingredientsBody = (rd) => {
        const { ingredients } = rd;
        return (
            <div className="flex flex-wrap gap-1">
                {ingredients.map((item) => (
                    <Tag severity="info" className="text-base px-2" value={item} />
                ))}
            </div>
        );
    };

    const alternateNamesBody = (rd) => {
        const { alternateNames } = rd;
        return (
            <div className="flex flex-wrap gap-1">
                {alternateNames.map((item) => (
                    <Tag severity="warning" className="text-base px-2" value={item} />
                ))}
            </div>
        );
    };

    const allergensBody = (rd) => {
        const { allergens } = rd;
        return (
            <div className="flex flex-wrap gap-1">
                {allergens.map((item) => (
                    <Tag className="text-base px-2" value={item} />
                ))}
            </div>
        );
    };

    const handleRecordDelete = async (id) => {
        setDeleteLoader(true);
        const res = await deleteMenuitem(id);
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
                showGridlines
                breakpoint="1600px"
                className="datatable-responsive"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} records"
                rows={10}
                paginator
                rowsPerPageOptions={[10, 50, 100]}
                removableSort
            >
                <Column header="Thumbnail Image" body={menuThumbnailBody} />
                <Column header="Name" field="name" sortable />
                <Column header="Category" field="category_id.name" sortable />
                <Column header="Diet" field="diet" sortable />
                <Column header="Pricing" body={menuPriceBody} />
                <Column header="Ingredients" body={ingredientsBody} />
                <Column header="Alternate Names" body={alternateNamesBody} />
                <Column header="Allergens" body={allergensBody} />
                <Column header="Action" body={actionBody} />
            </DataTable>
        </div>
    );
};
