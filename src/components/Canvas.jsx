import styles from './Canvas.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rectangle, {Btn, Txt, Other} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';

export default function Canvas({selectedTool}) {
  const root = document.documentElement;
  root.style.setProperty('--grid-size', CONSTANTS.GRID_SIZE+'px');
  const topBarHeight = CONSTANTS.TOPBAR_HEIGHT;
  const gridSize = CONSTANTS.GRID_SIZE;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showGrid, ] = useState(true);

  const rect = {
    btn: [
      {x: 1, y: 1, w: 3},
      {x: 5, y: 1, w: 3},
      {x: 9, y: 1, w: 3},
      {x: 18, y: 1, w: 1},
      {x: 1, y: 5, w: 1},
      {x: 18, y: 5, w: 1},
      {x: 17, y: 27, w: 2},
    ],
    text: [
      {x: 1, y: 3, w: 8},
      {x: 3, y: 5, w: 8},
      {x: 3, y: 6, w: 4},
    ],
    other: [
      {x: 1, y: 24, w: 18},
    ],
  }
  const [rectData, setRectData] = useState(rect);

  useEffect(() => {
    console.log("useEffet");
    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;

    const handleMove = isTouchSupported ? handleTouchMove : handleMouseMove;
    const typeOfMove = isTouchSupported ? 'touchmove' : 'mousemove';
    document.addEventListener(typeOfMove, handleMove);

    const typeOfClick = isTouchSupported ? 'touchend' : 'click';
    document.addEventListener(typeOfClick, handleClick);

    return () => {
      document.removeEventListener(typeOfMove, handleMove);
      document.removeEventListener(typeOfClick, handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool]);

  const calcCoords = (event) => {
    const coordX = Math.floor(event.clientX / gridSize);
    const coordY = Math.floor((event.clientY - topBarHeight) / gridSize);
    return {x: coordX, y: coordY}
  }

  const addRect = (event) => {
    setRectData(prevState => {
      return {
        ...prevState,
        [selectedTool]: [...prevState[selectedTool], {...calcCoords(event), w: 3}]
      }
    });
  }

  const handleClick = (event) => {
    if (selectedTool) {
      addRect(event);
    }
  };

  const handleMouseMove = (event) => {
    setCoordinates({...calcCoords(event)});
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0]; 
    setCoordinates({...calcCoords(touch)});
  };

  const color = selectedTool === 'text' 
  ? '#777' 
  : selectedTool === 'button' 
    ? '#377' 
    : '#bbb'
  const canvasClass = styles.canvas + (showGrid ? ' ' + styles.grid : '');

  return (
    <div className={canvasClass}>
      <Btn rectangles={rectData.btn} />
      <Txt rectangles={rectData.text} />
      <Other rectangles={rectData.other} />
      <Rectangle rectangles={[coordinates]} color={color} />
      <p>{coordinates.x}</p>
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
};