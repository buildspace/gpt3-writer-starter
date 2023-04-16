import PropTypes from 'prop-types';
import Head from 'next/head';

function Bookmarks({ bookmarks }) {
  return <div>woooooooooorkingggg onnnnn iiiiiiitttttttt</div>;
}

Bookmarks.propTypes = {
  bookmarks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      full_prompt_text: PropTypes.string.isRequired,
      highlighted_prompt_text: PropTypes.string.isRequired,
      highlight_flag: PropTypes.string.isRequired,
      reason_for_highlight: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};

const getBaseURL = () => {
  const baseURL = process.env.NODE_ENV === 'development'
    ? process.env.DEV_BASEURL : process.env.PROD_BASEURL;
  return baseURL;
};

export const getStaticProps = async () => {
  const response = await fetch(`${getBaseURL()}/api/bookmarks/get-bookmarks`);
  const bookmarks = await response.json();
  console.log('bookmarks', bookmarks);
  return {
    props: { bookmarks },
  };
};

export default Bookmarks;
