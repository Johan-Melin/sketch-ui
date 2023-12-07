import styles from './HoverIcon.module.css'
import PropTypes from 'prop-types';

export default function HoverIcon({selectedTool, value, handleToolChange}) {
  return (
      <span onClick={() => handleToolChange(value)} className={`${styles.hoverIcon} ${selectedTool === value ? styles.selected : ''}`}>{value}</span>
  )
}

HoverIcon.propTypes = {
  value: PropTypes.string.isRequired, 
  handleToolChange: PropTypes.func.isRequired,
  selectedTool: PropTypes.string
};