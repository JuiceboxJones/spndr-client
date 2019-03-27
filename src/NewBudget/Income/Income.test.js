import React from 'react';
import ReactDOM from 'react-dom';
import Income from './Income'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Income />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<Income />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});