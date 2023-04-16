const db = require('../../../db/db-model');

const addBookmark = async (req, res) => {
  const {
    fullPromptText,
    highlightedPromptText,
    highlightFlag,
    reasonForHighlight,
  } = req.body;
  const text = 'INSERT INTO bookmarks (full_prompt_text, highlighted_prompt_text, highlight_flag, reason_for_highlight) values ($1, $2, $3, $4)';
  const values = [fullPromptText, highlightedPromptText, highlightFlag, reasonForHighlight];
  db.query(text, values);
  res.status(200).json({ message: 'bookmark added' });
};

export default addBookmark;
