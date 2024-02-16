// App.js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [githubLink, setGithubLink] = useState('');

  const handleLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Submitted GitHub link: ${githubLink}`);
  };

  return (
    <>
      <div className="glass-header">
        <h1>SwiftServer</h1>
      </div>
      <div className="launch">
        <div className="deploy-text">
          <p>Deploy your Frontend</p>
        </div>
        <div className="github-bar">
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Enter your GitHub link"
              value={githubLink}
              onChange={handleLinkChange}
              style={{
                width: '300px',
                height: '40px',
                borderRadius: '20px',
                padding: '10px',
              }}
            />
          </div>
          <button onClick={handleSubmit}>Submit Link</button>
        </div>
      </div>
    </>
  );
}

export default App;
