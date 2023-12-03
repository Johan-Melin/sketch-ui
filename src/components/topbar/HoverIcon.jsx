//import styles from './HoverIcon.module.css'
import PropTypes from 'prop-types';

export default function HoverIcon({value, handleToolChange}) {
  return (
    <label> {/* className={styles.hoverIcon}*/}
      <input
        type="radio"
        value={value}
        name="radioGroup"
        onChange={handleToolChange}
      />
      {value}
  </label>
  )
}

HoverIcon.propTypes = {
  value: PropTypes.string.isRequired, 
  handleToolChange: PropTypes.func.isRequired
};