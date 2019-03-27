import React from 'react';
import ReactDOM from 'react-dom';
import Wishlist from './Wishlist';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const props = {location:{state:{prev: '/welcome'}}};
  ReactDOM.render(<Wishlist {...props} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders correctly', () => {
  const props = {location:{state:{prev: '/welcome'}}};
  const tree = renderer
    .create(<Wishlist {...props} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});