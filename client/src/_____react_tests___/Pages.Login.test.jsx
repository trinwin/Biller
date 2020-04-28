import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Redirect, Route } from "react-router-dom";
import React from 'react';
import {Input, Button} from 'antd';
import Adapter from 'enzyme-adapter-react-16';
import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';

import * as authActions from '../store/actions/auth.action'
import * as consts from '../constants.js'
import * as loginAct from '../api/login.api.js'

import LoginPage from '../pages/LoginPage';
import Login from '../components/Login';




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

describe('login page / component', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  it('should render correctly', () => {
    const wrapper = shallow(
      <LoginPage store={store}/>
    );

    expect(wrapper).toMatchSnapshot();
  });

  describe("when user interacts with component", () => {
    it('should render form', () => {
      const onLogin = jest.fn();
      const wrapper = shallow(
        <Login onClick = {onLogin} />
      );
    
      expect(wrapper.find(Input).length).toBe(1); // User
      expect(wrapper.find(Input.Password).length).toBe(1); // Password
      expect(wrapper.find(Button).length).toBe(1); // Submit

      //AntD tests form component. We don't need to test.
    });
  });

  describe("when user is logged in", () => {
    it('should contain redirect', () => {
      // const mockAxios = new MockAdapter(Axios);
      // const payload = {
      //   'email': "Mock@email.com", 
      //   'token': "MockToken",
      //   'has_profile': true, 
      //   'first_name': "Mock",
      //   'last_name': "Mock",
      // };
      // const mockData = {
      //   email: "Mock@email.com",
      //   password: "mock",
      // }
      // mockAxios.onPost(`${consts.HOST}${consts.LOGIN_URI}`, mockData).reply(200, payload);
      // let user = {
      //   token: 'mock', 
      //   has_profile: true
      // }

      // const wrapper = mount(
      //   <MemoryRouter initialEntries={['/login']}>
      //     <LoginPage user={user} store={store}/>
      //   </MemoryRouter>
      //);
    });

    it('should redirect the user to dashboard', () => {
     
    });

  });
});