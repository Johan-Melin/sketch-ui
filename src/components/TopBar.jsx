import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
import HoverIcon from './topbar/HoverIcon'
import { CONSTANTS } from './styles/constants.js';
import { useRef, useEffect } from 'react';

export default function TopBar({selectedTool, onToolChange, onActionChange}) {
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
  
  return (
    <div className={styles.topBar} ref={topBarRef} style={{ height: `${CONSTANTS.TOPBAR_HEIGHT}px` }}>
      <div>
        <HoverIcon value="back" handleToolChange={onActionChange} />
        <HoverIcon value="text" selectedTool={selectedTool} handleToolChange={onToolChange} />
        <HoverIcon value="other" selectedTool={selectedTool} handleToolChange={onToolChange} />
        <HoverIcon value="input" selectedTool={selectedTool} handleToolChange={onToolChange} />
      </div>

      <div>
        <HoverIcon value="undo" handleToolChange={onActionChange} />
        <HoverIcon value="clear" handleToolChange={onActionChange} />
        <HoverIcon value="grid" handleToolChange={onActionChange} />
      </div>
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  onActionChange: PropTypes.func.isRequired,
  selectedTool: PropTypes.string
};