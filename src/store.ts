import { create } from "zustand";
import { DrillState, Frame, DrillElement } from "./types";

// Helper to generate IDs
const generateId = () => Math.random().toString(36).substr(2, 9);

export const useDrillStore = create<DrillState>((set, get) => ({
  elements: [],
  frames: [{ id: generateId(), positions: {} }], // Start with 1 empty frame
  currentFrameIndex: 0,
  isPlaying: false,

  addElement: (type, team) => {
    const newElement: DrillElement = {
      id: generateId(),
      type,
      team,
      label:
        type === "ball"
          ? ""
          : (team === "A" ? "A" : "B") +
            (get().elements.filter((e) => e.team === team).length + 1),
    };

    set((state) => {
      // Add the new element to the current frame (and all subsequent frames if you wanted to be fancy, but let's stick to simple)
      const currentFrame = state.frames[state.currentFrameIndex];
      const defaultPos = { x: 400, y: 200 }; // Center court

      const updatedFrames = state.frames.map((frame, index) => {
        // If we add a player, they should exist in all frames?
        // For simplicity, let's say they appear at default pos in ALL frames for now.
        return {
          ...frame,
          positions: { ...frame.positions, [newElement.id]: defaultPos },
        };
      });

      return {
        elements: [...state.elements, newElement],
        frames: updatedFrames,
      };
    });
  },

  updatePosition: (elementId, pos) => {
    set((state) => {
      const newFrames = [...state.frames];
      const currentFrame = newFrames[state.currentFrameIndex];

      // Update position only for THIS frame
      currentFrame.positions = {
        ...currentFrame.positions,
        [elementId]: pos,
      };

      return { frames: newFrames };
    });
  },

  addFrame: () => {
    set((state) => {
      // Duplicate the current frame's positions to the new frame (continuity)
      const previousFrame = state.frames[state.frames.length - 1];
      const newFrame: Frame = {
        id: generateId(),
        positions: { ...previousFrame.positions }, // Deep copy positions
      };
      return {
        frames: [...state.frames, newFrame],
        currentFrameIndex: state.frames.length, // Auto-switch to new frame
      };
    });
  },

  setCurrentFrame: (index) => set({ currentFrameIndex: index }),

  deleteFrame: (index) =>
    set((state) => {
      if (state.frames.length <= 1) return state; // Prevent deleting last frame
      const newFrames = state.frames.filter((_, i) => i !== index);
      return {
        frames: newFrames,
        currentFrameIndex: Math.min(
          state.currentFrameIndex,
          newFrames.length - 1
        ),
      };
    }),

  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
