import PropTypes from 'prop-types';
import styles from './header.module.css';

function Header({ username, page }) {
  const firstName = username.split(' ')[0];
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>
        { `welcome to your ${page}, ${firstName}!` }
      </h2>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
};

export default Header;
