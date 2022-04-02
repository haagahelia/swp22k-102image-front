import React, { useRef, useState } from "react"
import { base64ToBlob } from "../utils/helpers";
import axios from "axios";

import SignaturePad from 'react-signature-canvas';

export default function SignBoard({ showAllSig, setShowAllSig, fetchData }) {
    const sigPad = useRef({});
    const [prevSignature, setPrevSignature] = useState();

    const clearSig = () => {
        sigPad.current.clear();
        sigPad.current.on();
    };

    const saveSig = async () => {
        // const data = sigPad.current.toDataURL().split(',')[1];
        // const type = sigPad.current.toDataURL().split(';')[0].slice(5, 14);
        // const base64 = btoa(data);
        // const decoded = atob(base64);

        // setFirstSig(sigPad.current.toDataURL());
        setPrevSignature(sigPad.current.toDataURL()); //saving the PNG signature image as a base64 string
        sigPad.current.off();

        // let fileBlob = Base64ToBlob(
        //   decoded,
        //   sigPad.current.toDataURL().split(';')[0].slice(5, 14)
        // ); //Convert Base64 to blob
        const blob = await base64ToBlob(sigPad.current.toDataURL())
        sendToServer(blob);
    };

    //Function to send blob to server
    //Can separate function definition later in refactoring!

    const sendToServer = async (signatureBlob) => {
        console.log(signatureBlob);
        const formData = new FormData();
        formData.append('signature', signatureBlob);
        console.log(formData.get('signature'));

        const res = await axios.post(
            'http://195.148.22.114:8777/api/signatures',
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        );
        console.log(res.data);
        fetchData()

        let result = res.data;
        if (result.status === 'ok') {
            alert(
                'Saved! Clear the canvas then check with the show last save function!'
            );
        }
    };

    const lastSig = () => {
        if (prevSignature === undefined) {
            alert('No signature has been saved!');
        } else {
        clearSig();
            sigPad.current.fromDataURL(prevSignature);
        }
    };

    const showSignatures = () => {
        setShowAllSig(!showAllSig);
    };


    return (
        <>
            <div className='sigCanvas'>
                <SignaturePad ref={sigPad} canvasProps={{ className: 'sigPad' }} />
            </div>
            <div>
                <div className='buttonGroup'>
                    <button onClick={clearSig}>Clear</button>
                    <button onClick={saveSig}>Save</button>
                    <button onClick={lastSig}>Show last save</button>
                    {showAllSig === true ? (
                        <button onClick={showSignatures}>Hide all signatures</button>
                    ) : (
                        <button onClick={showSignatures}>Show all signatures</button>
                    )}
                </div>
            </div>
        </>
    )
}
