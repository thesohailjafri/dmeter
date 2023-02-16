import React, { useCallback, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { getAllStaffMembers } from "../api";
import { StaffDatatable } from "../components/datatables/StaffDatatable";
import { userRestaurantIdAtom } from "../recoil/atoms/userAtom";

export const AllStaffPage = () => {
    const [records, setRecords] = useState([]);
    const restaurantId = useRecoilValue(userRestaurantIdAtom);

    const fetchRecords = useCallback(async () => {
        if (!restaurantId) return;
        const res = await getAllStaffMembers();
        if (res) {
            if (res.status === 200) {
                setRecords(res.data?.staff);
            }
        }
    }, [restaurantId]);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);
    return (
        <div className="card">
            <h3>All Staff Members</h3>
            <StaffDatatable records={records} setRecords={setRecords} fetchRecords={fetchRecords} />
        </div>
    );
};
