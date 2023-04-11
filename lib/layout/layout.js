import styles from './layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.landscape}>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          { children }
        </div>
      </div>
    </div>
  );
}

export default Layout;
