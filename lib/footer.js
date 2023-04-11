import { signOut } from 'next-auth/react';
import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footerContainer}>
      <button
        type="button"
        className={styles.button}
        onClick={() => signOut()}
      >
        wanna sign out?
      </button>
    </footer>
  );
}

export default Footer;
