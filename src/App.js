
import { useState} from 'react';
import Tesseract from 'tesseract.js';
import './App.css';

// TODO: Make the paste stuff work - basically allow the user to paste an image into the app

const API_URL = "https://api-inference.huggingface.co/models/tuner007/pegasus_summarizer"
const headers = {"Authorization": `Bearer ${process.env.REACT_APP_HUGGINGFACE_TOKEN}`}

async function query(payload){
	let response = await fetch(API_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(payload)})
	return response.json()
}

//https://www.smashingmagazine.com/2021/06/image-text-conversion-react-tesseract-js-ocr/
 
function App() {
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
 
  const handleChange = (event) => {
    setImagePath(URL.createObjectURL(event.target.files[0]));
  }
 
  const handleClick = async () => {
    // Do the OCR magic here
    let result = await Tesseract.recognize(
      imagePath,'eng',
      { 
        logger: m => console.log(m) 
      }
    )
    let confidence = result.data.confidence
     
    let text = result.data.text
    setText(text);
    
    let payload = {
      "inputs": text,
    }

    // Do the summarization magic here
    let response = await query(payload)
    let summary = response[0].summary_text
    setSummary(summary);
  }
 
  return (
    <div className="App">
      <main className="App-main">
        <h3>Actual imagePath uploaded</h3>
        <img 
           src={imagePath} className="App-image" alt="logo"/>
        
          <h3>Extracted text</h3>
        <div className="text-box">
          <p> {text} </p>
        </div>
        <h3>Summary text</h3>
        <div className="text-box">
          <p> {summary} </p>
        </div>
        <input type="file" onChange={handleChange} />
        <button onClick={handleClick} style={{height:50}}> convert to text</button>
      </main>
    </div>
  );
}
 
export default App
