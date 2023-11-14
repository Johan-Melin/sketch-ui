import styles from './Canvas.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Rectangle, {Btn, Txt, Other} from './canvas/Rectangle';
import { CONSTANTS } from './styles/constants.js';

export default function Canvas({selectedTool}) {
  const topBarHeight = CONSTANTS.TOPBAR_HEIGHT;
  const gridSize = CONSTANTS.GRID_SIZE;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const [showGrid, ] = useState(true);
  const data = {
    rect: {
      btns: [
        {x: 1, y: 1, w: 3},
        {x: 5, y: 1, w: 3},
        {x: 9, y: 1, w: 3},
        {x: 18, y: 1, w: 1},
        {x: 1, y: 5, w: 1},
        {x: 18, y: 5, w: 1},
        {x: 17, y: 27, w: 2},
      ],
      texts: [
        {x: 1, y: 3, w: 8},
        {x: 3, y: 5, w: 8},
        {x: 3, y: 6, w: 4},
      ],
      input: [
        {x: 1, y: 24, w: 18},
      ],
    }
  }

  useEffect(() => {
    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;

    const handleMove = isTouchSupported ? handleTouchMove : handleMouseMove;
    const typeOfMove = isTouchSupported ? 'touchmove' : 'mousemove';
    document.addEventListener(typeOfMove, handleMove);

    return () => {
     document.removeEventListener(typeOfMove, handleMove);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setMouseCoords = (event) => {
      
    const coordX = Math.floor(event.clientX / gridSize);
    const coordY = Math.floor((event.clientY - topBarHeight) / gridSize);

    setCoordinates({ x: coordX, y: coordY });
  }

  const handleMouseMove = (event) => {
    setMouseCoords(event);
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0]; 
    setMouseCoords(touch);
  };

  const tool = selectedTool === 'line' ? styles.rect : styles.rect;
  const canvasClass = styles.canvas + (showGrid ? ' ' + styles.grid : '');
  selectedTool === 'line' && console.log(tool);

  return (
    <div className={canvasClass}>
      <Btn rectangles={data.rect.btns} />
      <Txt rectangles={data.rect.texts} />
      <Other rectangles={data.rect.input} />
      <Rectangle rectangles={[coordinates]}/>
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
};