// import package(s)
import { useDispatch, useSelector } from "react-redux";
import { useTimer } from "use-timer";
import Swal from "sweetalert2";

// import action
import {
  setSection,
  setQuestion,
  setAnswer,
  submitAnswer,
  retakeSurvey,
} from "./redux/action";

// import media and css file
import illustration from "./illustration.png";
import finish from "./finish.png";
import "./App.css";

function App() {
  // questionnaire data
  const survey = {
    title: "Online Shopping",
    description:
      "We would like to know what is currently popular and demanding among the e-commerce customers",
  };

  const questions = [
    {
      question: "How often do you online shop?",
      options: [
        "At least 10 times a month",
        "4-10 times month",
        "1-3 times a month",
      ],
    },
    {
      question: "What do you usually buy?",
      options: ["Clothes", "Electronics", "Food stocks"],
    },
    {
      question: "Which platform you mostly use?",
      options: ["Tokopedia", "Shopee", "Other"],
    },
    {
      question: "How much do you spend monthly for online shopping?",
      options: ["Above 1mio", "500k - 1mio", "Under 500k"],
    },
    {
      question: "Is the quality of the goods as expected?",
      options: ["Yes, definitely", "Sometimes", "Not at all"],
    },
    {
      question: "How often do you used coupons/discounts?",
      options: ["Habitual", "Occasionally", "Seldom"],
    },
    {
      question: "Were you able to find enough information about the product?",
      options: [
        "Yes, it's sourceful",
        "Enough information to get to know the product",
        "No, it's a bit confusing",
      ],
    },
    {
      question:
        "What was your most important consideration while shopping online?",
      options: ["Product's quality", "Product's price", "Product's popularity"],
    },
    {
      question: "Is shopping online any better than shopping offline/on-site?",
      options: ["Yes", "No", "It's just the same"],
    },
    {
      question: "Were you satisfied with the overall experience?",
      options: ["Yes", "No", "I don't know"],
    },
  ];

  // get global state
  const { section, currentQuestion, currentAnswer, answers, record } =
    useSelector((state) => state);

  // dispatch function
  const dispatch = useDispatch();

  const handleSection = (sect) => {
    dispatch(setSection(sect));
  };

  const handleQuestion = (qst) => {
    dispatch(setQuestion(qst));
  };

  const handleAnswer = (ans) => {
    dispatch(setAnswer(ans));
  };

  const handleSubmit = (qst) => {
    dispatch(submitAnswer(qst, currentAnswer));
  };

  const handleRetake = () => {
    dispatch(retakeSurvey(answers));
  };

  // timer config
  const timer = 120;

  const { time, start, pause, reset } = useTimer({
    initialTime: timer,
    endTime: 0,
    timerType: "DECREMENTAL",
  });

  let mins = Math.floor(time / 60);
  let secs = Math.floor(time - mins * 60);
  const hurry = Math.floor(timer / 5);

  if (time === 0) {
    reset();
    Swal.fire({
      icon: "info",
      title: `Time's up!`,
      showConfirmButton: false,
      timer: 2000,
      backdrop: "rgba(106, 207, 109, 0.6)",
    }).then(() => {
      handleQuestion(0);
      handleSection(2);
    });
  }

  return (
    <main className="main">
      {section === 0 ? (
        <section className="home card">
          <img src={illustration} alt="survey illustration" />
          <div>
            <h1>{survey.title}</h1>
            <h3>{survey.description}</h3>
          </div>

          <button
            className="btn btn-alt"
            onClick={() => {
              handleSection(1);
              start();
            }}
          >
            {record.length > 0 ? "Retake Survey" : "Start Survey"}
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
                  <label
                    htmlFor={`option${index + 1}`}
                    className={
                      currentAnswer !== 0
                        ? currentAnswer === index + 1
                          ? "btn-selected"
                          : ""
                        : record[currentQuestion]?.answer === index + 1
                        ? "btn-saved"
                        : ""
                    }
                  >
                    {record[currentQuestion]?.answer === index + 1 ? (
                      <>
                        <span>{item}</span> <span>previous answer</span>
                      </>
                    ) : (
                      item
                    )}
                  </label>
                </>
              ))}
            </div>
          </div>

          {currentQuestion + 1 === questions.length ? (
            <button
              type="button"
              className="btn"
              onClick={() => {
                pause();
                handleSubmit(currentQuestion);
                Swal.fire({
                  icon: "success",
                  title: `All questions have been answered`,
                  showConfirmButton: false,
                  timer: 2000,
                  backdrop: "rgba(106, 207, 109, 0.6)",
                }).then(() => {
                  handleQuestion(0);
                  handleSection(2);
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
                handleQuestion(currentQuestion + 1);
              }}
              disabled={currentAnswer === 0}
            >
              Next
            </button>
          )}
        </section>
      ) : (
        <section className="finish card">
          <img src={finish} alt="finish illustration" />
          <h1>Thank you for your answers!</h1>
          <h3>
            We appreciate your time for answering this survey, I hope you can
            help us gather some data again in near future
          </h3>
          <button
            className="btn btn-alt"
            onClick={() => {
              handleSection(0);
              handleRetake();
            }}
          >
            Back
          </button>
        </section>
      )}
    </main>
  );
}

export default App;
