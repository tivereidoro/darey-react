// import { useState } from "react";

import "./App.css";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import Counter from "./components/List";

/**
 *
 * Main application component.
 * It fetches data from an API and displays it.
 *
 * @returns {JSX.Element}
 */
function App() {
  // State to hold the data
  const [name, setName] = useState("");

  // State to hold the loading state
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from API
    fetch("https://rickandmortyapi.com/api/character/2")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setName(data.name);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1 className="heading_text">Rick and Monty dynamic Character list</h1>

      {/* <List /> */}
    </>
  );
}

export default App;
