import React, { useEffect, useState } from "react"
import moment from "moment-mini"

export default function TimeStamps(props) {
    const [ timestamps, setTimestamps ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    useEffect(() => {
        if (rowData) {
            const ts = moment(rowData).format("DD-MM-YYYY HH:mm")
            setTimestamps(ts)
        }
    }, [rowData])

    return (
        <div>{timestamps}</div>
    )
}