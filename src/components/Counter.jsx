import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  // Set the limit to 10
  const LIMIT = 3;
  const LIMIT_REACHED = count === LIMIT;
  const LIMIT_EXCEEDED_MESSAGE = "You have reached the counter limit!";

  const THRESHOLD = 0;
  const THRESHOLD_REACHED = count === THRESHOLD;
  const THRESHOLD_MESSAGE = "You can't count below 0.!";

  const handleIncrement = () => {
    if (LIMIT_REACHED) {
      alert(LIMIT_EXCEEDED_MESSAGE);
      return;
    }
    setCount((count) => count + 1);
  };
  const handleDecrement = () => {
    if (THRESHOLD_REACHED) {
      alert(THRESHOLD_MESSAGE);
      return;
    }
    setCount((count) => count - 1);
  };
  const handleReset = () => {
    setCount(0);
  };

  return (
    <div>
      <div className="card">
        <button>Counter: &nbsp; {count}</button>
      </div>

      <div className="buttons">
        <button className="increment" onClick={handleIncrement}>
          Increment
        </button>
        <button className="reset" onClick={handleReset}>
          ⟲
        </button>
        <button className="decrement" onClick={handleDecrement}>
          Decrement
        </button>
      </div>
    </div>
  );
}
