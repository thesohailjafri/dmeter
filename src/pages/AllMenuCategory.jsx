import { Button, Column, DataTable, Tag } from "primereact";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { getMenu } from "../api";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";

export const AllMenuPage = () => {
    const dt = useRef(null);

    const [menu, setMenu] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);

    const fetchMenu = useCallback(async () => {
        if (!restaurantId) return;
        const res = await getMenu({
            restaurant_id: restaurantId,

            fields: "diet name thumbnail prices alternateNames ingredients allergens",
        });
        if (res) {
            if (res.status === 200) {
                setMenu(res.data.menu);
            }
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

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

    const actionBody = (rd) => {
        return (
            <div className="flex gap-1">
                <Button label="Edit" icon="pi pi-pencil" />
                <Button label="Delete" icon="pi pi-trash" className="p-button-danger" />
            </div>
        );
    };
    return (
        <div className="card">
            <h3>All Menu Categories</h3>
            <DataTable
                ref={dt}
                value={menu}
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
                <Column header="Branch" field="branch_id.branch_name" />
                <Column header="Thumbnail Image" body={menuThumbnailBody} />
                <Column header="Name" field="name" sortable />
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
