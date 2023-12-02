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
  const [drawStart, setDrawStart] = useState({ x: 2, y: 2 });
  const canvasRef = useRef(null);

  const [currentScreen, setCurrentScreen] = useState(0);
  const [rectData, setRectData] = useState(screens[currentScreen]);

  useEffect(() => {
    setRectData(screens[currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    if(selectedTool === "clear"){
      setRectData([]);
    }
    const canvas = canvasRef.current;
    console.log(canvas.clientWidth, canvas.clientHeight)

    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;
    const [typeOfMove, typeOfUp, typeOfDown] = isTouchSupported 
      ? ['touchmove', 'touchend', 'touchstart']
      : ['mousemove', 'mouseup', 'mousedown'];

    const handleMove = (event) => {
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setCoordinates({ ...calcCoords(moveEvent) });
    };

    const handleDown = (event) => {
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setDrawStart({...calcCoords(moveEvent)})
      console.log("down");
    };
    
    const handleUp = (event) => {
      console.log("up");
    };

    canvas.addEventListener(typeOfMove, handleMove);
    canvas.addEventListener(typeOfUp, handleUp);
    canvas.addEventListener(typeOfDown, handleDown);

    return () => {
      canvas.removeEventListener(typeOfMove, handleMove);
      canvas.removeEventListener(typeOfUp, handleUp);
      canvas.removeEventListener(typeOfDown, handleDown);
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
      <Rectangle rectangles={[{x: drawStart.x, y: drawStart.y, w: coordinates.x-drawStart.x, h: coordinates.y-drawStart.y}]} color={color} />
      <p>{drawStart.y}</p>
      <p>{coordinates.y}</p>
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
  showGrid: PropTypes.bool
};