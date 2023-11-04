import React, { useState } from "react";

const Home = () => {
  const [userAnswers, setUserAnswers] = useState(["", "", ""]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");
  const questionList = [
    "Frage 1:  Welche Fächer begeistern dich in der Schule am meisten?",
    "Frage 2:  Welche Bereiche findest du spannend? (z.B. Medizin, Wirtschaft, Technik, etc.)?",
    "Frage 3:  Wie wichtig ist es dir, dass du nach deinem Studium viele unterschiedliche Berufsmöglichkeiten hast? Oder würdest du lieber ein Studium machen, das dich auf einen bestimmten Beruf vorbereitet?",
  ];
  const totalQuestions = questionList.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      callGenerateEndpoint(userAnswers);
    }
  };

  const callGenerateEndpoint = async (answers) => {
    setIsGenerating(true);
    console.log("Calling OpenAI...");
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userInput: answers }),
    });

    const data = await response.json();
    const { output } = data;
    console.log("OpenAI replied...", output);

    setApiOutput(output);
    setIsGenerating(false);
  };

  const onUserChangedText = (event) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestion] = event.target.value;
    setUserAnswers(updatedAnswers);
  };

  return (
    <div className="root">
      <div className="container">
        <div className="header">
          <div className="header-title">
            {!apiOutput && (
              <h1>Was tun nach dem Abitur?</h1>
            )}
            {apiOutput && (
              <h1>Dein Ergebnis</h1>
            )}
          </div>
            <div className="header-subtitle center-text">
            {!apiOutput && (
              <h2>
                Beantworte 3 Fragen zu deiner Persönlichkeit und du erhältst
                kostenlos eine persönliche Empfehlung, was dein passender Weg nach
                dem Abitur sein kann!
              </h2>
            )}
            </div>
        </div>
        {!apiOutput && (
          <div className="prompt-container">
            <p className="question-text" style={{ color: "white" }}>
              {questionList[currentQuestion]}
            </p>
            <div className="prompt-container">
              <textarea
                placeholder={`Antwort auf Frage ${currentQuestion + 1}`}
                className="prompt-box" /* Add the class name here */
                value={userAnswers[currentQuestion]}
                onChange={onUserChangedText}
              />
            </div>
          </div>
        )}
        {!apiOutput && (
          <div className="prompt-buttons">
            {currentQuestion < totalQuestions - 1 && (
              <a className="generate-button" onClick={handleNextQuestion}>
                Nächste Frage
              </a>
            )}
            {currentQuestion === totalQuestions - 1 && (
              <a
                className={
                  isGenerating ? "generate-button loading" : "generate-button"
                }
                onClick={handleNextQuestion}
              >
                Antwort bekommen
              </a>
            )}
          </div>
        )}
        {apiOutput && (
          <div className="output">
            <div className="output-content">
              <p>{apiOutput}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
