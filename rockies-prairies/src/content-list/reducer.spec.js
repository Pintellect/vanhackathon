import reducer from './reducer'

it('should have a default value', () => {
  const nextState = reducer();

  expect(nextState).toEqual([]);
});

it('handles SET_CONTENT', () => {
  const initialState = [];
  const action = {
    type: 'SET_CONTENT',
    payload: [1, 2]
  }

  const nextState = reducer(initialState, action);

  expect(nextState.length).toEqual(2);
});

it('should return current value if invalid action', () => {
  const initialState = [1, 2, 3];

  const nextState = reducer(initialState);

  expect(nextState.length).toEqual(3);
});
