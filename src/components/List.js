import { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';

import Snackbar from '@mui/material/Snackbar';

/* Imports for Delete icon here 

import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

*/

function List() {

    const [sig, setSig] = useState([]);
    const [open, setOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const handleClose = () => {
        setOpen(false);
    }

    useEffect(() => {
        fetchData();
    }, []
    );
    // Fetching all signatures
    const fetchData = () => {
        fetch('http://195.148.22.114:8777/api/signatures/all')
            .then(response => {
                if (!response.ok) {
                    setOpen(true);
                    setMsg('Could not fetch the data!')
                }
                response.json();
                console.log(response)
            })
            .then(data => {
                setSig(data); /* To be updated here! */
                console.log(sig)

            })
            .catch(err => {
                console.log(err);
                setOpen(true);
                setMsg('Something went wrong!');
            })
    }

    /* Deleting one signature, link to signature to be added..

    const deleteSignature = url => {
        if(window.confirm('Are you sure?')){
            fetch(url.LINK TO ADD HERE , { method: 'DELETE' })
                .then(response => {
                    console.log(response)
                        if(response.ok){
                            setOpen(true);
                            fetchData();
                            setMsg('Signature deleted successfully!')
                        } else {
                            setMsg('Something went wrong!')
                        }
                })
                .catch(err => {
                    console.log(err);
                    setOpen(true);
                    setMsg('Something went wrong. Please, try again!')
                })
        }
    };
    
    
    */

    const columns = [
        { headerName: 'UUID', field: 'UUID', sortable: true, filter: true, width: 50 },
        { headerName: 'Image', field: 'signature', sortable: false, filter: false, width: 100 },
        { headerName: 'Pickup date', field: 'timestamp', sortable: true, filter: true, width: 50 }
        /* Column for deleting signature here..
            {headerName: '',
            width: 50,
            field: /to be added here/,
            <Stack direction="row" spacing={1}><IconButton aria-label="delete" color="error" size="small" onClick={() => deleteSignature(params)}><DeleteIcon /></IconButton></Stack>
        
        */
    ]

    return (
        <div>
            <AgGridReact /* Design of table to be updated!*/
                rowData={sig}
                columnDefs={columns}
                pagination={true}
                paginationPageSize={20}
                suppressCellFocus={true}
                animateRows={true}
            />

            <Snackbar
                open={open}
                message={msg}
                autoHideDuration={9000}
                onClose={handleClose}
            />
        </div>
    );
}

export default List;
