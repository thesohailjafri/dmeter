import React, { useCallback, useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import classNames from "classnames";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { branchesAtom } from "../recoil/atoms/branchAtom";
import { useRecoilValue } from "recoil";
import { Column, DataTable } from "primereact";
import { deleteMenuCategory, getMenuCategories, postMenuCategory } from "../api";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";
import { ConfirmPopup, confirmPopup } from "primereact/confirmpopup";
import { MenuCategoryDatatable } from "../components/datatables/MenuCategoryDatatable";

export const AllMenuCategoryPage = () => {
    const [records, setRecords] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);

    useEffect(() => {
        document.title = "All Branch Menu Categories";
    }, []);

    const fetchRecords = useCallback(async () => {
        if (!restaurantId) return;
        const res = await getMenuCategories({
            restaurant_id: restaurantId,
            fields: "name description",
        });
        if (res) {
            if (res.status === 200) {
                setRecords(res.data.records);
            }
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return (
        <div className="card">
            <h3>All Branch Menu Categories</h3>
            <MenuCategoryDatatable records={records} setRecords={setRecords} fetchRecords={fetchRecords} />
        </div>
    );
};
