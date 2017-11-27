import React from 'react';
import { shallow }from 'enzyme';
import AnnotationForm from './annotationForm';

test('<AnnotationForm /> submits', () => {
  const mockClick = jest.fn();
  const component = shallow(
    <AnnotationForm handleSubmit={mockClick}></AnnotationForm>
  );
  component.find('form').simulate('submit');
  expect(mockClick).toHaveBeenCalled();
});