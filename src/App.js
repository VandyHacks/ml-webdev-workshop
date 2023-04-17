import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");

  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };

  const handleClick = async () => {
    // Do the OCR magic here
    setText("Example text");
    setSummary("Example summary");
  };

  return (
    <div className="App">
      <main className="App-main">
        <h2>Image Summarizer</h2>
        <h3>Choose a file to upload.</h3>
        <input type="file" onChange={handleChange} />
        { imagePath && <>
          <h4>Selected Image</h4>
          <img src={imagePath} className="App-image" alt="logo" />
          <br />
          <button onClick={handleClick}>Convert to text</button>
        </> }

        { text && <><h4>Extracted text</h4>
        <div className="text-box">
          <p>{ text }</p>
        </div></> } 
        
        { summary && <><h4>Summary text</h4>
        <div className="text-box">
          <p>{ summary }</p>
        </div></> }

        <h4>Summary text</h4>
        <div className="text-box">
          <p>Summary</p>
        </div>

        <br />
        <br />
      </main>
    </div>
  );
}

export default App;
