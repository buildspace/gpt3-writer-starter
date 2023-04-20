export const getGeneration = async (userInput) => {
  const transcript = `me: ${userInput} \nyou: `;
    const response = await fetch('/api/prompt/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transcript }),
    });
    const data = await response.json();
    const { output } = data;
    return output.text;
};

const addCurrentLine = (chatContext, currentUserLine) => {
  const fullChatContext = `${chatContext}\nme: ${currentUserLine}\nyou: `;
  return fullChatContext;
};

const createChatContext = (previousChatLines, currentUserLine) => {
  const chatContext = previousChatLines.reduce((acc, chatObject) => {
    return acc + `\nme: ${chatObject.user}\nyou: ${chatObject.JEN}`;
  }, '');
  return chatContext;
};

export const createFullChatContextForPrompt = (previousChatLines, currentUserLine) => {
  const chatContext = createChatContext(previousChatLines, currentUserLine);
  const fullChatContextForPrompt = addCurrentLine(chatContext, currentUserLine);
  return fullChatContextForPrompt;
};

