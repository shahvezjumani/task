export type Team = "A" | "B";
export type ElementType = "player" | "ball";

export interface Position {
  x: number;
  y: number;
}

// The "Actor" (doesn't change over time)
export interface DrillElement {
  id: string;
  type: ElementType;
  team?: Team;
  label: string;
}

// The "Snapshot" (changes every frame)
export interface Frame {
  id: string;
  positions: Record<string, Position>; // Map<ElementID, Position>
  notes?: string;
}

export interface DrillState {
  elements: DrillElement[];
  frames: Frame[];
  currentFrameIndex: number;
  isPlaying: boolean;

  // Actions
  addElement: (type: ElementType, team?: Team) => void;
  updatePosition: (elementId: string, pos: Position) => void;
  addFrame: () => void;
  setCurrentFrame: (index: number) => void;
  deleteFrame: (index: number) => void;
  togglePlay: () => void;
}
