import styles from './Rectangle.module.css';
import { CONSTANTS } from '../styles/constants.js';

const topBarHeight = CONSTANTS.TOPBAR_HEIGHT;
const gridSize = CONSTANTS.GRID_SIZE;
import PropTypes from 'prop-types';

const loremIpsumText = `lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`.split(' ');

const Rectangle = ({ rectangles, style, color, displayLorem }) => {
  return rectangles.map((r, i) => (
    <div
      key={i}
      className={`${styles.rect} ${style}`}
      style={{ 
        left: r.x * gridSize, 
        top: topBarHeight + r.y * gridSize, 
        width: r.w * gridSize || 20, 
        height: r.h * gridSize || 20, 
        fontSize: r.h * gridSize * 0.8 || 20,
        backgroundColor: color
      }}
    >{displayLorem  && i < loremIpsumText.length && `${loremIpsumText.slice(i).join(' ')}`}</div>
  ));
};

export const Btn = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.btn} />
export const Txt = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.txt} displayLorem ></Rectangle>
export const Other = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.other}/>
export const Input = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.input}/>

const RectPropTypes = {
  rectangles: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number,
    })
  ).isRequired,
};


Btn.propTypes = RectPropTypes;
Txt.propTypes = RectPropTypes,
Other.propTypes = RectPropTypes;
Input.propTypes = RectPropTypes;

export default Rectangle;