import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
import HoverIcon from './topbar/HoverIcon'
import { CONSTANTS } from './styles/constants.js';
import { useRef } from 'react';

export default function TopBar({onToolChange, /*onShowGridChange*/}) {
  const topBar = useRef(null);
  const handleTouchStart = (event) => {
    event.preventDefault();
  };
  
  // Prevent refresh page with slide
  topBar.current.addEventListener('touchstart', handleTouchStart, { passive: false });

  const handleToolChange = (event) => {
    onToolChange(event.target.value);
  };
  
  return (
    <div className={styles.topBar}  ref={topBar} style={{ height: `${CONSTANTS.TOPBAR_HEIGHT}px` }}>
      <div>
        <HoverIcon value="text" handleToolChange={handleToolChange} />
        <HoverIcon value="other" handleToolChange={handleToolChange} />
        <HoverIcon value="input" handleToolChange={handleToolChange} />
      </div>

      <div>
        <HoverIcon value="undo" handleToolChange={handleToolChange} />
        <HoverIcon value="clear" handleToolChange={handleToolChange} />
      </div>
      {/*<span onClick={onShowGridChange}>Grid</span>*/}
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  onShowGridChange: PropTypes.func.isRequired,
};