import styles from './layout.module.css';

function Layout({ children }) {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        { children }
      </div>
    </div>
  );
}

export default Layout;
