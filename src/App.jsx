// import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import Counter from "./components/Counter";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <img src={reactLogo} className="logo react" alt="React logo" />
      </div>

      <h1 className="heading_text">React Click Counter</h1>

      {/* <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Counter: &nbsp; {count}
        </button>
      </div> */}

      <Counter />
    </>
  );
}

export default App;
