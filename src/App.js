import { useState } from "react";
import "./App.css";

function App() {
  const questions = [
    {
      question: "question one?",
      options: ["one", "two", "three"],
    },
    {
      question: "question two?",
      options: ["one", "two", "three"],
    },
    {
      question: "question three?",
      options: ["one", "two", "three"],
    },
    {
      question: "question four?",
      options: ["one", "two", "three"],
    },
    {
      question: "question five?",
      options: ["one", "two", "three"],
    },
    {
      question: "question six?",
      options: ["one", "two", "three"],
    },
    {
      question: "question seven?",
      options: ["one", "two", "three"],
    },
    {
      question: "question eight?",
      options: ["one", "two", "three"],
    },
    {
      question: "question nine?",
      options: ["one", "two", "three"],
    },
    {
      question: "question ten?",
      options: ["one", "two", "three"],
    },
  ];

  const [section, setSection] = useState(0);

  return (
    <main className="main">
      {section === 0 ? (
        <section className="home card">
          <div>
            <h1>Home</h1>
            <h3>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </h3>
          </div>

          <button className="btn btn-alt" onClick={() => setSection(1)}>
            Start Survey
          </button>
        </section>
      ) : (
        <section className="card">
          <div className="header">
            <small>Question 1/{questions.length}</small>
            <span>01:00</span>
          </div>

          <div className="question">
            <h2>{questions[0].question}</h2>
            <div className="options">
              {questions[0].options.map((item, index) => (
                <>
                  <input
                    key={index}
                    id={`option${index + 1}`}
                    type="radio"
                    hidden
                  />
                  <label htmlFor={`option${index + 1}`}>{item}</label>
                </>
              ))}
            </div>
          </div>

          <button type="button" className="btn" onClick={() => setSection(0)}>
            Next
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
