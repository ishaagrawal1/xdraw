/* eslint-disable react/prop-types */
import {
  Layer,
  Rect,
  Stage,
  Circle as KonvaCircle,
  Arrow,
  Line,
  Transformer,
} from "react-konva";
import { ACTIONS } from "../constants";

const Canvas = ({
  isDraggable,
  transformerRef,
  action,
  color,
  stageRef,
  currentShapeId,
  isPainting,
  rectangles,
  circles,
  arrows,
  scribbles,
  setRectangles,
  setCircles,
  setArrows,
  setscribbles,
}) => {
  const onPointerDown = () => {
    if (action === ACTIONS.select) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();
    const id = Math.floor(Math.random() * 10000000);

    currentShapeId.current = id;
    isPainting.current = true;

    switch (action) {
      case ACTIONS.rectangle:
        setRectangles((rectangles) => [
          ...rectangles,
          { id, x, y, width: 20, height: 20, color },
        ]);
        break;
      case ACTIONS.circle:
        setCircles((circles) => [...circles, { id, x, y, radius: 20, color }]);
        break;
      case ACTIONS.arrow:
        setArrows((arrows) => [
          ...arrows,
          { id, points: [x, y, x + 20, y + 20], color },
        ]);
        break;
      case ACTIONS.scribble:
        setscribbles((scribble) => [
          ...scribble,
          { id, points: [x, y], color },
        ]);
        break;
    }
  };

  const onPointerMove = () => {
    if (action === ACTIONS.select || !isPainting.current) return;

    const stage = stageRef.current;
    const { x, y } = stage.getPointerPosition();

    switch (action) {
      case ACTIONS.rectangle:
        setRectangles((rectangles) =>
          rectangles.map((rectangle) => {
            if (rectangle.id === currentShapeId.current) {
              return {
                ...rectangle,
                width: x - rectangle.x,
                height: y - rectangle.y,
              };
            }
            return rectangle;
          })
        );
        break;
      case ACTIONS.circle:
        setCircles((circles) =>
          circles.map((circle) => {
            if (circle.id === currentShapeId.current) {
              return {
                ...circle,
                radius: ((y - circle.y) ** 2 + (x - circle.x) ** 2) ** 0.5,
              };
            }
            return circle;
          })
        );
        break;
      case ACTIONS.arrow:
        setArrows((arrow) =>
          arrow.map((arr) => {
            if (arr.id === currentShapeId.current) {
              return {
                ...arr,
                points: [arr.points[0], arr.points[1], x, y],
              };
            }
            return arr;
          })
        );
        break;
      case ACTIONS.scribble:
        setscribbles((scribbles) =>
          scribbles.map((scribble) => {
            if (scribble.id === currentShapeId.current) {
              return {
                ...scribble,
                points: [...scribble.points, x, y],
              };
            }
            return scribble;
          })
        );
        break;
    }
  };

  const onPointerUp = () => {
    isPainting.current = false;
  };

  const onClick = (e) => {
    if (action !== ACTIONS.select) return;

    const target = e.currentTarget;
    transformerRef.current.nodes([target]);
  };

  return (
    <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={
        (action === ACTIONS.select && "cursor-grab") ||
        (action === ACTIONS.scribble && "cursor-pointer") ||
        (action === ACTIONS.arrow && "cursor-pointer") ||
        (action === ACTIONS.circle && "cursor-w-resize") ||
        (action === ACTIONS.rectangle && "cursor-se-resize")
      }
    >
      <Layer>
        <Rect
          x={0}
          y={0}
          width={window.innerWidth}
          height={window.innerHeight}
          fill={
            rectangles.length === 0 &&
            circles.length === 0 &&
            arrows.length === 0 &&
            scribbles.length === 0
              ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "#0f172abc"
                : "#ffffffbc"
              : window.matchMedia("(prefers-color-scheme: dark)").matches
              ? "#0f172abc"
              : "#ffffffbc"
          }
          id="bg"
          onClick={() => transformerRef.current.nodes([])}
          onTap={() => transformerRef.current.nodes([])}
        />

        {rectangles.map((rectangle, index) => (
          <Rect
            x={rectangle.x}
            y={rectangle.y}
            width={rectangle.width}
            height={rectangle.height}
            fill={rectangle.color}
            stroke={rectangle.color}
            strokeWidth={2}
            key={index}
            draggable={isDraggable}
            onClick={onClick}
            onTap={onClick}
          />
        ))}
        {circles.map((circle, index) => (
          <KonvaCircle
            key={index}
            radius={circle.radius}
            x={circle.x}
            y={circle.y}
            stroke={circle.color}
            strokeWidth={2}
            fill={circle.color}
            draggable={isDraggable}
            onClick={onClick}
            onTap={onClick}
          />
        ))}
        {arrows.map((arrow, index) => (
          <Arrow
            key={index}
            points={arrow.points}
            stroke={arrow.color}
            strokeWidth={4}
            fill={arrow.color}
            draggable={isDraggable}
            onClick={onClick}
            onTap={onClick}
          />
        ))}
        {scribbles.map((scribble, index) => (
          <Line
            key={index}
            lineCap="round"
            lineJoin="round"
            points={scribble.points}
            stroke={scribble.color}
            strokeWidth={4}
            fill={scribble.color}
            draggable={isDraggable}
            onClick={onClick}
            onTap={onClick}
          />
        ))}
        <Transformer ref={transformerRef} />
      </Layer>
    </Stage>
  );
};

export default Canvas;
