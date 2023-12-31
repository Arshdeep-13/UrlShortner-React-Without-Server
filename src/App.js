import axios from 'axios';
import React, { useState } from 'react'
import './App.css'

export default function App() {
  const [input, setinput] = useState("");
  const [result, setresult] = useState("");
  const [loader, setloader] = useState(false);
  const fetchData = async () => {
    try {
      // api url -> https://api.shrtco.de/v2/shorten?url=${type your url here}
      setloader(true);

      var myHeaders = new Headers();
      myHeaders.append("apikey", "BIGoJPhMahwzkz0qhcsFU3MwIOC6DYVe");

      var requestOptions = {
        method: 'POST',
        redirect: 'follow',
        headers: myHeaders,
        body: `${input}`
      };

      let res = await fetch("https://api.apilayer.com/short_url/hash", requestOptions);
      res = await res.json();
      setloader(false);
      // console.log(res)
      setresult(res.short_url);
    }
    catch (err) {
      alert(err);
    }
  }
  const handleClick = () => {
    fetchData();
    setinput("");
  }
  return (
    <div className='mainContainer'>
      <h1>URL Shortner Web App</h1>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="basic-url" className="form-label">Website URL</label>
          <div className="input-group">
            <span className="input-group-text" id="basic-addon3">https://</span>
            <input type="text" aria-describedby="basic-addon3 basic-addon4" className="form-control" id="basic-url" placeholder='Enter any Link here' value={input} onChange={(e) => setinput(e.target.value)} />
          </div>
          {/* <div className="form-text" id="basic-addon4">Example help text goes outside the input group.</div> */}
        </div>
        <button className='btn btn-success' onClick={handleClick}>Submit</button>
        {loader === true ? "Loading..." : <a rel="noreferrer" target='_blank' href={result}>{result}</a>}
      </div>
    </div>
  )
}
