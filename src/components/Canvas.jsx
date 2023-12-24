import styles from './Canvas.module.css';
import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {Txt, Other, Input} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';
import screens from '../rectData.js';

export default function Canvas({selectedTool, selectedAction, setSelectedAction, setSelectedScreen, selectedProject, selectedScreen}) {
  const gridSize = CONSTANTS.GRID_SIZE;
  const project = screens.find((item) => item.id === selectedProject);
  
  const [rectData, setRectData] = useState(project.rect[selectedScreen]);
  const [canvasState, setCanvasState] = useState({
    showGrid: false,
    drawing: false,
    currentIndex: -1,
    coordinates: { x: 0, y: 0 },
    drawStart: { x: 0, y: 0 },
  })

  const { showGrid, drawing, currentIndex, coordinates, drawStart } = canvasState;

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
    setRectData(project.rect[selectedScreen]);
  }, [selectedScreen, project.rect]);

  useEffect(() => {
    if(selectedAction === "back"){
      setSelectedScreen(null);
    }
    if(selectedAction === "clear"){
      setRectData([]);
    }
    if(selectedAction === "undo"){
      undoAction();
    }
    if(selectedAction === "grid") {
      setCanvasState(prevState => ({...prevState, showGrid: !prevState.showGrid }))
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
      setCanvasState(prevState => ({...prevState, coordinates: calcCoords(moveEvent) }))
    };

    const handleDown = (event) => {
      setCanvasState(prevState => ({...prevState, drawing: true }))
      const moveEvent = isTouchSupported ? event.touches[0] : event;
      setCanvasState(prevState => ({...prevState, drawStart: calcCoords(moveEvent) }))
    };
    
    const handleUp = () => {
      setCanvasState(prevState => ({...prevState, drawing: false }))
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
    setCanvasState(prevState => ({...prevState, currentIndex: prevState.currentIndex -1 }))
  }

  const addRect = () => {
    const tool = toolRef.current;
    const newIndex = indexRef.current +1;
    setCanvasState(prevState => ({...prevState, currentIndex: newIndex }))
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
      <Txt rectangles={rectData.text || []} clickHandler={setSelectedScreen} />
      <Other rectangles={rectData.other || []} clickHandler={setSelectedScreen} />
      <Input rectangles={rectData.input || []} />
      {drawing && renderShape()}
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
  selectedAction: PropTypes.string,
  setSelectedAction: PropTypes.func,
  setSelectedScreen: PropTypes.func,
  selectedProject: PropTypes.string,
  selectedScreen: PropTypes.number,
};