import './App.css';
import TextInput from './components/TextInput'
import GenericButton from './components/GenericButton'
import {useState} from 'react'

function App() {
  const [userTextInput, setUserTextInput] = useState('');
  const [pageHTML, setPageHTML] = useState('');

  const makeHttpObject = () => {
    try {return new XMLHttpRequest();}
    catch (error) {}
    //try {return new ActiveXObject("Msxml2.XMLHTTP");}
    //catch (error) {}
    //try {return new ActiveXObject("Microsoft.XMLHTTP");}
    //catch (error) {}
  
    throw new Error("Could not create HTTP request object.");
  }
  
  const fetchHTML = () =>{    
    var request = makeHttpObject();
    request.open("GET", 'https://cors-anywhere-lg.herokuapp.com/'+ userTextInput, true);
    request.send(null);
    request.onreadystatechange = function() {
      if (request.status == 200){
        alert("Monitoring started, do not close this window")
        console.log(request.response)        
        setPageHTML(request.response);
      }
      else{
        alert(`Error ${request.status}: ${request.statusText}`);
      }
      
    };
  }
  

  return (
    <div className="App">
        <h1>
          <code>{"<"}</code>
          HTML change monitor
          <code>{"/>"}</code>
        </h1>
        <h2>
          I want to check for changes in the HTML of the following webpage:
        </h2>
        <TextInput setText={setUserTextInput} defaultText={userTextInput} onEnter={fetchHTML}/>
        <GenericButton text="Start monitoring" onClick={fetchHTML}/>
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
