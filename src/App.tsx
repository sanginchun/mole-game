import { useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <Link to="/game">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </Link>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
