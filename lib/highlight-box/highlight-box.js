import { useState, useEffect } from 'react';
import styles from './highlight-box.module.css';

function HighlightBox({ contextText }) {
  const [textIsHighlighted, setTextIsHighlighted] = useState(false);
  const [highlightedText, setHighlightedText] = useState('');
  const [reasonForHighlight, setReasonForHighlight] = useState('');
  const [highlightChoice, setHighlightChoice] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const insertNewBookmark = async () => {
    await fetch('/api/prompt/revise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contextText, highlightedText, highlightChoice, reasonForHighlight,
      }),
    });
  };
  const handleSubmit = (e) => {
    const { value } = e.target;
    setReasonForHighlight(value);
    insertNewBookmark();
  };
  const handleHighlightChoice = (e, choice) => {
    setHighlightChoice(choice);
  };
//   console.log(mousePosition, highlightedText);
  useEffect(() => {
    const handleHighlight = (e) => {
      let text = '';
      if (typeof window.getSelection !== 'undefined') {
        text = window.getSelection().toString();
      } else if (typeof document.selection !== 'undefined' && document.selection.type == 'Text') {
        text = document.selection.createRange().text;
      }
    //   console.log(mousePosition.x, mousePosition.y); - i wouldn't worry about this rn, just make the bookmark
      if (text) {
        setTextIsHighlighted(true);
        if (!mousePosition.x && !mousePosition.y) setMousePosition({ x: e.clientX, y: e.clientY });
        setHighlightedText(text);
      }
    };
    ['mouseup', 'mousedown'].forEach((evt) => window.addEventListener(evt, handleHighlight));
    return () => {
      setTextIsHighlighted(false);
      setHighlightedText('');
      ['mouseup', 'mousedown'].forEach((evt) => window.removeEventListener(evt, handleHighlight));
    };
  }, []);

  return (
    <div>
      { textIsHighlighted && (
        <div className={styles.container} style={{ top: mousePosition.y, left: mousePosition.x }}>
          <select className={styles.select} value={highlightChoice} onClick={handleHighlightChoice}>
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

export default HighlightBox;
