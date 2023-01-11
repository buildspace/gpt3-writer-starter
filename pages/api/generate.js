import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const express = require('express');
const router = express.Router();

const openai = new OpenAIApi(configuration);

const basePromptPrefix1 = 
    `
    Me puedes generar un Currículum Vitae? 
    Mis datos personales son:
    `;
    const basePromptPrefix2 =`Compañía Actual y puesto:`;
    const basePromptPrefix4 =`Empecé:`;
    const basePromptPrefix5 =`Compañía Previa y puesto:`;
    const basePromptPrefix6 =`Empecé y Terminé:`;
    const basePromptPrefix7 =`Compañía Previa y puesto:`;
    const basePromptPrefix8 =`Empecé y Terminé:`;
    const basePromptPrefix9 =`Compañía Previa y puesto:`;
    const basePromptPrefix10 =`Empecé y Terminé:`;
    const basePromptPrefix11 =`Compañía Previa y puesto:`;
    const basePromptPrefix12 =`Empecé y Terminé:`;
    const basePromptPrefix13 =`Compañía Previa y puesto:`;
    const basePromptPrefix14 =`Empecé y Terminé:`;
    const basePromptPrefix15 =`Compañía Previa y puesto:`;
    const basePromptPrefix16 =`Empecé y Terminé:`;
    const basePromptPrefix17 =`Compañía Previa y puesto:`;
    const basePromptPrefix18 =`Empecé y Terminé:`;
    const basePromptPrefix19 =`Escuela 1:`;
    const basePromptPrefix20 =`Carrera 1:`;
    const basePromptPrefix21 =`Fechas escuela 1:`;
    const basePromptPrefix22 =`Escuela 2:`;
    const basePromptPrefix23 =`Carrera 2:`;
    const basePromptPrefix24 =`Fechas escuela 2:`;
    const basePromptPrefix25 =`Escuela 3:`;
    const basePromptPrefix26 =`Carrera 3:`;
    const basePromptPrefix27 =`Fechas escuela 3:`;
    const basePromptPrefix28 =`Habilidades:`;
    const basePromptPrefix29 =`Cursos:`;
    const basePromptPrefix30 =`Otros intereses:`;
    const basePromptPrefix31 =`Nombre y descripción del empleo que quiero:`;
    const basePromptPrefix32 =
    `
    Genera CV con sección de nombre, introducción, habilidades, experiencia, logros utilizando verbos de acción por cada compañía de manera individual, educación y otros intereses
    `
    ;
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix1}${req.body.userInput1}${basePromptPrefix2}${req.body.userInput2}${basePromptPrefix4}${req.body.userInput4}${basePromptPrefix5}${req.body.userInput5}${basePromptPrefix6}${req.body.userInput6}${basePromptPrefix7}${req.body.userInput7}${basePromptPrefix8}${req.body.userInput8}${basePromptPrefix9}${req.body.userInput9}${basePromptPrefix10}${req.body.userInput10}${basePromptPrefix11}${req.body.userInput11}${basePromptPrefix12}${req.body.userInput12}${basePromptPrefix13}${req.body.userInput13}${basePromptPrefix14}${req.body.userInput14}${basePromptPrefix15}${req.body.userInput15}${basePromptPrefix16}${req.body.userInput16}${basePromptPrefix17}${req.body.userInput17}${basePromptPrefix18}${req.body.userInput18}${basePromptPrefix19}${req.body.userInput19}${basePromptPrefix20}${req.body.userInput20}${basePromptPrefix21}${req.body.userInput21}${basePromptPrefix22}${req.body.userInput22}${basePromptPrefix23}${req.body.userInput23}${basePromptPrefix24}${req.body.userInput24}${basePromptPrefix25}${req.body.userInput25}${basePromptPrefix26}${req.body.userInput26}${basePromptPrefix27}${req.body.userInput27}${basePromptPrefix28}${req.body.userInput28}${basePromptPrefix29}${req.body.userInput29}${basePromptPrefix30}${req.body.userInput30}${basePromptPrefix31}${req.body.userInput31}${basePromptPrefix32}`)
  
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix1}${req.body.userInput1}${basePromptPrefix2}${req.body.userInput2}${basePromptPrefix4}${req.body.userInput4}${basePromptPrefix5}${req.body.userInput5}${basePromptPrefix6}${req.body.userInput6}${basePromptPrefix7}${req.body.userInput7}${basePromptPrefix8}${req.body.userInput8}${basePromptPrefix9}${req.body.userInput9}${basePromptPrefix10}${req.body.userInput10}${basePromptPrefix11}${req.body.userInput11}${basePromptPrefix12}${req.body.userInput12}${basePromptPrefix13}${req.body.userInput13}${basePromptPrefix14}${req.body.userInput14}${basePromptPrefix15}${req.body.userInput15}${basePromptPrefix16}${req.body.userInput16}${basePromptPrefix17}${req.body.userInput17}${basePromptPrefix18}${req.body.userInput18}${basePromptPrefix19}${req.body.userInput19}${basePromptPrefix20}${req.body.userInput20}${basePromptPrefix21}${req.body.userInput21}${basePromptPrefix22}${req.body.userInput22}${basePromptPrefix23}${req.body.userInput23}${basePromptPrefix24}${req.body.userInput24}${basePromptPrefix25}${req.body.userInput25}${basePromptPrefix26}${req.body.userInput26}${basePromptPrefix27}${req.body.userInput27}${basePromptPrefix28}${req.body.userInput28}${basePromptPrefix29}${req.body.userInput29}${basePromptPrefix30}${req.body.userInput30}${basePromptPrefix31}${req.body.userInput31}${basePromptPrefix32}\n`,
    temperature: 0.9,
    max_tokens: 1000,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

router.post('/generateAction', generateAction);
module.exports = router;

export default generateAction;