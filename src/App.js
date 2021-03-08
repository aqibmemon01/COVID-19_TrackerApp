import React from 'react';
import SearchAppBar from "./Components/navbar";
import Dropdown from "./Components/dropdown"
import Graph from './Components/Graph'
import "./App.css"

function App() {
  return (
    <div className="App">
      <SearchAppBar/>
      <Dropdown/>
      <Graph />

    </div>
  );
}

export default App;