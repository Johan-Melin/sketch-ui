import styles from './TopBar.module.css'
import PropTypes from 'prop-types';
//import HoverIcon from './topbar/HoverIcon'

export default function TopBar({onToolChange}) {
  const handleToolChange = (event) => {
    onToolChange(event.target.value);
  };
  return (
    <div className={styles.topBar}>
         <label>
        <input
          type="radio"
          value="select"
          name="radioGroup"
          onChange={handleToolChange}
        />
        Option 1
      </label>

      <label>
        <input
          type="radio"
          value="line"
          name="radioGroup"
          onChange={handleToolChange}
        />
        Option 2
      </label>
    </div>
  )
}

TopBar.propTypes = {
  onToolChange: PropTypes.func.isRequired,
};