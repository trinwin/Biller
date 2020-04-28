import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import {Input, Button} from 'antd';
import Adapter from 'enzyme-adapter-react-16';

import * as authActions from '../store/actions/auth.action'
import * as consts from '../constants.js'

import BillOverview from '../views/BillOverview/BillOverview';

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

describe('bill overview page', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  describe("when component is mounted", () => {
    beforeEach(() => {
        store = mockStore(initialState)
    });

    it('should render correctly', () => {
        const wrapper = shallow(
          <BillOverview store={store} />
        );

        expect(wrapper).toMatchSnapshot();
    });
  });

  describe("when user is logged in", () => {
    it('should display correct user bank data', () => {
     
    });
    it('should graph correct bank data', () => {
     
    });
  });

  describe("when user interacts with component", () => {
    it('should work when user change dates', () => {
     
    });
    it('should work when user goes to other pages', () => {
     
    });
  });
});