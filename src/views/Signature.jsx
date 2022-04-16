import React, { useState, useEffect } from "react"

import Navbar from "../components/Navbar"
import Table from "../components/SignatureTable/Table"

export default function Signature({ orders }) {
    const [ ordersHaveSigs, setOrdersHaveSigs ] = useState([])

    useEffect(() => {
        const temp = orders.filter(o => o.pu_signed_at)
        setOrdersHaveSigs(temp)
    }, [orders])

    return (
        <div className="container">
            <Navbar />
            <h2>Signatures</h2>
            <Table orders={ordersHaveSigs} />
        </div>
    )
}
