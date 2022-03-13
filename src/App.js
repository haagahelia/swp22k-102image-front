import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import "./App.css";
import { Base64ToBlob } from "./components/Base64ToBlob";

function App() {
  const sigPad = useRef({});
  const [firstSig, setFirstSig] = useState("");
  const [sig, setSig] = useState();

  const clearSig = () => {
    sigPad.current.clear();
    sigPad.current.on();
  };

  const data = firstSig.split(",")[1];
  const type = firstSig.split(";")[0].slice(5, 14);

  const base64 = btoa(data);
  const decoded = atob(base64);

  const saveSig = () => {
    setFirstSig(sigPad.current.toDataURL());
    setSig(Base64ToBlob(decoded, type)); //saving the PNG signature image as a base64 string
    sigPad.current.off();

    const formData = new FormData();
    formData.append("file", sig);
    try {
        const res = axios.post(
            "http://localhost:3000/signature",
            formData
        );
        console.log(res);
    } catch (ex) {
        console.log(ex);
    }
    

    alert(
        "Saved! Clear the canvas then check with the show last save function!"
    );
};

  const lastSig = () => {
    if (sig === undefined) {
      alert("No signature has been saved!");
    } else {
      clearSig();
      sigPad.current.fromDataURL(sig);
    }
  };

  return (
    <div>
      <div className="sigCanvas">
        <SignaturePad ref={sigPad} canvasProps={{ className: "sigPad" }} />
      </div>
      <div>
        <div className="buttonGroup">
          <button onClick={clearSig}>Clear</button>
          <button onClick={saveSig}>Save</button>
          <button onClick={lastSig}>Show last save</button>
        </div>
      </div>
    </div>
  );
}

export default App;
