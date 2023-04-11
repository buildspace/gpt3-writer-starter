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

export default Button;
