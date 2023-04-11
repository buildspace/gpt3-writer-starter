/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from 'prop-types';
import styles from './category-grid.module.css';

function CategoryGrid({ children }) {
  return (
    <div className={styles.landscape}>
      <div className={styles.gridContainer}>
        { children }
      </div>
    </div>
  );
}

CategoryGrid.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CategoryGrid;
