import styles from './Canvas.module.css';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Txt, Other, Input} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';
import screens from '../rectData.js';

export default function Canvas({selectedTool, selectedAction, setSelectedAction}) {
  const gridSize = CONSTANTS.GRID_SIZE;
  const currentProject = 0;
  const [currentScreen, setCurrentScreen] = useState(0);
  const [rectData, setRectData] = useState(screens[currentProject].rect[currentScreen]);
  const [showGrid, setShowGrid] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [drawing, setDrawing] = useState(false);
  const [drawStart, setDrawStart] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const coordRef = useRef(coordinates);
  const drawStartRef = useRef(drawStart);
  const toolRef = useRef(selectedTool);
  const indexRef = useRef(currentIndex);

  useEffect(() => {
    coordRef.current = coordinates;
    drawStartRef.current = drawStart;
    toolRef.current = selectedTool;
    indexRef.current = currentIndex;
  }, [coordinates, drawStart, selectedTool, currentIndex]);

  useEffect(() => {
    setRectData(screens[currentProject].rect[currentScreen]);
  }, [currentScreen]);

  useEffect(() => {
    if(selectedAction === "clear"){
      setRectData([]);
    }
    if(selectedAction === "undo"){
      undoAction();
    }
    if(selectedAction === "toggleGrid"){
      setShowGrid(grid => !grid);
    }
    setSelectedAction(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedAction]);

  useEffect(() => {
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
      setDrawing(true);
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setDrawStart({...calcCoords(moveEvent)})
    };
    
    const handleUp = () => {
      setDrawing(false);
      if (toolRef.current){
        addRect();
      }
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
  }, []);

  const calcCoords = (event) => {
    const coordX = Math.floor((event.clientX + gridSize / 2) / gridSize);
    const coordY = Math.floor((event.clientY + gridSize / 2 - CONSTANTS.TOPBAR_HEIGHT) / gridSize);
    return {x: coordX, y: coordY}
  }

  const undoAction = () => {
    console.log(currentIndex, indexRef.current);
    if (currentIndex < 0) return;
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
    setCurrentIndex(prevState => prevState -1);
  }

  const addRect = () => {
    const tool = toolRef.current;
    const newIndex = indexRef.current +1;
    setCurrentIndex(newIndex);
    console.log(currentIndex, indexRef.current);
    setRectData(prevState => {
      const {x, y} = drawStartRef.current;
      return {
        ...prevState,
        [tool]: [...prevState[tool] || [], 
        { x, y, w: coordRef.current.x - x, h: coordRef.current.y - y, index: newIndex }
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
  selectedAction: PropTypes.string,
  setSelectedAction: PropTypes.func,
};