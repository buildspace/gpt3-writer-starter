import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = `
Write me an awesome plot for a fanfiction set in the 
Harry Potter Universe with original character names with the prompt below.
Prompt:
`;

const generateAction = async (req, res) => {
	console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

	const baseCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${basePromptPrefix}${req.body.userInput}\n`,
		temperature: 0.8,
		max_tokens: 250,
	});

	const basePromptOutput = baseCompletion.data.choices.pop();

	// I build Prompt #2.
	const secondPrompt = `
 Take the plot and prompt below and generate a title and a magical fanfiction story written in the style of JK Rowling. Make it feel awesome. Set it at a 4th grade reading level. End with a plot point or cliffhanger. 
 Prompt: ${req.body.userInput}
 Plot: ${basePromptOutput.text}
 Title:
 Story:
 `;

	// I call the OpenAI API a second time with Prompt #2
	const secondPromptCompletion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: `${secondPrompt}`,
		// I set a higher temperature for this one. Up to you!
		temperature: 0.85,
		// I also increase max_tokens.
		max_tokens: 500,
	});

	// Get the output
	const secondPromptOutput = secondPromptCompletion.data.choices.pop();

	// Send over the Prompt #2's output to our UI instead of Prompt #1's.
	res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;