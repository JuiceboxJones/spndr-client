import React from 'react';
import ReactDOM from 'react-dom';
import RegistrationPage from './RegistrationPage'
import renderer from 'react-test-renderer'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegistrationPage />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const tree = renderer
    .create(<RegistrationPage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});