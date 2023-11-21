import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
//import HoverIcon from './topbar/HoverIcon'
import { CONSTANTS } from './styles/constants.js';

export default function TopBar({onToolChange, onShowGridChange}) {
  const handleToolChange = (event) => {
    onToolChange(event.target.value);
  };
  
  return (
    <div className={styles.topBar} style={{ height: `${CONSTANTS.TOPBAR_HEIGHT}px` }}>
      <div>
        <label>
          <input
            type="radio"
            value="text"
            name="radioGroup"
            onChange={handleToolChange}
          />
          Text
        </label>

        <label>
          <input
            type="radio"
            value="btn"
            name="radioGroup"
            onChange={handleToolChange}
          />
          Button
        </label>

        <label>
          <input
            type="radio"
            value="other"
            name="radioGroup"
            onChange={handleToolChange}
          />
          Other
        </label>

        <label>
          <input
            type="radio"
            value="input"
            name="radioGroup"
            onChange={handleToolChange}
          />
          Input
        </label>
      </div>

      <span onClick={onShowGridChange}>Grid</span>
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
  onShowGridChange: PropTypes.func.isRequired,
};