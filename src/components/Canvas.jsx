import styles from './Canvas.module.css';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rectangle, {Txt, Other, Input} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';
import screens from '../rectData.js';

export default function Canvas({selectedTool, showGrid}) {
  const gridSize = CONSTANTS.GRID_SIZE;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const [currentScreen, setCurrentScreen] = useState(0);
  const [rectData, setRectData] = useState(screens[currentScreen]);

  useEffect(() => {
    setRectData(screens[currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    const canvas = canvasRef.current;
    console.log(canvas.clientWidth, canvas.clientHeight)
    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;

    const handleMove = isTouchSupported ? handleTouchMove : handleMouseMove;
    const typeOfMove = isTouchSupported ? 'touchmove' : 'mousemove';
    canvas.addEventListener(typeOfMove, handleMove);

    const typeOfClick = isTouchSupported ? 'touchend' : 'click';
    canvas.addEventListener(typeOfClick, handleClick);

    return () => {
      canvas.removeEventListener(typeOfMove, handleMove);
      canvas.removeEventListener(typeOfClick, handleClick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTool]);

  const calcCoords = (event) => {
    const coordX = Math.floor(event.clientX / gridSize);
    const coordY = Math.floor((event.clientY - CONSTANTS.TOPBAR_HEIGHT) / gridSize);
    return {x: coordX, y: coordY}
  }

  const addRect = () => {
    /*setRectData(prevState => {
      return {
        ...prevState,
        [selectedTool]: [...prevState[selectedTool], {...calcCoords(event), w: 3}]
      }
    });*/
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
      <Txt rectangles={rectData.text || []} clickHandler={setCurrentScreen} />
      <Other rectangles={rectData.other || []} clickHandler={setCurrentScreen} />
      <Input rectangles={rectData.input || []} />
      <Rectangle rectangles={[coordinates]} color={color} />
      <p>{coordinates.y}</p>
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
  showGrid: PropTypes.bool
};