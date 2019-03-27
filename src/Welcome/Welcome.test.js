import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Welcome />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Welcome />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});