import styles from './Canvas.module.css';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Txt, Other, Input} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';
import screens from '../rectData.js';

export default function Canvas({selectedTool, showGrid}) {
  const gridSize = CONSTANTS.GRID_SIZE;
  const [currentScreen, setCurrentScreen] = useState(0);
  const [rectData, setRectData] = useState(screens[currentScreen]);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const coordRef = useRef(coordinates);
  const drawStartRef = useRef(drawStart);
  const [currentIndex, setCurrentIndex] = useState(-1);

  useEffect(() => {
    coordRef.current = coordinates;
  }, [coordinates]);

  useEffect(() => {
    drawStartRef.current = drawStart;
  }, [drawStart]);

  useEffect(() => {
    setRectData(screens[currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    if(selectedTool === "clear"){
      setRectData([]);
    }
    if(selectedTool === "undo"){
      undoAction();
    }
    const canvas = canvasRef.current;
    console.log(canvas.clientWidth, canvas.clientHeight)

    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;
    const [typeOfMove, typeOfUp, typeOfDown] = isTouchSupported 
      ? ['touchmove', 'touchend', 'touchstart']
      : ['mousemove', 'mouseup', 'mousedown'];

    const handleMove = (event) => {
      event.preventDefault();
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setCoordinates({ ...calcCoords(moveEvent) });
    };

    const handleDown = (event) => {
      event.preventDefault();
      setDrawing(true);
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setDrawStart({...calcCoords(moveEvent)})
    };
    
    const handleUp = () => {
      event.preventDefault();
      setDrawing(false);
      if (selectedTool){
        addRect();
      }
    };

    canvas.addEventListener(typeOfMove, handleMove, { passive: false });
    canvas.addEventListener(typeOfUp, handleUp, { passive: false });
    canvas.addEventListener(typeOfDown, handleDown, { passive: false });

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

  const undoAction = () => {
    if (currentIndex < 0) return;
    console.log(currentIndex);
    setRectData((prevState) => {
      const updatedText = prevState.text?.filter((item) => item.index !== currentIndex) || [];
      const updatedOther = prevState.other?.filter((item) => item.index !== currentIndex) || [];
      const updatedInput = prevState.input?.filter((item) => item.index !== currentIndex) || [];
    
      return {
        text: updatedText,
        other: updatedOther,
        input: updatedInput,
      };
    });
    setCurrentIndex(currentIndex -1);
  }

  const addRect = () => {
    console.log("add", currentIndex);
    setCurrentIndex(currentIndex + 1);
    setRectData(prevState => {
      const {x, y} = drawStartRef.current;
      return {
        ...prevState,
        [selectedTool]: [...prevState[selectedTool] || [], 
        { x, y, w: coordRef.current.x - x, h: coordRef.current.y - y, index: currentIndex }
      ]}
    });
  }

  const canvasClass = styles.canvas + (showGrid ? ' ' + styles.grid : '');

  const renderShape = () => {
    const {x, y} = drawStart;
    const shapeProps = {
      rectangles: [{ x, y, w: coordinates.x - x, h: coordinates.y - y }],
    };

    switch (selectedTool) {
      case 'text':
        return <Txt {...shapeProps} />;
      case 'other':
        return <Other {...shapeProps} />;
      case 'input':
        return <Input {...shapeProps} />;
      default:
        return null;
    }
  };

  return (
    <div className={canvasClass} ref={canvasRef}>
      <Txt rectangles={rectData.text || []} clickHandler={setCurrentScreen} />
      <Other rectangles={rectData.other || []} clickHandler={setCurrentScreen} />
      <Input rectangles={rectData.input || []} />
      {drawing && renderShape()}
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
  showGrid: PropTypes.bool
};