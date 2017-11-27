import React from 'react';
import { shallow } from "enzyme";
import Home from './home';
import {ContentListContainer} from '../content-list/contentList';

it('renders without crashing', () => {
  const app = shallow(<Home />);
  expect(app.length).toBeDefined()
});

it('renders 1 <ContentList />', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find(ContentListContainer).length).toEqual(1);
});
