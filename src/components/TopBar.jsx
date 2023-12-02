import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
import HoverIcon from './topbar/HoverIcon'
import { CONSTANTS } from './styles/constants.js';

export default function TopBar({onToolChange, onShowGridChange}) {
  const handleToolChange = (event) => {
    onToolChange(event.target.value);
  };
  
  return (
    <div className={styles.topBar} style={{ height: `${CONSTANTS.TOPBAR_HEIGHT}px` }}>
      <div>
        <HoverIcon value="new" handleToolChange={handleToolChange} />
        <HoverIcon value="text" handleToolChange={handleToolChange} />
        <HoverIcon value="other" handleToolChange={handleToolChange} />
        <HoverIcon value="input" handleToolChange={handleToolChange} />
      </div>

      <span onClick={onShowGridChange}>Grid</span>
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  onShowGridChange: PropTypes.func.isRequired,
};