
import { useState} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

// TODO: Make the paste stuff work - basically allow the user to paste an image into the app

const API_URL = "https://api-inference.huggingface.co/models/tuner007/pegasus_summarizer"
const headers = {"Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`}

//https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/
 
function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
 
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  };
 
  const handleClick = async () => {
    // Do the OCR magic here
    const result = await Tesseract.recognize(
      imagePath,'eng',
      { 
        logger: m => console.log(m) 
      }
    );
    
    const text = result.data.text;
    setText(text);
    
    const payload = {
      "inputs": text,
    };

    // Do the summarization magic here
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(payload)
    });
    const data = await response.json();
    const summary = data[0].summary_text;
    setSummary(summary);
  }
 
  return (
    <div className="App">
      <main className="App-main">
        <h2>Image Summarizer</h2>
        <input type="file" onChange={handleChange} />
        { imagePath && <>
          <h4>Selected Image</h4>
          <img src={imagePath} className="App-image" alt="logo" />
          <br />
          <button onClick={handleClick} style={{ "height": 50 }}>Convert to text</button>
        </> }

        { text && <><h4>Extracted text</h4>
        <div className="text-box">
          <p>{ text }</p>
        </div></> }

        { summary && <><h4>Summary text</h4>
        <div className="text-box">
          <p>{ summary }</p>
        </div></> }
        
        <br /><br />
      </main>
    </div>
  );
}
 
export default App;
