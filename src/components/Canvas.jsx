import styles from './Canvas.module.css';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rectangle, {Btn, Txt, Other} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';
import rect from '../rectData.js';

export default function Canvas({selectedTool}) {
  const root = document.documentElement;
  root.style.setProperty('--grid-size', CONSTANTS.GRID_SIZE+'px');
  const topBarHeight = CONSTANTS.TOPBAR_HEIGHT;
  const gridSize = CONSTANTS.GRID_SIZE;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showGrid, ] = useState(true);
  //const [drawing, setDrawing] = useState(false);
  //const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const [rectData, setRectData] = useState(rect);

  useEffect(() => {
    const canvasWidth = canvasRef.current.clientWidth;
    const canvasHeight = canvasRef.current.clientHeight;
    console.log(canvasWidth, canvasHeight)
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
    <div className={canvasClass} ref={canvasRef}>
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