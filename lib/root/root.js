import PropTypes from 'prop-types';
import styles from './root.module.css';

function Root({ children }) {
  return <div className={styles.root}>{ children }</div>;
}

Root.propTypes = {
  children: PropTypes.elementType.isRequired,
};

export default Root;
