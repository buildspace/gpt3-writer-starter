export const getGeneration = async (userInput) => {
    const response = await fetch('/api/prompt/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userInput }),
    });
    const data = await response.json();
    const { output } = data;
    return output.text;
};