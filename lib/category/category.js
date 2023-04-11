/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import styles from './category.module.css';

function Category({ children }) {
  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div className={styles.innerBox}>
          { children }
        </div>
      </div>
    </div>
  );
}

Category.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Category;
