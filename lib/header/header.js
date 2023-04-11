import styles from './header.module.css';

function Header({ username, page }) {
  const firstName = username.split(' ')[0];
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        { `welcome to your dashboard, ${firstName}!` }
      </h2>
    </div>
  );
}

export default Header;
