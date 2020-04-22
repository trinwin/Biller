import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import PlaidLoginPage from '../pages/RegisterPage';
import SetupAccounts from '../components/setup/SetupAccounts';
import PlaidInstance from '../components/setup/PlaidInstance';


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

describe('plaid login page / components', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/setup']}>
          <PlaidLoginPage />
        </MemoryRouter>,
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe("when user is not logged in", () => {
    it('should redirect the user to login page', () => {
     
    });
  });

  describe("when user is logged in", () => {
    it('should allow user to connect to plaid API', () => {
     
    });

    it('should show a component to the user after connection with plaid successful', () => {
     
    });
  });

  describe("when user has at least one connected account", () => {
    it('should allow user to go to dashboard', () => {
     
    });
  });
});