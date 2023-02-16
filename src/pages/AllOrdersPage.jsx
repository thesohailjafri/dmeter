import React, { useCallback, useEffect, useState } from "react";
import { getOrders } from "../api";
import { OrdersDatatable } from "../components/datatables/OrdersDatatable";

export const AllOrdersPage = () => {
    const [records, setRecords] = useState([]);

    const fetchRecords = useCallback(async () => {
        const res = await getOrders({
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
    }, []);

    useEffect(() => {
        fetchRecords();
    }, [fetchRecords]);

    return (
        <div className="card">
            <h3>All Staff Members</h3>
            <OrdersDatatable records={records} setRecords={setRecords} fetchRecords={fetchRecords} />
        </div>
    );
};
