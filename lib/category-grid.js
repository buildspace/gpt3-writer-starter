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

export default CategoryGrid;
