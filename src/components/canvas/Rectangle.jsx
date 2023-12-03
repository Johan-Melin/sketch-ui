import styles from './Rectangle.module.css';
import { CONSTANTS } from '../styles/constants.js';

const gridSize = CONSTANTS.GRID_SIZE;
import PropTypes from 'prop-types';

const loremIpsumText = `lorem ipsum dolor sit amet, consectetur adipiscing elit. sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`.split(' ');

const Rectangle = ({ rectangles, style, color, displayLorem, clickHandler }) => {
  return rectangles.map((r, i) => (
    <div
      key={i}
      className={`${styles.rect} ${style}`}
      style={{ 
        left: r.x * gridSize, 
        top: CONSTANTS.TOPBAR_HEIGHT + r.y * gridSize, 
        width: r.w * gridSize || 20, 
        height: r.h * gridSize || 2, 
        fontSize: r.h * gridSize * 0.8 || 20,
        backgroundColor: color,
        border: r.link && '2px solid #377',
      }}
      onClick={r.link ? ()=>clickHandler(r.link) : undefined}
    >{displayLorem  && i < loremIpsumText.length && `${loremIpsumText.slice(i).join(' ')}`}</div>
  ));
};

export const Txt = ({rectangles, clickHandler}) => <Rectangle rectangles={rectangles} style={styles.txt} displayLorem clickHandler={clickHandler} />
export const Other = ({rectangles, clickHandler}) => <Rectangle rectangles={rectangles} style={styles.other} clickHandler={clickHandler} />
export const Input = ({rectangles}) => <Rectangle rectangles={rectangles} style={styles.input} />

const RectPropTypes = {
  rectangles: PropTypes.arrayOf(
    PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
      w: PropTypes.number.isRequired,
      h: PropTypes.number,
    })
  ).isRequired,
  clickHandler: PropTypes.func
};

Txt.propTypes = RectPropTypes;
Other.propTypes = RectPropTypes;
Input.propTypes = RectPropTypes;

export default Rectangle;