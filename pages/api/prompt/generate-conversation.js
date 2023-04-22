import { generate } from '../../../utils/api/generate';
import { initialConversationPrompt } from '../../../utils/constants/prompts';

const generateAction = async (req, res) => {
  const basePromptOutput = await generate(initialConversationPrompt, req.body.conversation);
  res.status(200).json({ output: basePromptOutput });
}

export default generateAction;
