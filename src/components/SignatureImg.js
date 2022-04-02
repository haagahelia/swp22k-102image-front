import React, { useEffect, useState } from "react"

export default function SignatureImg(props) {
    const [ sigImg, setSigImg ] = useState(null)
    const rowData = props.valueFormatted ? props.valueFormatted : props.value

    useEffect(() => {
        setSigImg(`data:image/png;base64,${rowData.image}`)
    }, [rowData])

    return (
        <div>
            <img 
                src={sigImg} 
                alt="Signature" 
                width={160} 
                style={{ border: "1px solid black" }} 
            />
        </div>
    )
}
