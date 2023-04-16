import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './highlight-box.module.css';

function HighlightBox({ fullPromptText }) {
  const [textIsHighlighted, setTextIsHighlighted] = useState(false);
  const [highlightedPromptText, setHiglightedPromptText] = useState('');
  const [reasonForHighlight, setReasonForHighlight] = useState('');
  const [highlightFlag, setHighlightFlag] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const insertNewBookmark = async () => {
    await fetch('/api/bookmarks/add-bookmark', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullPromptText, highlightedPromptText, highlightFlag, reasonForHighlight,
      }),
    });
  };
  const handleSubmit = (e) => {
    const { value } = e.target;
    setReasonForHighlight(value);
    insertNewBookmark();
  };
  const handleHighlightFlag = (e, choice) => {
    setHighlightFlag(choice);
  };
  //   console.log(mousePosition, highlightedPromptText);
  useEffect(() => {
    const handleHighlight = (e) => {
      let text = '';
      if (typeof window.getSelection !== 'undefined') {
        text = window.getSelection().toString();
      } else if (typeof document.selection !== 'undefined' && document.selection.type == 'Text') {
        text = document.selection.createRange().text;
      }
      // console.log(mousePosition.x, mousePosition.y);
      if (text) {
        setTextIsHighlighted(true);
        if (!mousePosition.x && !mousePosition.y) setMousePosition({ x: e.clientX, y: e.clientY });
        setHiglightedPromptText(text);
      }
    };
    ['mouseup', 'mousedown'].forEach((evt) => window.addEventListener(evt, handleHighlight));
    return () => {
      setTextIsHighlighted(false);
      setHiglightedPromptText('');
      ['mouseup', 'mousedown'].forEach((evt) => window.removeEventListener(evt, handleHighlight));
    };
  }, []);

  return (
    <div>
      { textIsHighlighted && (
        <div className={styles.container} style={{ top: mousePosition.y, left: mousePosition.x }}>
          <select className={styles.select} value={highlightFlag} onClick={handleHighlightFlag}>
            { ['choose a feedback', 'i like this!', 'it\'s a no from me.']
              .map((label) => <option className={styles.option}>{label}</option>) }
          </select>
          <textarea
            className={styles.textArea}
            placeholder="wanna say more?"
          />
          <button className={styles.button} type="button" onClick={handleSubmit}>
            add to bookmarks? (don&apos;t worry abt dumb speak)
          </button>
        </div>
      )}
    </div>
  );
}

HighlightBox.propTypes = {
  fullPromptText: PropTypes.string.isRequired,
};

export default HighlightBox;
