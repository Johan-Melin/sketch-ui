import styles from './Canvas.module.css';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function Canvas({selectedTool}) {
  const topBarHeight = 48;
  const gridSize = 20;
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const isTouchSupported = 'ontouchstart' in window || navigator.maxTouchPoints;

    if (isTouchSupported) {
      document.addEventListener('touchmove', handleTouchMove);
    } else {
      document.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (isTouchSupported) {
        document.removeEventListener('touchmove', handleTouchMove);
      } else {
        document.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleMouseMove = (event) => {
    setCoordinates({ x: event.clientX, y: Math.max(event.clientY, topBarHeight) });
  };

  const handleTouchMove = (event) => {
    const touch = event.touches[0]; 
    setCoordinates({ x: touch.clientX, y: Math.max(touch.clientY, topBarHeight) });
  };

  const canvasClass = selectedTool === 'line' ? styles.horizontalLine : ''

  return (
    <div className={styles.canvas}>
      <div
        className={canvasClass}
        style={{ top: 8 + coordinates.y - coordinates.y % gridSize }}
      ></div>
      <p>Mouse/Touch X: {coordinates.x}</p>
      <p>Mouse/Touch Y: {coordinates.y}</p>
      <p>Tool: {selectedTool}</p>
    </div>
  );
}

Canvas.propTypes = {
  selectedTool: PropTypes.string,
};