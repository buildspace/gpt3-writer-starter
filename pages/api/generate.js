import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OpenAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const basePromptPrefix = 
`
Please write me a fanfiction story set in the Harry Potter Universe with an original character or characters for the title below. Please make sure that the response outputs a title, an opening paragraph in a style like JK Rowling. Make it awesome.

Title: 
`
const generateAction = async (req, res) => {
  //logging errors
  try {

  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}\n`);

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}`,
    temperature: 0.8,
    max_tokens: 250,
  });

  // Store the title in a separate variable
  const title = req.body.userInput; 

  // Store the output of the first prompt in a separate variable 
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
} catch (error) {
  res.status(500).json({ error: error.message });
  }
  
//I build Prompt #2 
const secondPrompt = 
`
Continue this fanfiction story set in the Harry Potter Universe with an original character that accepts a plot point that takes it in a new direction but still keeps it cohesive. Give it a title. Make it awesome like something JK Rowling would write. 

Story Prompt: ${req.body.userInput}

Opening Paragraph: ${basePromptOutput.text}

Plot Point: 
`

 //Logging errors
 try{
   // I call the OpenAI API a second time with Prompt #2 
   console.log(`API: ${secondPrompt}\n`);
   const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}`,
    //I set a higher temperature for this one. 
    temperature: 0.85,
    //I also increase max_tokens
    max_tokens: 1250,
   });
  
   //Get the output 
   const secondPromptOutput = secondPromptCompletion.data.choices.pop();

   //Send over prompt #2's output to our UI instead of Prompt #1s
   res.status(200).json({ output: secondPromptOutput });

 } catch (error) {
  res.status(500).json({ error: error.message });
 }

};

export default generateAction;