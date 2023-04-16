const db = require('../../../db/db-model');

const getBookmarks = async (req, res) => {
  const text = 'SELECT id, full_prompt_text, highlighted_prompt_text, highlight_flag, reason_for_highlight FROM bookmarks';
  const results = await db.query(text);
  const bookmarks = results.rows;
  res.status(200).json(bookmarks);
};

export default getBookmarks;
