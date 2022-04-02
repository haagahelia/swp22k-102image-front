import { useState, useEffect } from 'react';

// import { Base64ToBlob } from './components/Base64ToBlob';
import axios from 'axios';
import List from './components/List';
import './App.css';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SignBoard from './components/SignBoard';

function App() {
  const [ allSignatures, setAllSignatures ] = useState([])
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState('');
  const [showAllSig, setShowAllSig] = useState(false);

  useEffect(() => {
    fetchData()
  }, [])

  // Fetching all signatures
  const fetchData = () => {
    try {
      axios('http://195.148.22.114:8777/api/signatures/all').then(
        (res) => {
          const data = res.data.data
          data.forEach(function (dataItem) {
            dataItem.rowHeight = 100;
          });
          setAllSignatures(data);
          setMsg("Showing all signatures")
          setOpen(true);
          console.log(res.data.data);
        },
        (error) => {
          console.log('Error fetching data: ', error);
          setOpen(true);
          setMsg('Could not fetch the data: ', error);
        }
      );
    } catch (error) {
      console.log(error);
      setOpen(true);
      setMsg('Something went wrong!');
    }
  };

  return (
    <div className='container'>
      <SignBoard 
        showAllSig={showAllSig} 
        setShowAllSig={setShowAllSig}
        fetchData={fetchData}
      />
      <List 
        showAllSig={showAllSig} 
        allSignatures={allSignatures} 
        setAllSignatures={setAllSignatures}
        open={open}
        setOpen={setOpen}
        msg={msg}
        setMsg={setMsg}
      />
    </div>
  );
}

export default App;
