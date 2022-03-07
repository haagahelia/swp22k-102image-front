import { useRef, useState } from "react";
import SignaturePad from "react-signature-canvas";
import "./App.css";

function App() {
  const sigPad = useRef({});
  const [sig, setSig] = useState();

  const clearSig = () => {
    sigPad.current.clear();
    sigPad.current.on();
  };

  const saveSig = () => {
    setSig(sigPad.current.toDataURL()); //saving the PNG signature image as a base64 string
    sigPad.current.off();
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
