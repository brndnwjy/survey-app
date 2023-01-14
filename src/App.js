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

  return (
    <main className="main">
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

          <button type="button" className="btn">
            Next
          </button>
        </div>
      </section>
    </main>
  );
}

export default App;
