import { Button, Column, DataTable, Tag } from "primereact";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { getMenu } from "../api";
import { MenuDatatable } from "../components/datatables/MenuDatatable";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";

export const AllMenuPage = () => {
    const [records, setRecords] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);

    const fetchMenu = useCallback(async () => {
        if (!restaurantId) return;
        const res = await getMenu({
            restaurant_id: restaurantId,

            fields: "diet name thumbnail prices alternateNames ingredients allergens",
        });
        if (res) {
            if (res.status === 200) {
                setRecords(res.data.records);
            }
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchMenu();
    }, [fetchMenu]);

    return (
        <div className="card">
            <h3>All Menu Items</h3>
            <MenuDatatable records={records} setRecords={setRecords} />
        </div>
    );
};
