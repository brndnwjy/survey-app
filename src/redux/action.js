export const setAnswer = (ans) => (dispatch) => {
  dispatch({ type: "SET_ANSWER", payload: ans });
};

export const submitAnswer = (qst, ans) => (dispatch) => {
  dispatch({ type: "SUBMIT_ANSWER", payload: { qst, ans } });
};
