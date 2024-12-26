import "./App.css";
import { useRef, useState } from "react";
import { ACTIONS } from "./constants";
import Header from "./components/Header";
import Canvas from "./components/Canvas";

function App() {
  const stageRef = useRef(null);
  const [color, setColor] = useState("#06b6d4");
  const [action, setAction] = useState(ACTIONS.select);
  const [rectangles, setRectangles] = useState([]);
  const [circles, setCircles] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [scribbles, setscribbles] = useState([]);

  const isPainting = useRef();
  const currentShapeId = useRef();
  const transformerRef = useRef();

  const isDraggable = action === ACTIONS.select;

  return (
    <>
      <Header
        stageRef={stageRef}
        setAction={setAction}
        action={action}
        setColor={setColor}
        color={color}
        setArrows={setArrows}
        setCircles={setCircles}
        setRectangles={setRectangles}
        setscribbles={setscribbles}
      />
      {rectangles.length === 0 &&
        circles.length === 0 &&
        arrows.length === 0 &&
        scribbles.length === 0 && (
          <>
            <div className="absolute font4 select-none font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] w-screen text-center -z-10">
              iDraw
              <p className="text-base -mt-5 md:-mt-16">
                Draw and paint on the canvas
              </p>
            </div>
            <p className="absolute bottom-0 text-xs text-center -z-10 w-screen font3">
              By Eisha
            </p>
          </>
        )}
      <Canvas
        stageRef={stageRef}
        transformerRef={transformerRef}
        currentShapeId={currentShapeId}
        isPainting={isPainting}
        isDraggable={isDraggable}
        action={action}
        color={color}
        rectangles={rectangles}
        circles={circles}
        arrows={arrows}
        scribbles={scribbles}
        setRectangles={setRectangles}
        setCircles={setCircles}
        setArrows={setArrows}
        setscribbles={setscribbles}
      />
    </>
  );
}

export default App;
