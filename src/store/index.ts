import { create } from "zustand";
import { DrillState, Frame, DrillElement, Arrow } from "./types";

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useDrillStore = create<DrillState>((set, get) => ({
  title: "Untitled Drill",
  description: "",
  elements: [],
  frames: [{ id: generateId(), positions: {}, arrows: [] }], // Initialize arrows array
  currentFrameIndex: 0,
  isPlaying: false,

  setTitle: (title) => set({ title }),

  // ... (keep existing addElement logic) ...
  addElement: (type, team) => {
    // (Copy your existing addElement code here, same as before)
    // Just ensure you return the state correctly
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
      const currentFrame = state.frames[state.currentFrameIndex];
      const defaultPos = { x: 400, y: 200 };
      const updatedFrames = state.frames.map((f) => ({
        ...f,
        positions: { ...f.positions, [newElement.id]: defaultPos },
      }));
      return {
        elements: [...state.elements, newElement],
        frames: updatedFrames,
      };
    });
  },

  // NEW: Arrow Actions
  addArrow: () =>
    set((state) => {
      const newFrames = [...state.frames];
      const frame = newFrames[state.currentFrameIndex];
      const newArrow: Arrow = {
        id: generateId(),
        start: { x: 350, y: 200 },
        end: { x: 450, y: 200 },
      };
      frame.arrows = [...frame.arrows, newArrow];
      return { frames: newFrames };
    }),

  updateArrow: (id, handle, pos) =>
    set((state) => {
      const newFrames = [...state.frames];
      const frame = newFrames[state.currentFrameIndex];
      const arrow = frame.arrows.find((a) => a.id === id);
      if (arrow) {
        if (handle === "start") arrow.start = pos;
        else arrow.end = pos;
      }
      return { frames: newFrames };
    }),

  deleteArrow: (id) =>
    set((state) => {
      const newFrames = [...state.frames];
      const frame = newFrames[state.currentFrameIndex];
      frame.arrows = frame.arrows.filter((a) => a.id !== id);
      return { frames: newFrames };
    }),

  // ... (Keep existing updatePosition, addFrame, etc.) ...
  updatePosition: (elementId, pos) => {
    set((state) => {
      const newFrames = [...state.frames];
      const currentFrame = newFrames[state.currentFrameIndex];
      currentFrame.positions = { ...currentFrame.positions, [elementId]: pos };
      return { frames: newFrames };
    });
  },

  addFrame: () => {
    set((state) => {
      const previousFrame = state.frames[state.frames.length - 1];
      const newFrame: Frame = {
        id: generateId(),
        positions: { ...previousFrame.positions },
        arrows: [], // Start new frames with no arrows (usually preferred)
      };
      return {
        frames: [...state.frames, newFrame],
        currentFrameIndex: state.frames.length,
      };
    });
  },

  setCurrentFrame: (index) => set({ currentFrameIndex: index }),
  deleteFrame: (index) =>
    set((state) => {
      /* keep existing logic */ return state;
    }), // Simplify for brevity here
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
}));
