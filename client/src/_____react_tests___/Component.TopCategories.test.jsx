import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import TopCategories from '../components/dashboard/TopCategories';

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

describe('TopCategories components', () => {
    let initialState = {};
    let store;

    beforeEach(() => {
        store = mockStore(initialState)
    });

    it(' should render TopCategories correctly', () => {
        const wrapper = mount(
            <TopCategories 
            category_expense = {[  ]}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});