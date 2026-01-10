export type Team = "A" | "B";
export type ElementType = "player" | "ball";

// NEW: Arrow Type
export interface Arrow {
  id: string;
  fromId?: string; // Optional: if linked to a player
  start: { x: number; y: number };
  end: { x: number; y: number };
}

export interface DrillElement {
  id: string;
  type: ElementType;
  team?: Team;
  label: string;
}

export interface Frame {
  id: string;
  positions: Record<string, { x: number; y: number }>;
  arrows: Arrow[]; // NEW: Each frame has its own arrows
  notes?: string;
}

export interface DrillState {
  title: string; // NEW: Session Title
  description: string; // NEW: Session Description
  elements: DrillElement[];
  frames: Frame[];
  currentFrameIndex: number;
  isPlaying: boolean;

  // Actions
  setTitle: (title: string) => void; // NEW
  addElement: (type: ElementType, team?: Team) => void;
  addArrow: () => void; // NEW
  updateArrow: (
    arrowId: string,
    startOrEnd: "start" | "end",
    pos: { x: number; y: number }
  ) => void; // NEW
  deleteArrow: (arrowId: string) => void; // NEW
  updatePosition: (elementId: string, pos: { x: number; y: number }) => void;
  addFrame: () => void;
  setCurrentFrame: (index: number) => void;
  deleteFrame: (index: number) => void;
  togglePlay: () => void;
}
