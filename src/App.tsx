import React from "react";
import { Toolbar } from "./components/Toolbar";
import { Court } from "./components/Court";
import { Timeline } from "./components/Timeline";

function App() {
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden font-sans">
      <Toolbar />
      <div className="flex-1 relative flex flex-col bg-gray-50">
        <Court />
      </div>
      <Timeline />
    </div>
  );
}

export default App;
