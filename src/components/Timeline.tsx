import React, { useEffect } from "react";
import { useDrillStore } from "../store";
import { Plus, Trash2 } from "lucide-react";
import clsx from "clsx";

export const Timeline = () => {
  const {
    frames,
    currentFrameIndex,
    setCurrentFrame,
    addFrame,
    deleteFrame,
    isPlaying,
  } = useDrillStore();

  // Simple animation loop effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        const nextIndex = (currentFrameIndex + 1) % frames.length;
        setCurrentFrame(nextIndex);
      }, 1000); // 1 second per frame
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentFrameIndex, frames.length, setCurrentFrame]);

  return (
    <div className="fixed bottom-0 w-full h-48 bg-gray-100 border-t flex flex-col">
      <div className="p-2 border-b bg-gray-200 text-xs font-bold text-gray-600 flex justify-between items-center">
        <span>TIMELINE ({frames.length} steps)</span>
        <button
          onClick={addFrame}
          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-1 rounded text-xs"
        >
          <Plus size={12} /> <span>Add Step</span>
        </button>
      </div>

      <div className="flex-1 overflow-x-auto p-4 flex space-x-4 items-center">
        {frames.map((frame, idx) => (
          <div
            key={frame.id}
            onClick={() => setCurrentFrame(idx)}
            className={clsx(
              "relative flex-shrink-0 w-32 h-24 border-2 rounded-lg cursor-pointer bg-white transition-all shadow-sm flex items-center justify-center group",
              currentFrameIndex === idx
                ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                : "border-gray-300 hover:border-gray-400"
            )}
          >
            <span className="text-gray-400 font-bold text-xl">{idx + 1}</span>

            {/* Delete Button (visible on hover) */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteFrame(idx);
              }}
              className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500"
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}

        {/* Quick Add Button at end of list */}
        <button
          onClick={addFrame}
          className="flex-shrink-0 w-12 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-50 hover:border-gray-400"
        >
          <Plus />
        </button>
      </div>
    </div>
  );
};
