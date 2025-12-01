import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [password, setPassword] = useState("");
  const [pin, setPin] = useState("");
  const [passLength, setPassLength] = useState(12);
  const [pinLength, setPinLength] = useState(4);
  const [options, setOptions] = useState({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: false,
  });
  const [copyPassText, setCopyPassText] = useState("Copy");
  const [copyPinText, setCopyPinText] = useState("Copy");

  const charSets = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "123456789",
    symbols: "!@#$&",
  };

  const cryptoRandomIndex = (max) => {
    const arr = new Uint32Array(1);
    crypto.getRandomValues(arr);
    return arr[0] % max;
  };

  const cryptoRandChar = (set) => {
    return set[cryptoRandomIndex(set.length)];
  };

  const cryptoShuffle = (str) => {
    let arr = [...str];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = cryptoRandomIndex(i + 1);
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join("");
  };

  const generatePassword = () => {
    const selectedSets = [];
    if (options.uppercase) selectedSets.push(charSets.uppercase);
    if (options.lowercase) selectedSets.push(charSets.lowercase);
    if (options.numbers) selectedSets.push(charSets.numbers);
    if (options.symbols) selectedSets.push(charSets.symbols);

    if (selectedSets.length === 0) {
      alert("Pick at least one option!");
      return;
    }

    // Guarantee at least one from each chosen set
    let newPassword = selectedSets.map((set) => cryptoRandChar(set)).join("");

    // Fill remaining length
    while (newPassword.length < passLength) {
      const randomSet = selectedSets[cryptoRandomIndex(selectedSets.length)];
      newPassword += cryptoRandChar(randomSet);
    }

    setPassword(cryptoShuffle(newPassword));
    setCopyPassText("Copy"); // Reset copy text
  };

  const generatePIN = () => {
    let newPin = "";
    for (let i = 0; i < pinLength; i++) {
      newPin += cryptoRandomIndex(9) + 1; // 1-9
    }
    setPin(newPin);
    setCopyPinText("Copy"); // Reset copy text
  };

  const copyToClipboard = (text, setCopyText) => {
    if (!text) return;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopyText("Copied!");
        setTimeout(() => setCopyText("Copy"), 2000);
      })
      .catch((err) => console.error("Copy failed: ", err));
  };

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.value]: e.target.checked });
  };

  return (
    <div className="glass-container">
      <h2 id="heading">
        Locksmith <i className="fas fa-lock"></i>
      </h2>
      <p className="subtitle">Secure Password & PIN Generator</p>

      <div className="generators-wrapper">
        {/* Password Generator */}
        <div className="generator-card" id="passgen">
          <div className="card-header">
            <i className="fas fa-key"></i>
            <h4>Password Generator</h4>
          </div>
          <div className="input-group">
            <input
              className="result-display"
              type="text"
              placeholder="Generated Password"
              value={password}
              readOnly
            />
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(password, setCopyPassText)}
              title="Copy to Clipboard"
            >
              {copyPassText === "Copied!" ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="far fa-copy"></i>
              )}
            </button>
          </div>
          <div className="controls">
            <div className="length-control">
              <label>
                Length: <span>{passLength}</span>
              </label>
              <input
                className="length-slider"
                type="range"
                min="4"
                max="32"
                value={passLength}
                onChange={(e) => setPassLength(Number(e.target.value))}
              />
            </div>
          </div>

          <div className="options-grid" id="options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="opt"
                value="uppercase"
                checked={options.uppercase}
                onChange={handleOptionChange}
              />
              <span className="checkmark"></span>
              Uppercase
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="opt"
                value="lowercase"
                checked={options.lowercase}
                onChange={handleOptionChange}
              />
              <span className="checkmark"></span>
              Lowercase
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="opt"
                value="numbers"
                checked={options.numbers}
                onChange={handleOptionChange}
              />
              <span className="checkmark"></span>
              Numbers
            </label>
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="opt"
                value="symbols"
                checked={options.symbols}
                onChange={handleOptionChange}
              />
              <span className="checkmark"></span>
              Symbols
            </label>
          </div>

          <button className="generate-btn btn1" onClick={generatePassword}>
            {password ? "Regenerate Password" : "Generate Password"}
          </button>
        </div>

        {/* PIN Generator */}
        <div className="generator-card" id="pingen">
          <div className="card-header">
            <i className="fas fa-th"></i>
            <h4>PIN Generator</h4>
          </div>
          <div className="input-group">
            <input
              className="result-display"
              type="text"
              placeholder="Generated PIN"
              value={pin}
              readOnly
            />
            <button
              className="copy-btn"
              onClick={() => copyToClipboard(pin, setCopyPinText)}
              title="Copy to Clipboard"
            >
              {copyPinText === "Copied!" ? (
                <i className="fas fa-check"></i>
              ) : (
                <i className="far fa-copy"></i>
              )}
            </button>
          </div>
          <div className="controls">
            <div className="length-control">
              <label>
                Length: <span>{pinLength}</span>
              </label>
              <input
                className="length-slider"
                type="range"
                min="2"
                max="12"
                value={pinLength}
                onChange={(e) => setPinLength(Number(e.target.value))}
              />
            </div>
          </div>
          <button className="generate-btn btn2" onClick={generatePIN}>
            {pin ? "Regenerate PIN" : "Generate PIN"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
