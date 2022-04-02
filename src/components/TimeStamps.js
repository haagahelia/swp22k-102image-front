import React, { useEffect, useState } from "react"
import moment from "moment-timezone"

export default function TimeStamps(props) {
    const [ timestamps, setTimestamps ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value
    
    useEffect(() => {
        const ts = moment(rowData.signed_at).tz("Asia/Omsk").format("DD-MM-YYYY HH:mm")
        setTimestamps(ts)
    }, [rowData])

    return (
        <div>{timestamps}</div>
    )
}
