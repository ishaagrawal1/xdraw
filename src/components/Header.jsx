/* eslint-disable react/prop-types */
import {
  ArrowsLeftRight,
  BoundingBox,
  Circle,
  Download,
  NavigationArrow,
  PencilLine,
  Trash,
} from "@phosphor-icons/react";
import { ACTIONS } from "../constants";

const Header = ({
  stageRef,
  setAction,
  action,
  setColor,
  color,
  setRectangles,
  setCircles,
  setArrows,
  setscribbles,
}) => {
  const exportImage = () => {
    const uri = stageRef.current.toDataURL();
    var link = document.createElement("a");
    const date = new Date().toISOString();
    link.download = `canvas/${date}.png`;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearCanvas = () => {
    setRectangles([]);
    setCircles([]);
    setArrows([]);
    setscribbles([]);
  };

  return (
    <header className="w-fit fixed top-3 flex justify-center items-center left-1/2 -translate-x-1/2 h-fit p-1.5 rounded-full backdrop-blur-lg bg-slate-200 bg-opacity-30 border border-slate-700 z-30">
      <div className="flex justify-center items-center gap-2 text-slate-900 dark:text-slate-100 z-50">
        <button
          onClick={() => setAction(ACTIONS.select)}
          className={
            action === ACTIONS.select
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <NavigationArrow className={`cursor-pointer`} size={22} />
        </button>
        <button
          onClick={() => setAction(ACTIONS.rectangle)}
          className={
            action === ACTIONS.rectangle
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <BoundingBox className={`cursor-pointer`} size={22} />
        </button>
        <button
          onClick={() => setAction(ACTIONS.circle)}
          className={
            action === ACTIONS.circle
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <Circle className={`cursor-pointer`} size={22} />
        </button>
        <button
          onClick={() => setAction(ACTIONS.arrow)}
          className={
            action === ACTIONS.arrow
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <ArrowsLeftRight className={`cursor-pointer`} size={22} />
        </button>
        <button
          onClick={() => setAction(ACTIONS.scribble)}
          className={
            action === ACTIONS.scribble
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <PencilLine className={`cursor-pointer`} size={22} />
        </button>
        <button
          onClick={clearCanvas}
          className={"bg-rose-200 text-rose-600 rounded-md p-2 "}
        >
          <Trash className={`cursor-pointer`} size={22} />
        </button>
        <div className="relative h-5 w-5 overflow-hidden rounded-md">
          <input
            type="color"
            className="p-0 h-5 w-5 scale-[2] block bg-white cursor-pointer rounded-full disabled:opacity-50 disabled:pointer-events-none "
            id="hs-color-input"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Choose your color"
          />
        </div>
        <button
          onClick={exportImage}
          className={
            action === ACTIONS.download
              ? "bg-pink-300 text-pink-600 rounded-full p-2 "
              : ""
          }
        >
          <Download className={`cursor-pointer`} size={22} />
        </button>
      </div>
    </header>
  );
};

export default Header;
