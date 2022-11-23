// Actions
const getKey = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(['openai-key'], (result) => {
      if (result['openai-key']) {
        const decodedKey = atob(result['openai-key']);
        resolve(decodedKey);
      }
    });
  });
};

const sendMessage = (content) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0].id;

    chrome.tabs.sendMessage(
      activeTab,
      { message: 'inject', content },
      (response) => {
        if (response.status === 'failed') {
          console.log('injection failed.');
        }
      }
    );
  });
};

const generate = async (prompt) => {
  // Get openai key
  const key = await getKey();
  const url = 'https://api.openai.com/v1/completions';
  const completionResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-002',
      prompt: prompt,
      max_tokens: 2048,
      temperature: 0.7,
    }),
  });

  const completion = await completionResponse.json();
  return completion.choices.pop();
};

const generateCompletionAction = async (info, tab) => {
  try {
    sendMessage('generating...');

    const { selectionText } = info;
    const basePromptPrefix =
      'Help me write lyrics in the style of Drake, Canadian Rapper\n';
    const finalPromptPrefix =
      'Take the lyrics below and generate 5 song titles:\n';

    // Base Prompt
    const baseChoice = await generate(`${basePromptPrefix}${selectionText}`);

    // Final prompt
    const finalChoice = await generate(
      `${finalPromptPrefix}${selectionText}${baseChoice.text}`
    );

    // Combine base and final choices
    const output = `Your next song titles:${finalChoice.text}\n\nYour next song:\n${selectionText}${baseChoice.text}`;

    // Send to frontend
    sendMessage(output);
  } catch (error) {
    console.log(error);
    sendMessage(error.toString());
  }
};

chrome.contextMenus.create({
  id: 'context-run',
  title: 'Generate Lyrics',
  contexts: ['selection'],
});

// Add listener
chrome.contextMenus.onClicked.addListener(generateCompletionAction);
