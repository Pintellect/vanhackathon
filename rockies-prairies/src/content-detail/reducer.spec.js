import reducer from "./reducer";

it("should have a default value", () => {
  const nextState = reducer();

  expect(nextState).toEqual([]);
});

it("handles SET_CURRENT_CONTENT", () => {
  const initialState = [];
  const action = {
    type: "SET_CURRENT_CONTENT",
    payload: {a: 1}
  };

  const nextState = reducer(initialState, action);

  expect(nextState).toEqual(action.payload);
});

it("should return current value if invalid action", () => {
  const initialState = {a: 1};

  const nextState = reducer(initialState);

  expect(nextState).toEqual(initialState);
});
