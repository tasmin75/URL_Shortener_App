import React, { useState } from "react";
import "./App.css";
import "./index.css";
import InputShortener from "./inputShortener/InputShortener";
import BackgroundAnimate from "./backgroundAnimate/BackgroundAnimate";
import LinkResult from "./linkResult/LinkResult";

function App() {
  const [inputValue, setInputValue] = useState("");

  return (
    <div className="container">
      <InputShortener setInputValue={setInputValue} />
      <BackgroundAnimate />
      <LinkResult inputValue={inputValue} />
    </div>
  );
}

export default App;
