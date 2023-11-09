import styles from './Canvas.module.css';
import { useState, useEffect } from 'react';

export default function Canvas() {
  const topBarHeight = 48;
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

  return (
    <div className={styles.canvas}>
      <div
        className={styles.horizontalLine}
        style={{ top: coordinates.y }}
      ></div>
      <p>Mouse/Touch X: {coordinates.x}</p>
      <p>Mouse/Touch Y: {coordinates.y}</p>
    </div>
  );
}
