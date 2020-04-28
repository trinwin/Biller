import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Link } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import storageMock from './__mock__/MockLocalStore';

import * as consts from '../constants.js';

import Landing from '../components/landing/Landing';
import Header from '../components/landing/Header';
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

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

configure({adapter: new Adapter()});

describe('landing page / components', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
    window.localStorage = storageMock();
  });

  it('should render correctly', () => {

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <Landing />
      </MemoryRouter>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe("when user does not have a token", () => {
    it('should show register / login buttons', () => {
      const wrapper = shallow(
        <Banner />
      );

      const regButton = wrapper.find('.landing-register-button');
      const loginButton = wrapper.find('.landing-login-button');
      const dashboardButton = wrapper.find('.landing-dashboard-button');

      expect(regButton.length).toEqual(1);
      expect(loginButton.length).toEqual(1);
      expect(dashboardButton.length).toEqual(0);
    });
  });

  describe("when user has a token", () => {
    it('should show register / dashboard buttons', () => {
      localStorage.setItem(consts.USER_TOKEN, "mock");

      const wrapper = shallow(
        <Banner />
      );

      const regButton = wrapper.find('.landing-register-button');
      const loginButton = wrapper.find('.landing-login-button');
      const dashboardButton = wrapper.find('.landing-dashboard-button');

      expect(regButton.length).toEqual(1);
      expect(loginButton.length).toEqual(0);
      expect(dashboardButton.length).toEqual(1);
    });
  });
});