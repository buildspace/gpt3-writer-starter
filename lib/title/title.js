import PropTypes from 'prop-types';
import styles from './title.module.css';

function Title({ title, subtitle }) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1>{title}</h1>
        </div>
        <div className={styles.headerSubtitle}>
          <h2>{subtitle}</h2>
        </div>
      </div>
    </div>
  );
}

Title.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default Title;
