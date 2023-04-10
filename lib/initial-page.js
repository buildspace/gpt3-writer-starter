import { signIn } from 'next-auth/react';
import styles from './initial-page.module.css';

function InitialPage() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h4 id={styles.hello}>hello, hello, hello :)</h4>
        <h1>welcome to reinforce!</h1>
        <h3>to talk to jen, sign up here.</h3>
        <button type="button" className={styles.button} onClick={signIn}>sign up!</button>
      </div>
    </div>
  );
}

export default InitialPage;
