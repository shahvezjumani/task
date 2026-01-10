Here is the raw Markdown content for your `README.md` file. You can copy this code block and paste it directly into a file named `README.md` in your project root.

````markdown
# Volleyball Drill Builder

A web-based tool for coaches to visually create, animate, and organize volleyball training drills. This project was built as a technical assignment to demonstrate interactive UI state management, clean architecture, and modern React patterns.

## 🛠️ Tech Stack

- **Core:** React 18, TypeScript, Vite
- **State Management:** Zustand (chosen for its transient update capabilities and lack of boilerplate)
- **Animation & Interactions:** Framer Motion
- **Styling:** Tailwind CSS (v3), clsx
- **Icons:** Lucide React

## 🚀 Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd volleyball-drill
   ```
````

2. **Install dependencies:**

```bash
npm install

```

3. **Run the development server:**

```bash
npm run dev

```

4. **Open the app:**
   Navigate to `http://localhost:5173` in your browser.

## 🏗️ Architecture & Engineering Decisions

### 1. Separation of "Identity" vs. "State"

A key architectural challenge in timeline-based applications is managing objects across different points in time.

- **The Problem:** If a player is "Player A" in Frame 1, they must be the same "Player A" in Frame 2, even if their position changes.
- **The Solution:** I normalized the data store into two distinct entities:
- `Elements`: Stores static properties (ID, Team, Label).
- `Frames`: Stores dynamic properties (Position X/Y) mapped by Element ID.
  This allows for O(1) lookups and simplifies "ghosting" or interpolation logic between frames.

### 2. Rendering Strategy: SVG vs. Canvas

I chose **SVG** over HTML/CSS or Canvas for the court rendering because:

- **Scalability:** SVG scales perfectly across different screen sizes without pixelation.
- **Event Handling:** Unlike Canvas, SVG elements are part of the DOM, allowing us to attach standard React event listeners (`onClick`, `onDrag`) directly to players and balls without complex ray-casting math.
- **Animation:** Framer Motion integrates seamlessly with SVG coordinate systems, providing hardware-accelerated transitions.

### 3. State Management (Zustand)

I selected **Zustand** over Redux or Context API because:

- **Performance:** It allows components to subscribe to specific slices of state, preventing unnecessary re-renders of the entire Timeline when only a Player moves.
- **Simplicity:** The action-based model (e.g., `updatePosition`, `addFrame`) keeps business logic outside of UI components, making the view layer "dumb" and easy to test.

### 4. Coordinate System

The court uses a fixed coordinate system (`800x400` units) inside the SVG `viewBox`. This ensures that regardless of the user's screen size or zoom level, the logic for "center court" or "net position" remains mathematically constant.

## 📂 Project Structure

```text
src/
├── components/
│   ├── Court.tsx       # Main visualization layer (SVG)
│   ├── Timeline.tsx    # Frame management and playback logic
│   └── Toolbar.tsx     # Tools for adding players/balls
├── store/
│   ├── index.ts        # Zustand store (Business Logic)
│   └── types.ts        # TypeScript interfaces (Data Models)
├── App.tsx             # Layout composition
└── main.tsx            # Entry point

```

## 🔮 Future Improvements

Given more time, I would implement:

- **Bezier Curve Arrows:** Automatically drawing paths based on player movement between frames.
- **Undo/Redo History:** Utilizing Zustand middleware to track state snapshots.
- **JSON Export:** Serializing the `DrillState` to allow coaches to share drills.

```

```
"# task" 
