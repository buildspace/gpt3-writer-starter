import { generate } from '../../../utils/api/generate';
import { initialAdivcePrompt } from '../../../utils/constants/prompts';

const generateAction = async (req, res) => {
  const basePromptOutput = generate(initialAdivcePrompt, req.body.conversation);
  res.status(200).json({ output: basePromptOutput });
}

export default generateAction;
