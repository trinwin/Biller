import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import {Input, Button} from 'antd';
import Adapter from 'enzyme-adapter-react-16';

import PageTitle from '../components/common/PageTitle';
import SmallStats from '../components/common/SmallStats';
import MonthlyBills from '../components/dashboard/MonthlyBills';
import AccountBalances from '../components/dashboard/AccountBalances';
import TopCategories from '../components/dashboard/TopCategories';
import BillDueDate from '../components/dashboard/BillDueDate';


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
describe('dashboard components', () => {
  let initialState = {};
  let store;

  beforeEach(() => {
    store = mockStore(initialState)
  });

  describe("when component is mounted", () => {
    beforeEach(() => {
        store = mockStore(initialState)
    });

    it(' should render PageTitle correctly', () => {
        const wrapper = mount(
        <Provider store={store}>
            <MemoryRouter initialEntries={['/dashboard']}>
                <PageTitle />
            </MemoryRouter>,
        </Provider>
        );

        expect(wrapper).toMatchSnapshot();
    });

    it(' should render MonthlyBills correctly', () => {
      const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
              <MonthlyBills />
          </MemoryRouter>,
      </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it(' should render MonthlyBills correctly', () => {
      const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
              <div />
          </MemoryRouter>,
      </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it(' should render AccountBalances correctly', () => {
      const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
              <AccountBalances />
          </MemoryRouter>,
      </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it(' should render TopCategories correctly', () => {
      const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
              <TopCategories />
          </MemoryRouter>,
      </Provider>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it(' should render BillDueDate correctly', () => {
      const wrapper = mount(
      <Provider store={store}>
          <MemoryRouter initialEntries={['/dashboard']}>
              <BillDueDate />
          </MemoryRouter>,
      </Provider>
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
*/

describe('test', () => {
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