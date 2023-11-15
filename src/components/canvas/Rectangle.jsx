import styles from './Rectangle.module.css';
import { CONSTANTS } from '../styles/constants.js';

const topBarHeight = CONSTANTS.TOPBAR_HEIGHT;
const gridSize = CONSTANTS.GRID_SIZE;
import PropTypes from 'prop-types';

const Rectangle = ({ rectangles, style, color }) => {
  return rectangles.map((r, i) => (
    <div
      key={i}
      className={`${styles.rect} ${style}`}
      style={{ 
        left: r.x * gridSize, 
        top: topBarHeight + r.y * gridSize, 
        width: r.w * gridSize || 20, 
        backgroundColor: color
      }}
    ></div>
  ));
};

export const Btn = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.btn} />
export const Txt = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.txt}/>
export const Other = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.other}/>

const RectPropTypes = {
    rectangles: PropTypes.arrayOf(
        PropTypes.shape({
            x: PropTypes.number.isRequired,
            y: PropTypes.number.isRequired,
            w: PropTypes.number,
            h: PropTypes.number,
        })
    ).isRequired,
};

Btn.propTypes = RectPropTypes;
Txt.propTypes = RectPropTypes;
Other.propTypes = RectPropTypes;

export default Rectangle;