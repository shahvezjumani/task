import React from "react";
import { useDrillStore } from "../store";
import { PlusCircle, Circle, Play, Pause, MoveRight } from "lucide-react";

export const Toolbar = () => {
  const { addElement, addArrow, title, setTitle, isPlaying, togglePlay } =
    useDrillStore();

  return (
    <div className="h-16 bg-white border-b flex items-center px-6 justify-between shadow-sm z-10 relative">
      {/* Left: Title Input */}
      <div className="flex items-center">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="font-bold text-lg border-b-2 border-transparent hover:border-gray-300 focus:border-blue-500 outline-none mr-8 py-1 transition-colors w-64"
          placeholder="Drill Title"
        />
      </div>

      {/* Middle: Action Buttons */}
      <div className="flex space-x-3">
        <div className="flex bg-gray-100 p-1 rounded-lg space-x-1">
          <button
            onClick={() => addElement("player", "A")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white text-red-700 rounded shadow-sm hover:bg-red-50 border border-transparent hover:border-red-200 transition text-sm font-medium"
          >
            <PlusCircle size={16} className="text-red-500" />{" "}
            <span>Team A</span>
          </button>
          <button
            onClick={() => addElement("player", "B")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white text-blue-700 rounded shadow-sm hover:bg-blue-50 border border-transparent hover:border-blue-200 transition text-sm font-medium"
          >
            <PlusCircle size={16} className="text-blue-500" />{" "}
            <span>Team B</span>
          </button>
        </div>

        <div className="flex bg-gray-100 p-1 rounded-lg space-x-1">
          <button
            onClick={() => addElement("ball")}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white text-yellow-700 rounded shadow-sm hover:bg-yellow-50 border border-transparent hover:border-yellow-200 transition text-sm font-medium"
          >
            <Circle size={16} className="text-yellow-500 fill-yellow-500" />{" "}
            <span>Ball</span>
          </button>
          <button
            onClick={addArrow}
            className="flex items-center space-x-2 px-3 py-1.5 bg-white text-gray-700 rounded shadow-sm hover:bg-gray-50 border border-transparent hover:border-gray-200 transition text-sm font-medium"
          >
            <MoveRight size={16} /> <span>Arrow</span>
          </button>
        </div>
      </div>

      {/* Right: Playback Controls */}
      <div>
        <button
          onClick={togglePlay}
          className={`flex items-center space-x-2 px-6 py-2 rounded-full font-bold transition shadow-md ${
            isPlaying
              ? "bg-amber-100 text-amber-800 hover:bg-amber-200"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {isPlaying ? (
            <>
              <Pause size={18} /> <span>Pause</span>
            </>
          ) : (
            <>
              <Play size={18} /> <span>Play Animation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
