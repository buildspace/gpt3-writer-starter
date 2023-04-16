import styles from './notification.module.css';

function Notification({ children }) {
  return (
    <div className={styles.container}>
      { children }
    </div>
  );
}

export default Notification;
