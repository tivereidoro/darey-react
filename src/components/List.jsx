import React, { useState } from "react";

export default function List() {
  return (
    <div className="list_container">
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
