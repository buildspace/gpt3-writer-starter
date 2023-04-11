/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import styles from './button.module.css';

function Button({ onClickAction, children }) {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClickAction}
    >
      { children }
    </button>
  );
}

Button.propTypes = {
  onClickAction: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Button;
