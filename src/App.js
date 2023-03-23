
import { useState, useEffect} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

// TODO: Make the pdf stuff work

const API_URL = "https://api-inference.huggingface.co/models/tuner007/pegasus_summarizer"
const headers = {"Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`}

async function query(payload){
	const response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)
  });
	return response.json();
}

//https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/
 
function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
 
  const handleChange = (event) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].type.includes("image")){
      setImagePath(URL.createObjectURL(event.target.files[0]));
    }
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
    const response = await query(payload);
    const summary = response[0].summary_text;
    setSummary(summary);
  }

  const handlePaste = (event) => {
    console.log(event.clipboardData.files[0]);
    if (event.clipboardData.files && event.clipboardData.files[0] && event.clipboardData.files[0].type.includes("image")) {
      setImagePath(URL.createObjectURL(event.clipboardData.files[0]));
    }
  }

  useEffect(() => {
    window.addEventListener("paste", handlePaste);

    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
 
  return (
    <div className="App">
      <main className="App-main">
        <h2>Image Summarizer</h2>
        <h3>Choose a file or paste to upload.</h3>
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
