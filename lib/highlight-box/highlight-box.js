import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './highlight-box.module.css';

function HighlightBox({ fullPromptText }) {
  const [textIsHighlighted, setTextIsHighlighted] = useState(false);
  const [highlightedPromptText, setHiglightedPromptText] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [reasonForHighlight, setReasonForHighlight] = useState('');
  const [highlightFlag, setHighlightFlag] = useState('');
  const insertNewBookmark = async () => {
    console.table({
      fullPromptText, highlightedPromptText, highlightFlag, reasonForHighlight,
    });
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
  const handleSubmit = () => {
    setTextIsHighlighted(false);
    setHiglightedPromptText('');
    setMousePosition({ x: 0, y: 0 });
    setHighlightFlag('');
    setReasonForHighlight('');
    insertNewBookmark();
  };
  const handleHighlightFlag = (e) => {
    setHighlightFlag(e.target.value);
  };
  const handleReasonForHighlight = (e) => {
    setReasonForHighlight(e.target.value);
  };
  useEffect(() => {
    const handleHighlight = (e) => {
      if (fullPromptText) {
        let text = '';
        if (typeof window.getSelection !== 'undefined') {
          text = window.getSelection().toString();
        } else if (typeof document.selection !== 'undefined' && document.selection.type == 'Text') {
          text = document.selection.createRange().text;
        }
        console.log(textIsHighlighted);
        if (text) {
          setTextIsHighlighted(true);
          setHiglightedPromptText(text);
          if (!mousePosition.x && !mousePosition.y) {
            setMousePosition({ x: e.clientX, y: e.clientY });
          }
        }
      }
    };
    window.addEventListener('mouseup', handleHighlight);
    return () => {
      setTextIsHighlighted(false);
      setHiglightedPromptText('');
      setReasonForHighlight('');
      setHighlightFlag('');
      setMousePosition({ x: 0, y: 0 });
      window.removeEventListener('mouseup', handleHighlight);
    };
  }, []);
  return (
    <div>
      { textIsHighlighted && (
        <div
          className={styles.container}
          style={{
            top: mousePosition.y,
            left: mousePosition.x,
          }}
          onBlur={() => setTextIsHighlighted(false)}
        >
          <select className={styles.select} value={highlightFlag} onChange={handleHighlightFlag}>
            { ['choose a feedback', 'i like this!', 'it\'s a no from me.']
              .map((label) => <option className={styles.option}>{label}</option>) }
          </select>
          <textarea
            className={styles.textArea}
            placeholder="wanna say more?"
            value={reasonForHighlight}
            onChange={handleReasonForHighlight}
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
