function load_highligths(state, payload) {
  return {...state, [payload.page]: payload.highlights}
}

function add_highlight(state, payload) {
  const page = state[payload.page] || [];
  const newPage = [ ...page, payload.highlight ];
  return {...state, [payload.page]: newPage};
}

function remove_highlight(state, payload) {
  const page = state[payload.page] || [];
  const index =  page.findIndex((i) => i.id === payload.id);
  const newPage = [ ...page.slice(0, index), ...page.slice(index + 1) ];
  return {...state, [payload.page]: newPage};
}

function load_annotations(state, payload) {
  const page = state[payload.page]
  const highlight = page.filter(f => f.id === payload.highlight)[0];
  const newHighlight = {...highlight, annotations: payload.annotations};
  const index = page.findIndex(i => i.id === newHighlight.id);
  const newPage = [ ...page.slice(0, index), newHighlight, ...page.slice(index + 1) ]
  return {...state, [payload.page]: newPage};
}

function add_annotation(state, payload) {
  const page = state[payload.page] || [];
  const highlight = page.filter(f => f.id === payload.highlightId)[0];
  const annotations = highlight.annotations || [];
  const newHighlight = {...highlight, annotations: [...annotations, payload.annotation]};
  const index = page.findIndex(i => i.id === newHighlight.id);
  const newPage = [ ...page.slice(0, index), newHighlight, ...page.slice(index + 1) ];
  return {...state, [payload.page]: newPage};
}

export default function(state = {}, action = {}) {
  switch (action.type) {
  case 'LOAD_HIGHLIGHTS':
    return load_highligths(state, action.payload);
  case 'ADD_HIGHLIGHT':
    return add_highlight(state, action.payload);
  case 'REMOVE_HIGHLIGHT':
    return remove_highlight(state, action.payload);
  case 'LOAD_ANNOTATIONS':
    return load_annotations(state, action.payload);
  case 'ADD_ANNOTATION':
    return add_annotation(state, action.payload);
  default:
    return state;
  }
}