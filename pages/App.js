import Head from 'next/head';
import Image from 'next/image';
import LinkedIn from '../assets/LinkedIn.png';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: process.env.APP_API_KEY,
  authDomain: process.env.APP_AUTH_DOMAIN,
  projectId: process.env.APP_PROJECT_ID,
  storageBucket: process.env.APP_STORAGE_BUCKET,
  messagingSenderId: process.env.APP_MESSAGING_SENDER_ID,
  appId: process.env.APP_APP_ID,
  measurementId: process.env.APP_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

const App = () => {
  const [userInput1, setUserInput1] = useState('');
  const [userInput2, setUserInput2] = useState('');
  const [userInput4, setUserInput4] = useState('');
  const [userInput5, setUserInput5] = useState('');
  const [userInput6, setUserInput6] = useState('');
  const [userInput7, setUserInput7] = useState('');
  const [userInput8, setUserInput8] = useState('');
  const [userInput9, setUserInput9] = useState('');
  const [userInput10, setUserInput10] = useState('');
  const [userInput11, setUserInput11] = useState('');
  const [userInput12, setUserInput12] = useState('');
  const [userInput13, setUserInput13] = useState('');
  const [userInput14, setUserInput14] = useState('');
  const [userInput15, setUserInput15] = useState('');
  const [userInput16, setUserInput16] = useState('');
  const [userInput17, setUserInput17] = useState('');
  const [userInput18, setUserInput18] = useState('');
  const [userInput19, setUserInput19] = useState('');
  const [userInput20, setUserInput20] = useState('');
  const [userInput21, setUserInput21] = useState('');
  const [userInput22, setUserInput22] = useState('');
  const [userInput23, setUserInput23] = useState('');
  const [userInput24, setUserInput24] = useState('');
  const [userInput25, setUserInput25] = useState('');
  const [userInput26, setUserInput26] = useState('');
  const [userInput27, setUserInput27] = useState('');
  const [userInput28, setUserInput28] = useState('');
  const [userInput29, setUserInput29] = useState('');
  const [userInput30, setUserInput30] = useState('');
  const [userInput31, setUserInput31] = useState('');
  const [userInput32, setUserInput32] = useState('');

  const [apiOutput, setApiOutput] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const callGenerateEndpoint = async () => {
    setIsGenerating(true);
    
    console.log(userInput1);
    console.log(userInput2);
    console.log("Calling OpenAI...")
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        userInput1: userInput1,
        userInput2: userInput2,
        userInput4: userInput4,
        userInput5: userInput5,
        userInput6: userInput6,
        userInput7: userInput7,
        userInput8: userInput8,
        userInput9: userInput9,
        userInput10: userInput10,
        userInput11: userInput11,
        userInput12: userInput12,
        userInput13: userInput13,
        userInput14: userInput14,
        userInput15: userInput15,
        userInput16: userInput16,
        userInput17: userInput17,
        userInput18: userInput18,
        userInput19: userInput19,
        userInput20: userInput20,
        userInput21: userInput21,
        userInput22: userInput22,
        userInput23: userInput23,
        userInput24: userInput24,
        userInput25: userInput25,
        userInput26: userInput26,
        userInput27: userInput27,
        userInput28: userInput28,
        userInput29: userInput29,
        userInput30: userInput30,
        userInput31: userInput31,
        userInput32: userInput32
      }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output.text)

    setApiOutput(`${output.text}`);
    setIsGenerating(false);
  }

  const onUserChangedText1 = (event) => {
    setUserInput1(event.target.value); 
  };
  
  const onUserChangedText2 = (event) => {
    setUserInput2(event.target.value);
  };
  
  const onUserChangedText4 = (event) => {
    setUserInput4(event.target.value);
  };
  
  const onUserChangedText5 = (event) => {
    setUserInput5(event.target.value);
  };
  
  const onUserChangedText6 = (event) => {
    setUserInput6(event.target.value);
  };

  const onUserChangedText7 = (event) => {
    setUserInput7(event.target.value);
  };

  const onUserChangedText8 = (event) => {
    setUserInput8(event.target.value);
  };

  const onUserChangedText9 = (event) => {
    setUserInput9(event.target.value);
  };

  const onUserChangedText10 = (event) => {
    setUserInput10(event.target.value);
  };

  const onUserChangedText11 = (event) => {
    setUserInput11(event.target.value);
  };

  const onUserChangedText12 = (event) => {
    setUserInput12(event.target.value);
  };

  const onUserChangedText13 = (event) => {
    setUserInput13(event.target.value);
  };

  const onUserChangedText14 = (event) => {
    setUserInput14(event.target.value);
  };

  const onUserChangedText15 = (event) => {
    setUserInput15(event.target.value);
  };

  const onUserChangedText16 = (event) => {
    setUserInput16(event.target.value);
  };

  const onUserChangedText17 = (event) => {
    setUserInput17(event.target.value);
  };

  const onUserChangedText18 = (event) => {
    setUserInput18(event.target.value);
  };

  const onUserChangedText19 = (event) => {
    setUserInput19(event.target.value);
  };

  const onUserChangedText20 = (event) => {
    setUserInput20(event.target.value);
  };

  const onUserChangedText21 = (event) => {
    setUserInput21(event.target.value);
  };

  const onUserChangedText22 = (event) => {
    setUserInput22(event.target.value);
  };

  const onUserChangedText23 = (event) => {
    setUserInput23(event.target.value);
  };

  const onUserChangedText24 = (event) => {
    setUserInput24(event.target.value);
  };

  const onUserChangedText25 = (event) => {
    setUserInput25(event.target.value);
  };

  const onUserChangedText26 = (event) => {
    setUserInput26(event.target.value);
  };

  const onUserChangedText27 = (event) => {
    setUserInput27(event.target.value);
  };

  const onUserChangedText28 = (event) => {
    setUserInput28(event.target.value);
  };

  const onUserChangedText29 = (event) => {
    setUserInput29(event.target.value);
  };

  const onUserChangedText30 = (event) => {
    setUserInput30(event.target.value);
  };

  const onUserChangedText31 = (event) => {
    setUserInput31(event.target.value);
  };
  const onUserChangedText32 = (event) => {
    setUserInput32(event.target.value);
  };

  return (
    <div className="root">
      <Head>
        <title>WizCV</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>Genera tu CV repido, sólo pega tus datos</h1>
          </div>
          <div className="header-subtitle">
          <h2>Descarga el CV generado, sólo pega en tu formato favorito y listo.</h2>
          </div>
        </div>
        <div className="prompt-container">
          <textarea placeholder="Mi nombre es:" className="prompt-box" value={userInput1} onChange={onUserChangedText1} />
          <textarea placeholder="Compañía Actual y puesto: " className="prompt-box" value={userInput2} onChange={onUserChangedText2} />          
          <textarea placeholder="Fecha de inicio:" className="prompt-box" value={userInput4} onChange={onUserChangedText4} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput5} onChange={onUserChangedText5} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput6} onChange={onUserChangedText6} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput7} onChange={onUserChangedText7} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput8} onChange={onUserChangedText8} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput9} onChange={onUserChangedText9} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput10} onChange={onUserChangedText10} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput11} onChange={onUserChangedText11} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput12} onChange={onUserChangedText12} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput13} onChange={onUserChangedText13} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput14} onChange={onUserChangedText14} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput15} onChange={onUserChangedText15} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput16} onChange={onUserChangedText16} />
          <textarea placeholder="Compañía Previa y puesto:" className="prompt-box" value={userInput17} onChange={onUserChangedText17} />
          <textarea placeholder="Fecha de inicio y fin:" className="prompt-box" value={userInput18} onChange={onUserChangedText18} />
          <textarea placeholder="Escuela1:" className="prompt-box" value={userInput19} onChange={onUserChangedText19} />
          <textarea placeholder="Carrera1:" className="prompt-box" value={userInput20} onChange={onUserChangedText20} />
          <textarea placeholder="Fecha de inicio y fin de escuela1:" className="prompt-box" value={userInput21} onChange={onUserChangedText21} />
          <textarea placeholder="Escuela2:" className="prompt-box" value={userInput22} onChange={onUserChangedText22} />
          <textarea placeholder="Carrera2:" className="prompt-box" value={userInput23} onChange={onUserChangedText23} />
          <textarea placeholder="Fecha de inicio y fin de escuela2:" className="prompt-box" value={userInput24} onChange={onUserChangedText24} />
          <textarea placeholder="Escuela3:" className="prompt-box" value={userInput25} onChange={onUserChangedText25} />
          <textarea placeholder="Carrera3:" className="prompt-box" value={userInput26} onChange={onUserChangedText26} />
          <textarea placeholder="Fecha de inicio y fin de escuela3:" className="prompt-box" value={userInput27} onChange={onUserChangedText27} />
          <textarea placeholder="Habilidades:" className="prompt-box" value={userInput28} onChange={onUserChangedText28} />
          <textarea placeholder="Cursos:" className="prompt-box" value={userInput29} onChange={onUserChangedText29} />
          <textarea placeholder="Otros intereses:" className="prompt-box" value={userInput30} onChange={onUserChangedText30} />
          <textarea placeholder="Descripción del empleo que quiero:" className="prompt-box" value={userInput31} onChange={onUserChangedText31} />
          <textarea placeholder="En qué idioma quiero mi CV (Inglés o Español):" className="prompt-box" value={userInput32} onChange={onUserChangedText32} />
          <div className="prompt-buttons">
          <a className={isGenerating ? 'generate-button loading' : 'generate-button'} onClick={callGenerateEndpoint}>
            <div className="generate"> 
            {isGenerating ? <span className="loader"></span> : <p>Generar</p>}
            </div>
          </a>
        </div>
        {apiOutput && (
            <div className="output">
              <div className="output-header-container">
                <div className="output-header">
                  <h3>Output</h3>
                </div>
              </div>
              <div className="output-content">
                <p>{apiOutput}</p>
              </div>
            </div>
          )}
      </div>
      <div className="badge-container grow">
        <a href="https://www.linkedin.com/in/ricardo-ivan-sandoval/" target="_blank" rel="noreferrer"/>
          <div className="badge">
            <Image src={LinkedIn} alt="LinkedIn logo" />
            <p>Find me in LinkedIn</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;