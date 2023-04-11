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

export default Category;
