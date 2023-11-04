import styles from './HoverIcon.module.css'
import PropTypes from 'prop-types';

export default function HoverIcon({text}) {
  return (
    <div className={styles.hoverIcon}>
        {text}
    </div>
  )
}

HoverIcon.propTypes = {
    text: PropTypes.string.isRequired, 
};