import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useDrillStore } from "../store";
import { DrillElement, Arrow } from "../store/types";

const COURT_WIDTH = 800;
const COURT_HEIGHT = 400;

// --- Sub-Component: Player/Ball Renderer ---
const DraggableElement = ({
  element,
  pos,
  onDragEnd,
}: {
  element: DrillElement;
  pos: { x: number; y: number };
  onDragEnd: (id: string, pos: { x: number; y: number }) => void;
}) => {
  const isBall = element.type === "ball";
  const color = isBall
    ? "fill-yellow-400"
    : element.team === "A"
    ? "fill-red-500"
    : "fill-blue-600";

  return (
    <motion.g
      drag
      dragMomentum={false}
      // Bind the SVG position to the state
      animate={{ x: pos.x, y: pos.y }}
      // Smooth transition when switching frames
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onDragEnd={(_, info) =>
        onDragEnd(element.id, {
          x: pos.x + info.offset.x,
          y: pos.y + info.offset.y,
        })
      }
      className="cursor-pointer hover:opacity-90"
    >
      <circle
        r={isBall ? 10 : 16}
        className={`${color} stroke-white stroke-2 drop-shadow-md`}
      />
      {!isBall && (
        <text
          y={5}
          textAnchor="middle"
          fontSize="11"
          fill="white"
          fontWeight="bold"
          className="pointer-events-none select-none"
        >
          {element.label}
        </text>
      )}
    </motion.g>
  );
};

// --- Sub-Component: Arrow Renderer ---
const ArrowRenderer = ({ arrow }: { arrow: Arrow }) => {
  const { updateArrow, deleteArrow } = useDrillStore();

  return (
    <g>
      {/* The Arrow Line */}
      <line
        x1={arrow.start.x}
        y1={arrow.start.y}
        x2={arrow.end.x}
        y2={arrow.end.y}
        stroke="black"
        strokeWidth="2"
        markerEnd="url(#arrowhead)"
      />

      {/* Start Handle (Green) */}
      <motion.circle
        drag
        dragMomentum={false}
        cx={arrow.start.x}
        cy={arrow.start.y}
        r={5}
        fill="#10B981" // Green-500
        className="cursor-ew-resize"
        onDrag={(_, info) =>
          updateArrow(arrow.id, "start", {
            x: arrow.start.x + info.delta.x,
            y: arrow.start.y + info.delta.y,
          })
        }
      />

      {/* End Handle (Red) */}
      <motion.circle
        drag
        dragMomentum={false}
        cx={arrow.end.x}
        cy={arrow.end.y}
        r={5}
        fill="#EF4444" // Red-500
        className="cursor-move"
        onDrag={(_, info) =>
          updateArrow(arrow.id, "end", {
            x: arrow.end.x + info.delta.x,
            y: arrow.end.y + info.delta.y,
          })
        }
      />

      {/* Delete Handle (Middle Gray) */}
      <circle
        cx={(arrow.start.x + arrow.end.x) / 2}
        cy={(arrow.start.y + arrow.end.y) / 2}
        r={6}
        fill="gray"
        className="cursor-pointer hover:fill-red-600 opacity-50 hover:opacity-100"
        onClick={(e) => {
          e.stopPropagation();
          deleteArrow(arrow.id);
        }}
      />
    </g>
  );
};

// --- Main Component ---
export const Court = () => {
  const { elements, frames, currentFrameIndex, updatePosition } =
    useDrillStore();
  const svgRef = useRef<SVGSVGElement>(null);

  // Safety check: Ensure the frame exists before rendering to prevent crash
  const currentFrame = frames[currentFrameIndex];
  if (!currentFrame) {
    return (
      <div className="w-full text-center p-10 text-gray-500">
        Loading Frame...
      </div>
    );
  }

  return (
    <div className="w-full flex justify-center p-4 bg-gray-50 border-b overflow-hidden">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${COURT_WIDTH} ${COURT_HEIGHT}`}
        className="w-full max-w-4xl bg-orange-100 border-2 border-orange-400 shadow-xl rounded select-none"
      >
        {/* 1. Definitions (Arrowhead Marker) */}
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="black" />
          </marker>
        </defs>

        {/* 2. Court Markings (Background) */}
        <g className="opacity-50 pointer-events-none">
          <rect
            width={COURT_WIDTH}
            height={COURT_HEIGHT}
            fill="none"
            stroke="white"
            strokeWidth="4"
          />
          <line
            x1={COURT_WIDTH / 2}
            y1={0}
            x2={COURT_WIDTH / 2}
            y2={COURT_HEIGHT}
            stroke="white"
            strokeWidth="4"
          />
          {/* Attack Lines */}
          <line
            x1={COURT_WIDTH / 2 - 100}
            y1={0}
            x2={COURT_WIDTH / 2 - 100}
            y2={COURT_HEIGHT}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
          <line
            x1={COURT_WIDTH / 2 + 100}
            y1={0}
            x2={COURT_WIDTH / 2 + 100}
            y2={COURT_HEIGHT}
            stroke="white"
            strokeWidth="2"
            strokeDasharray="5,5"
          />
        </g>

        {/* 3. Render Arrows (Check if array exists to be safe) */}
        {currentFrame.arrows &&
          currentFrame.arrows.map((arrow) => (
            <ArrowRenderer key={arrow.id} arrow={arrow} />
          ))}

        {/* 4. Render Players & Ball */}
        {elements.map((el) => {
          const pos = currentFrame.positions[el.id] || { x: 0, y: 0 };
          return (
            <DraggableElement
              key={el.id}
              element={el}
              pos={pos}
              onDragEnd={(id, finalPos) => updatePosition(id, finalPos)}
            />
          );
        })}
      </svg>
    </div>
  );
};
