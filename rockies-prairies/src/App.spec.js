import React from 'react';
import { shallow } from "enzyme";
import App from './App';

jest.mock('rangy');
jest.mock('rangy/lib/rangy-highlighter');
jest.mock('rangy/lib/rangy-classapplier');

it('renders without crashing', () => {
  const app = shallow(<App />);
  expect(app.length).toBeDefined()
});