
import { useState, useEffect} from 'react';
import './App.css';

// change class to className
// Add state
// Display state in the UI
// Add event handlers
// Add event handlers to the UI
// CHALLENGE: Make them write the function to handle click

function App() {
  // Kyle stuff (hooks):
  const [imagePath, setImagePath] = useState("");
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
 
  // kyle stuff (functions):
  const handleChange = (event) => {
    if (event.target.files && event.target.files[0] && event.target.files[0].type.includes("image")){
      setImagePath(URL.createObjectURL(event.target.files[0]));
    }
  };
 
  // Kyle stuff (hooks )
  const handleClick = async () => {
    // Do the OCR magic here
    setText("Example text");
    setSummary("Example summary");
  };
 
  // All of below is Rachael stuff unless otherwise noted
  // Kyle will talk about/add the onChange and onClick functions
  return (
    <div className="App">
      <main className="App-main">
        <h2>Image Summarizer</h2>
        <h3>Choose a file to upload.</h3>
        <input type="file" onChange={handleChange} />
        {/* { imagePath && <>
          <h4>Selected Image</h4>
          <img src={imagePath} className="App-image" alt="logo" />
          <br />
          <button onClick={handleClick}>Convert to text</button>
        </> } */}
          <h4>Selected Image</h4>
          <img src="light.jpg" className="App-image" alt="logo" />
          <br />
          <button >Convert to text</button>
       

        {/* { text && <><h4>Extracted text</h4>
        <div className="text-box">
          <p>{ text }</p>
        </div></> } 
        
        { summary && <><h4>Summary text</h4>
        <div className="text-box">
          <p>{ summary }</p>
        </div></> }*/}

        {/* Instead of the above, do: */}
        <h4>Extracted text</h4>
        <div className="text-box">
          <p>Filler</p>
        </div> 
        
        <h4>Summary text</h4>
        <div className="text-box">
          <p>Summary</p>
        </div>
        
        <br /><br />
      </main>
    </div>
  );
}
 
export default App;
