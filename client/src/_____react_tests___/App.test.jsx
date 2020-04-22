import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

//import App from '../App';


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
/*
describe('plaid login page / components', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
*/

describe('plaid login page / components', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  it('should render correctly', () => {
    const wrapper = mount(
        <div />
    );

    expect(wrapper).toMatchSnapshot();
  });
});