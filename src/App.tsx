import React from 'react';
import Peacock from "./assets/peacock.svg"
import './App.css';
import DownloadCertificate from './components/Certificate/DownloadCertificate';

function App() {
  return (
    <div className="App">


      <div className="header">
        <header className="App-header">
          Get Married on the Chain
        </header>

        <img className="peacock-img" src={Peacock} alt={"Peacock"} />




      </div>
      <form>

        <div className="input-box">
          <input type="text" name="naeeme" required />
          <label htmlFor="ee">Name</label>
        </div>

        <button type="submit">Submit</button>

      </form>


      <DownloadCertificate />


    </div>
  );
}

export default App;
