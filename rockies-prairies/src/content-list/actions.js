import axios from 'axios';

// TODO move to global parameters
const BASE_URL = 'http://localhost:3001/api';

export function fetchContent () {
  const url = `${BASE_URL}/documents`;
  return dispatch =>
    axios.get(url)
      .then(response => {
        dispatch({type: 'SET_CONTENT', payload: response.data });
      });
}