// Get Calmly editor spot
const insert = (content) => {
  // Find calmly editor
  const elements = document.getElementsByClassName('droid');

  if (elements.length === 0) {
    return;
  }

  const element = elements[0];
  const pToRemove = element.childNodes[0];

  // Remove the first p tag in div
  pToRemove.remove();

  // Split content by \n
  const splitContent = content.split('\n');

  // Wrap in p tags
  const pTagContent = splitContent.forEach((content) => {
    const p = document.createElement('p');
    // This means newline character
    if (content === '') {
      const br = document.createElement('br');
      p.appendChild(br);
    } else {
      p.textContent = content;
    }

    // Insert into HTML one at a time
    element.appendChild(p);
  });

  return true;
};

// Setup listener
chrome.runtime.onMessage.addListener(
  // this is the message listener
  (request, sender, sendResponse) => {
    if (request.message === 'inject') {
      const { content } = request;

      const result = insert(content);

      if (!result) {
        sendResponse({ status: 'failed' });
      }

      sendResponse({ status: 'success' });
    }
  }
);
