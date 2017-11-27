
import { Promise } from 'bluebird';

const data = require('./data.json');

export default {
  getPosts: () => new Promise(resolve => resolve(data)),
  sendMarkup: () => new Promise(resolve => resolve({})),
};
