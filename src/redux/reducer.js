const initialState = {
  currentAnswer: 0,
  answers: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ANSWER":
      return {
        ...state,
        currentAnswer: action.payload,
      };

    case "SUBMIT_ANSWER":
      return {
        ...state,
        currentAnswer: 0,
        answers: [
          ...state.answers,
          { question: action.payload.qst, answer: action.payload.ans },
        ],
      };

    default:
      return state;
  }
};

export default reducer;
