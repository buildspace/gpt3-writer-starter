import styles from './header.module.css';

function Header({ children }) {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        { children }
      </h2>
    </div>
  );
}

export default Header;
