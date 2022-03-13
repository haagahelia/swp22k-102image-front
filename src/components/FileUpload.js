import axios from 'axios'
import React from 'react'
import {useState} from 'react';

function FileUpload() {
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('');

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async(e) => {
        const formData = new formData();
        formData.append('file', file);
        formData.append('fileName', fileName);
        try{
            const res = await axios.post(
                "http://localhost:3000/upload",
                formData
            );
            console.log(res)
        }catch(ex) {
            console.log(ex);
        }
    };
    return (
        <div className='App'>
            <input type="file" onChange={saveFile}>
            </input>
            <button onClick={uploadFile}>Upload</button>
        </div>
    )
}

export default FileUpload;