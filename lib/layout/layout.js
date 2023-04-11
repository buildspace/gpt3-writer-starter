/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
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

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
