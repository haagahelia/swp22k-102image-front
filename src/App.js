import { useRef, useState } from 'react';
import SignaturePad from 'react-signature-canvas';
import './App.css';
import { Base64ToBlob } from './components/Base64ToBlob';
import axios from 'axios';
import List from './components/List';

function App() {
  const sigPad = useRef({});
  const [firstSig, setFirstSig] = useState('');
  const [sig, setSig] = useState();
  const [showAllSig, setShowAllSig] = useState(false);

  const clearSig = () => {
    sigPad.current.clear();
    sigPad.current.on();
  };

  const saveSig = () => {
    const data = sigPad.current.toDataURL().split(',')[1];
    const type = sigPad.current.toDataURL().split(';')[0].slice(5, 14);
    const base64 = btoa(data);
    const decoded = atob(base64);

    setFirstSig(sigPad.current.toDataURL());
    setSig(Base64ToBlob(decoded, type)); //saving the PNG signature image as a base64 string
    sigPad.current.off();

    let fileBlob = Base64ToBlob(
      decoded,
      sigPad.current.toDataURL().split(';')[0].slice(5, 14)
    ); //Convert Base64 to blob

    sendToServer(fileBlob);
  };

  //Function to send blob to server
  //Can separate function definition later in refactoring!

  const sendToServer = async (signatureBlob) => {
    console.log(signatureBlob);
    const formData = new FormData();
    formData.append('signature', signatureBlob);
    console.log(formData.get('signature'));

    const res = await axios.post(
      'http://localhost:8787/api/signatures',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    console.log(res.data);

    let result = res.data;
    if (result.status == 'ok') {
      alert(
        'Saved! Clear the canvas then check with the show last save function!'
      );
    }
  };

  const lastSig = () => {
    if (sig === undefined) {
      alert('No signature has been saved!');
    } else {
      clearSig();
      sigPad.current.fromDataURL(sig);
    }
  };

  const showSignatures = () => {
    setShowAllSig(!showAllSig);
  };

  return (
    <div>
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
          <List showAllSig={showAllSig} />
        </div>
      </div>
    </div>
  );
}

export default App;
