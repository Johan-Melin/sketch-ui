import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
import HoverIcon from './topbar/HoverIcon'
import { CONSTANTS } from './styles/constants.js';
import { useRef, useEffect } from 'react';

export default function TopBar({selectedTool, onToolChange, onShowGridChange}) {
  const topBarRef = useRef(null);

  //prevent refresh page on swipe
  useEffect(() => {
    let currentRef = topBarRef.current;

    if (currentRef) {
      const handleTouchStart = (event) => {
        event.preventDefault();
      };
  
      currentRef.addEventListener('touchmove', handleTouchStart);
  
      return () => {
        currentRef.removeEventListener('touchmove', handleTouchStart);
      };
    }
  }, []);

  const handleToolChange = (str) => {
    console.log(str);
    onToolChange(str);
  };
  
  return (
    <div className={styles.topBar} ref={topBarRef} style={{ height: `${CONSTANTS.TOPBAR_HEIGHT}px` }}>
      <div>
        <HoverIcon value="text" selectedTool={selectedTool} handleToolChange={handleToolChange} />
        <HoverIcon value="other" selectedTool={selectedTool} handleToolChange={handleToolChange} />
        <HoverIcon value="input" selectedTool={selectedTool} handleToolChange={handleToolChange} />
      </div>

      <div>
        <HoverIcon value="undo" handleToolChange={handleToolChange} />
        <HoverIcon value="clear" handleToolChange={handleToolChange} />
        <span onClick={onShowGridChange}>grid</span>
      </div>
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  onShowGridChange: PropTypes.func.isRequired,
  selectedTool: PropTypes.string
};