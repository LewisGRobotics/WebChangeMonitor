import './App.css';
import TextInput from './components/TextInput'
import GenericButton from './components/GenericButton'
import Combobox from './components/Combobox'
import {useState} from 'react'

function App() {
  const [userTextInput, setUserTextInput] = useState('');
  const [pageHTML, setPageHTML] = useState('');
  const [monitoring, setMonitoring] = useState(false);
  const [buttonText, setButtonText] = useState("Start monitoring");
  const [intervalId, setIntervalId] = useState(0);

  var options = ["1000","2000","5000","10000"]
  const makeHttpObject = () => {
    try {return new XMLHttpRequest();}
    catch (error) {}  
    throw new Error("Could not create HTTP request object.");
  }
  
  const startStopMonitoring = () =>{    
    if(monitoring === false){
      setMonitoring(true);
      var request = makeHttpObject();
      request.open("GET", 'https://cors-anywhere-lg.herokuapp.com/'+ userTextInput, true);
      request.send(null);
      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status == 200){
          alert("Monitoring started, do not close this window")
          console.log(request.response)        
          setPageHTML(request.response);          
          setButtonText("Stop monitoring");
          setIntervalId(window.setInterval(function(){
            monitor();
          }, 5000))
        }
        else if(request.status != 200){
          alert(`Error ${request.status}: ${request.statusText}`);
        }
      }

    }
    else{
      setMonitoring(false)
      clearInterval(intervalId);
      setIntervalId(0);
      setButtonText("Start monitoring");
    }
    
  }
  
  const monitor = () =>{
    console.log("I'm monitoring stuff very attentively")
    var request = makeHttpObject();
      request.open("GET", 'https://cors-anywhere-lg.herokuapp.com/'+ userTextInput, true);
      request.send(null);
      request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE && request.status == 200){
          if(pageHTML != request.response) alert("Changed!!")
        }
      }  
  }

  // <Combobox options={options} label="Ms refresh rate"/>
  return (
    <div className="App">
        <h1>
          <code>{"<"}</code>
          HTML change monitor
          <code>{"/>"}</code>
        </h1>
        <h2>
          Check for changes in the HTML of the following webpage:
        </h2>
        <TextInput setText={setUserTextInput} defaultText={userTextInput} onEnter={startStopMonitoring}/>
        
        <GenericButton text={buttonText} onClick={startStopMonitoring}/>
        <a
            className="App-link"
            href="https://github.com/LewisGRobotics"
            target="_blank"
            rel="noopener noreferrer">About
          </a>
    </div>
  );
}

export default App;
