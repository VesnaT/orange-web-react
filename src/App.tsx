import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import Orange from "./components/Orange";
import Home from "./components/Home";
import { Workflows } from "./mockedData";

function App() {
  const workflowIDs = Workflows.map((w) => w.workflowIDx);
  return (
    <div className="App">
      <nav className="nav">
        <Link to={"/"}>Home</Link>
        {workflowIDs.map((workflowID: string) => (
          <Link key={workflowID} to={workflowID}>
            {workflowID}
          </Link>
        ))}
      </nav>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path=":id" element={<Orange />}></Route>
      </Routes>
    </div>
  );
}

export default App;
