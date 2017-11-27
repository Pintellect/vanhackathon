import axios from 'axios';

// TODO move to global parameters
const HIGHLIGHTS_URI = '/highlights';
const ANNOTATIONS_URI = '/annotations';
const BASE_URL = 'http://localhost:3001/api';
const BASE_HIGHLIGHTS = `${BASE_URL}${HIGHLIGHTS_URI}`;
const BASE_ANNOTATIONS = `${BASE_URL}${ANNOTATIONS_URI}`;

export function loadHighlights (page) {
  const url = `${BASE_HIGHLIGHTS}?page=${encodeURIComponent(page)}`;
  return dispatch =>
    axios.get(url)
      .then(response => {
        dispatch({type: 'LOAD_HIGHLIGHTS', payload: {page, highlights: response.data.map(h => h.highlight) }} );
      });
}
export function createHighlight (highlight) {
  const url = `${BASE_HIGHLIGHTS}`;
  return dispatch =>
    axios.post(url, highlight)
      .then(response => {
        dispatch({type: 'ADD_HIGHLIGHT', payload: highlight });
      });
}
export function removeHighlight (highlight) {
  const url = `${BASE_HIGHLIGHTS}/${highlight}`;
  return dispatch =>
    axios.delete(url)
      .then(response => {
        dispatch({type: 'REMOVE_HIGHLIGHT', payload: highlight });
      });
}
export function loadAnnotations (page, highlight) {
  const url = `${BASE_HIGHLIGHTS}/${highlight}${ANNOTATIONS_URI}`;
  return dispatch =>
    axios.get(url)
      .then(response => {
        dispatch({type: 'LOAD_ANNOTATIONS', payload: {page, highlight, annotations: response.data.map(h => h.annotation) }} );
      });
}
export function createAnnotation (annotation) {
  const url = `${BASE_ANNOTATIONS}`;
  return dispatch =>
    axios.post(url, annotation)
      .then(response => {
        dispatch({type: 'ADD_ANNOTATION', payload: annotation });
        dispatch({type: "ANNOTATION_SAVE_SUCCESS"});
      })
}
export function removeAnnotation (annotation) {
  const url = `${BASE_ANNOTATIONS}/${annotation}`;
  return dispatch =>
    axios.delete(url)
      .then(response => {
        dispatch({type: 'REMOVE_ANNOTATION', payload: annotation });
      });
}
