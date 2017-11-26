import reducer from './reducer'

it('should have a default value', () => {
  const nextState = reducer();

  expect(nextState).toEqual({});
});

it('should return current value if invalid action', () => {
  const initialState = [1, 2, 3];

  const nextState = reducer(initialState);

  expect(nextState.length).toEqual(3);
});

it('handles ADD_HIGHLIGHT', () => {
  const data = {
    page: 1,
    highlight: {
      rangeStart: 1,
      rangeEnd: 2
    },

    id: 1,
    classApplier: 'name',
    containerElementId: null
  }
  const initialState = [];
  const action = {
    type: 'ADD_HIGHLIGHT',
    payload: data
  }

  const nextState = reducer(initialState, action);
  expect(nextState[1]).toBeDefined()
  expect(nextState[1]).toEqual([data.highlight]);
});

it('handles REMOVE_HIGHLIGHT', () => {
  const highlight = {
    page: 'page_1',
    id: 2
  }
  const initialState = {
    [highlight.page]: [{ id: 1 }, { id: 2 } ,{ id: 3 }]
  };
  const action = {
    type: 'REMOVE_HIGHLIGHT',
    payload: highlight
  }
  const nextState = reducer(initialState, action);
  expect(nextState[highlight.page].length).toEqual(2)
});

it('handles ADD_ANNOTATION', () => {
  const data = {
    page: 'test',
    highlightId: 3,
    annotation: {name: 'Test', notes: "Lorem"}
  }
  const initialState = {
    [data.page]: [{ id: 1 }, { id: 2 }, { id: 3 }]
  };
  const action = {
    type: 'ADD_ANNOTATION',
    payload: data
  }

  const nextState = reducer(initialState, action);
  const annotations = nextState[data.page][2].annotations;
  expect(annotations.length).toEqual(1)
  expect(annotations).toEqual([data.annotation]);
});