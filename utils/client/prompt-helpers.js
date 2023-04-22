const getGeneration = async (conversation, apiEndPoint) => {
    const response = await fetch(`/api/prompt/${apiEndPoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ conversation }),
    });
    const data = await response.json();
    const { output } = data;
    return output.text;
};

export const getConversationGeneration = async (conversation) => {
  const responseText = await getGeneration(conversation, 'generate-conversation');
  return responseText;
};

export const getAdviceGeneration = async (chatPrompt) => {
  const responseText = await getGeneration(chatPrompt, 'generate-advice');
  return responseText;
};

const addCurrentLine = (chatContext, currentUserLine) => {
  const fullChatContext = `${chatContext}\nme: ${currentUserLine}\nyou: `;
  return fullChatContext;
};

const createChatContext = (previousChatLines) => {
  const chatContext = previousChatLines.reduce((acc, chatObject) => {
    return acc + `\nme: ${chatObject.user}\nyou: ${chatObject.JEN}`;
  }, '');
  return chatContext;
};

export const createFullChatContext = (previousChatLines, currentUserLine) => {
  const chatContext = createChatContext(previousChatLines, currentUserLine);
  const fullChatContextForPrompt = addCurrentLine(chatContext, currentUserLine);
  return fullChatContextForPrompt;
};

