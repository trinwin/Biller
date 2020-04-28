import React from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import GoogleAnalytics from 'react-ga';

import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import Store from '../store/store';
import storageMock from './__mock__/MockLocalStore'
import { mount, configure } from 'enzyme';

import App from '../App';
import Landing from '../components/landing/Landing';
import * as consts from '../constants.js'
import LoginPage from '../pages/LoginPage';
import history from '../router/History'
import RegisterPage from '../pages/RegisterPage';
import BillOverview from '../views/BillOverView/BillOverview';
import PlaidLoginPage from '../pages/PlaidLoginPage';
import Banner from '../components/landing/Banner';

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

const mockData = {
  data: "mock",
  email: "mock@mock.com",
  token: "mock_token",
  first_name: "mock_first",
  last_name: "mock_last"
}

const mockPayload = {
  data: "mock",
  email: "mock@mock.com",
  token: "mock_token",
  first_name: "mock_first",
  last_name: "mock_last",
  graph_data: [ ],
  net_worth: 200.00,
  category_expense: [ ],
  monthly_expenses: [ ],
  monthly_income: [ ],
}

configure({adapter: new Adapter()});

describe('main App component', () => {
  const mockAxios = new MockAdapter(axios);
  mockAxios.onPost(`${consts.HOST}${consts.PLAID_ACCESS_TOKEN_URI}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_EACH_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_CATEGORIES_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_NET_WORTH_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_EXPENSES_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_INCOME_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_BILLS_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_GRAPH_DATA_URI}?email=${mockData.email}`, mockData).reply(200, mockPayload);
  mockAxios.onGet(`${consts.HOST}${consts.PLAID_GET_NOTIFICATIONS_URI}?email=${mockData.email}`,mockData).reply(200, mockPayload);
  mockAxios.onPost(`${consts.HOST}${consts.PLAID_MARK_NOTIFICATION_READ_URI}`, mockData).reply(200, mockPayload);

  let wrapper;

  beforeEach(() => {
    GoogleAnalytics.set({});
    window.localStorage = storageMock();
    wrapper = mount(
      <Provider store={Store}>
        <App />
      </Provider>
    );
    history.replace("/");
  });

  it('should render correctly as connected component', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render landing page', () => {
    history.push("/");
    wrapper.update();
    expect(wrapper.find(Landing).length).toEqual(1);
  });

  describe('when user has no token', () => {
    it('should go to login page', () => {
      history.push('/login');
      wrapper.update();
      expect(wrapper.find(LoginPage).length).toEqual(1);
    });

    it('should go to register page', () => {
      history.push('/register');
      wrapper.update();
      expect(wrapper.find(RegisterPage).length).toEqual(1);
    })

    it('should not go to setup page', () => {
      history.push('/setup');
      wrapper.update();
      expect(wrapper.find(PlaidLoginPage).length).toEqual(0);
    })

    it('should not go to on dashboard', () => {
      history.push('/dashboard');
      wrapper.update();
      expect(wrapper.find(BillOverview).length).toEqual(0);
    })
  })

  describe('when user has token', () => {
    beforeEach(() => {
      localStorage.setItem(consts.USER_TOKEN, mockData.token);
      localStorage.setItem(consts.USER_EMAIL, mockData.email);
      localStorage.setItem(consts.USER_FIRST_NAME, mockData.first_name);
      localStorage.setItem(consts.USER_LAST_NAME, mockData.last_name);
      wrapper = mount(
        <Provider store={Store}>
          <App />
        </Provider>
      );
    });

    it('should render landing page', () => {
      history.push("/");
      wrapper.update();
      expect(wrapper.find(Landing).length).toEqual(1);  
    })

    it('should not go to login page', () => {
      history.push("/login");
      wrapper.update();
      expect(wrapper.find(LoginPage).length).toEqual(0);  
    })

    it('should not go to register page', () => {
      history.push("/register");
      wrapper.update();
      expect(wrapper.find(RegisterPage).length).toEqual(0);  
    })

    it('should go to setup page', () => {
      history.push('/setup');
      wrapper.update();
      expect(wrapper.find(PlaidLoginPage).length).toEqual(1);
    })

    it('should go to on dashboard', () => {
      history.push('/dashboard');
      wrapper.update();
      expect(wrapper.find(BillOverview).length).toEqual(1);
    })
  })
});
