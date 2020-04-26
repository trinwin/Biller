import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import MonthlyBills from '../components/dashboard/MonthlyBills';


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

describe('MonthlyBills components', () => {
    let initialState = {};
    let store;

    const dummy_data = {
        labels: "chartLabels",
        datasets: [
          {
            label: 'Expenses',
            fill: 'start',
            data: [],
            backgroundColor: 'rgba(255,65,105,0.1)',
            borderColor: 'rgba(255,65,105,1)',
            pointBackgroundColor: '#ffffff',
            pointHoverBackgroundColor: 'rgba(255,65,105,1)',
            borderDash: [3, 3],
            borderWidth: 1,
            pointRadius: 0,
            pointHoverRadius: 2,
          },
          {
            label: 'Income',
            fill: 'start',
            data: [],
            pointBorderColor: 'rgba(0,123,255,1)',
            backgroundColor: 'rgba(0,123,255,0.1)',
            borderColor: 'rgba(0,123,255,1)',
            pointBackgroundColor: '#ffffff',
            pointHoverBackgroundColor: 'rgb(0,123,255)',
            borderWidth: 1.5,
            pointRadius: 0,
            pointHoverRadius: 3,
          },
        ],
      };

    beforeEach(() => {
        store = mockStore(initialState)
        //chartOptions={chartOptions}
    });

    it(' should render MonthlyBills correctly', () => {
        const wrapper = mount(
            <MonthlyBills 
                data={dummy_data}
                
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});