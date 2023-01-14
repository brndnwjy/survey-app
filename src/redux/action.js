export const setSection = (sect) => (dispatch) => {
  dispatch({ type: "SET_SECTION", payload: sect });
};

export const setQuestion = (qst) => (dispatch) => {
  dispatch({ type: "SET_QUESTION", payload: qst });
};

export const setAnswer = (ans) => (dispatch) => {
  dispatch({ type: "SET_ANSWER", payload: ans });
};

export const submitAnswer = (qst, ans) => (dispatch) => {
  dispatch({ type: "SUBMIT_ANSWER", payload: { qst, ans } });
};

export const retakeSurvey = (ans) => (dispatch) => {
  dispatch({ type: "RETAKE_SURVEY", payload: ans });
};
