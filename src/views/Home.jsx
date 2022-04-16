import React from "react"

import Navbar from "../components/Navbar"
import OrderTable from "../components/OrderTable/Table"

export default function Home({ orders }) {
    return (
        <div className='container'>
            <Navbar />
            <h2>Orders</h2>
            <OrderTable orders={orders} /> 
        </div>
    )
}
