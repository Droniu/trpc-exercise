import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { getHello, logAPI } from "./trpc/client";
import React from "react";

function App() {
  const [apiData, setApiData] = useState("");
  const [inputValue, setInputValue] = useState("");

  React.useEffect(() => {
    getHello().then((data) => {
      setApiData(data);
    });
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    console.log(inputValue);
    try {
      const result = await logAPI(inputValue);
      console.log("API response:", result);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + tRPC</h1>
      <div className="card">
        <p>
          Data from hello endpoint:{" "}
          {apiData.length > 0 ? apiData : "Loading..."}
        </p>
      </div>
      <form
        onSubmit={onSubmit}
        style={{ display: "flex", gap: "20px", justifyContent: "center" }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Submit to API</button>
      </form>
    </>
  );
}

export default App;
