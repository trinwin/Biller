import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import GoogleAnalytics from 'react-ga';

import App from '../App';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({adapter: new Adapter()});

describe('main App component', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
    GoogleAnalytics.set({});
  });

  it('should render correctly in connected component', () => {
    const wrapper = mount(
      <Provider store={store}>
        <div />
      </Provider>
    );

    const component = wrapper.instance();

    expect(wrapper).toMatchSnapshot();
  });
});
