// import { useState } from "react";

import "./App.css";
import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import ListComponent from "./components/ListComponent";

/**
 *
 * Main application component.
 * It fetches data from an API and displays it.
 *
 * @returns {JSX.Element}
 */
function App() {
  // State to hold the number of characters in movie
  const [characters, setCharacters] = useState("");

  // State to hold the loading state
  const [loading, setLoading] = useState(true);

  // State to hold the list of characters
  const [list, setList] = useState([]);

  // Effect to fetch data from the API and set the state variables
  // The empty array [] as the second argument ensures
  // that this effect runs only once after the component mounts
  useEffect(() => {
    setLoading(true);
    // Fetch data from the API
    fetch("https://rickandmortyapi.com/api/character")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Request failed");
        }
        return response.json();
      })
      .then((data) => {
        // Check if the data is empty
        if (data.length === 0) {
          console.log("No data available");
        } else {
          console.log("Data:", data);
        }

        setCharacters(data.info.count);
        setList(data.results);

        // Set the loading state to false
        setLoading(false);
      })
      .catch((error) => {
        console.error("An error occured while fetching data:", error);
      });

    // Simulate loading state
    // setTimeout(() => {
    //   setLoading(false);
    // }, 2000);
  }, []);

  return (
    <>
      <div className="main_app">
        <div>
          <img src={reactLogo} className="react logo" alt="React logo" />
        </div>

        <div className="title_div">
          <h1 className="heading_text">Rick and Monty List</h1>
          <p>
            This is a list of the <span className="char">{characters}</span>{" "}
            characters in Rick and Monty TV show, and the number of episodes
            they appear in.
          </p>
        </div>

        <section className="list_section">
          {loading ? (
            "Loading ..."
          ) : (
            <ul>
              {list.map((item) => (
                <li key={item.id} className="list_item">
                  <ListComponent item={item} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </>
  );
}

export default App;
