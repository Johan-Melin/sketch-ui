import styles from './Canvas.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Canvas({selectedTool}) {
  const topBarHeight = 48;
  const gridSize = 20;
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
  }, []);

  const handleMouseMove = (event) => {
    setCoordinates({ x: event.clientX, y: Math.max(event.clientY, topBarHeight) });
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0]; 
    setCoordinates({ x: touch.clientX, y: Math.max(touch.clientY, topBarHeight) });
  };

  const tool = selectedTool === 'line' ? styles.rect : styles.rect;
  const canvasClass = styles.canvas + (showGrid ? ' ' + styles.grid : '');

  const renderRectangles = (rectangles, className) => {
    return rectangles.map((r, i) => (
      <div
        key={i}
        className={`${styles.rect} ${className}`}
        style={{ 
          left: r.x * gridSize, 
          top: 48 + r.y * gridSize, 
          width: r.w * gridSize, 
        }}
      ></div>
    ));
  };

  return (
    <div className={canvasClass}>
      {renderRectangles(data.rect.btns, styles.btn)}
      {renderRectangles(data.rect.texts, styles.txt)}
      {renderRectangles(data.rect.input, styles.input)}
      <div
        className={tool}
        style={{ 
          top: coordinates.y - coordinates.y % gridSize + (coordinates.y % 20 >= 8 ? 8 : -gridSize + 8), 
          left: coordinates.x - coordinates.x % gridSize
        }}
      ></div>
      {/*<p>Mouse/Touch X: {coordinates.x - coordinates.x % gridSize} {coordinates.x} </p>
      <p>Mouse/Touch Y: {coordinates.y - coordinates.y % gridSize} {coordinates.y} </p>
      <p>Tool: {selectedTool}</p>*/}
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
};