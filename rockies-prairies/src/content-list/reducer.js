function set(state, payload) {
  return state = payload;
}

export default function(state = [], action = {}) {
  switch (action.type) {
  case 'SET_CONTENT':
    return set(state, action.payload);
  default:
    return state;
  }
}