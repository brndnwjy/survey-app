import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAnswer, submitAnswer } from "./redux/action";
import { useTimer } from "use-timer";
import Swal from "sweetalert2";

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

  const dispatch = useDispatch();

  const { currentAnswer } = useSelector((state) => state);

  const handleAnswer = (ans) => {
    dispatch(setAnswer(ans));
  };

  const handleSubmit = (qst) => {
    dispatch(submitAnswer(qst, currentAnswer));
  };

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [section, setSection] = useState(0);

  const timer = 10;

  const { time, start, reset } = useTimer({
    initialTime: timer,
    endTime: 0,
    timerType: "DECREMENTAL",
  });

  let mins = Math.floor(time / 60);
  let secs = Math.floor(time - mins * 60);
  const hurry = Math.floor(timer / 5);

  if (time === 0) {
    Swal.fire({
      icon: "info",
      title: `Time's up!`,
      showConfirmButton: false,
      timer: 2000,
      backdrop: "rgba(0,0,100,0.6)",
    }).then(() => {
      setCurrentQuestion(0);
      setSection(2);
      reset();
    });
  }

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

          <button
            className="btn btn-alt"
            onClick={() => {
              setSection(1);
              start();
            }}
          >
            Start Survey
          </button>
        </section>
      ) : section === 1 ? (
        <section className="card">
          <div className="header">
            <small>
              Question {currentQuestion + 1}/{questions.length}
            </small>
            <span className={time <= hurry && "hurry"}>
              {mins <= 9 ? "0" + mins : mins}:{secs <= 9 ? "0" + secs : secs}
            </span>
          </div>

          <div className="question">
            <h2>{questions[currentQuestion].question}</h2>
            <div className="options">
              {questions[currentQuestion].options.map((item, index) => (
                <>
                  <input
                    key={index}
                    id={`option${index + 1}`}
                    type="radio"
                    onClick={() => {
                      handleAnswer(index + 1);
                    }}
                    hidden
                  />
                  <label htmlFor={`option${index + 1}`}>{item}</label>
                </>
              ))}
            </div>
          </div>

          {currentQuestion + 1 === questions.length ? (
            <button
              type="button"
              className="btn"
              onClick={() => {
                handleSubmit(currentQuestion);
                Swal.fire({
                  icon: "success",
                  title: `All questions have been answered`,
                  showConfirmButton: false,
                  timer: 2000,
                  backdrop: "rgba(0,0,100,0.6)",
                }).then(() => {
                  setCurrentQuestion(0);
                  setSection(2);
                  reset();
                });
              }}
              disabled={currentAnswer === 0}
            >
              Finish
            </button>
          ) : (
            <button
              type="button"
              className="btn"
              onClick={() => {
                handleSubmit(currentQuestion);
                setCurrentQuestion((current) => current + 1);
              }}
              disabled={currentAnswer === 0}
            >
              Next
            </button>
          )}
        </section>
      ) : (
        <section className="finish card">
          <h1>Finish</h1>
          <h3>Thank you for your participation!</h3>
          <button className="btn btn-alt" onClick={() => setSection(0)}>
            Back
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
