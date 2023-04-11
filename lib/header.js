import styles from './header.module.css';

function Header({ children }) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h2 className={styles.title}>
          { children }
        </h2>
      </div>
    </div>
  );
}

export default Header;
