import PropTypes from 'prop-types';
import Head from 'next/head';
import Title from '../lib/title/title';
import Root from '../lib/root/root';

function Bookmarks({ bookmarks, oneLineSummaries }) {
  return (
    <Root>
      <Head><title>bookmarks</title></Head>
      <Title title="ur bookmarks" subtitle="" />
      <ul>
        {
          bookmarks.map((el, idx) => (
            <div key={el.id}>
              <h3>{oneLineSummaries[idx]}</h3>
              <p>{el.highlight_flag}</p>
            </div>
          ))
        }
      </ul>
    </Root>
  );
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
  oneLineSummaries: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

const getBaseURL = () => {
  const baseURL = process.env.NODE_ENV === 'development'
    ? process.env.DEV_BASEURL : process.env.PROD_BASEURL;
  return baseURL;
};

const generateSummary = async (text) => {
  const response = await fetch(`${getBaseURL()}/api/prompt/generate-summary`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text }),
  });
  const data = JSON.stringify(response);
  const { output } = data;
  return output.text;
};

const getSummaries = async (bookmarks) => {
  const summaries = [];
  bookmarks.map(async (el) => summaries.push((await generateSummary(el.full_prompt_text))));
  return summaries;
};

export const getStaticProps = async () => {
  const response = await fetch(`${getBaseURL()}/api/bookmarks/get-bookmarks`);
  const bookmarks = await response.json();
  const oneLineSummaries = await getSummaries(bookmarks);
  return {
    props: { bookmarks, oneLineSummaries },
  };
};

export default Bookmarks;
