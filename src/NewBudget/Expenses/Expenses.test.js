import React from 'react';
import ReactDOM from 'react-dom';
import Expenses from './Expenses'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Expenses />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Expenses />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});