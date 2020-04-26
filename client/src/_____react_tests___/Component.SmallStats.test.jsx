import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux';
import {mount, shallow, configure } from 'enzyme';
import { MemoryRouter, Router } from "react-router-dom";
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';

import SmallStats from '../components/common/SmallStats';


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
const smallStats = [
    {
      label: 'Net Worth',
      value: `500$`,
      chartLabels: [],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          borderWidth: 1.5,
          backgroundColor: 'rgba(0, 184, 216, 0.1)',
          borderColor: 'rgb(0, 184, 216)',
          data: [],
        },
      ],
    },
    {
      label: 'Number of Accounts',
      value: 13,
      chartLabels: [],
      attrs: { md: '6', sm: '6' },
      datasets: [
        {
          borderWidth: 1.5,
          backgroundColor: 'rgba(23,198,113,0.1)',
          borderColor: 'rgb(23,198,113)',
          data: [],
        },
      ],
    },
];

configure({adapter: new Adapter()});

describe('SmallStats components', () => {
    let initialState = {};
    let store;

    const dummy_data = {
        label: 'Test Card',
        value: `$55555.55`,
        chartLabels: [{ data: [] }],
        attrs: { md: '4', sm: '6' },
        datasets: [{ data: [] }],
    };

    beforeEach(() => {
        store = mockStore(initialState)
    });

    it(' should render SmallStats correctly', () => {
        const wrapper = mount(
            <SmallStats
                id={`small-stats-15`}
                variation="1"
                chartData={dummy_data.datasets}
                chartLabels={dummy_data.chartLabels}
                label={dummy_data.label}
                value={dummy_data.value}
                percentage={dummy_data.percentage}
                increase={dummy_data.increase}
                decrease={dummy_data.decrease}
            />
        );

        expect(wrapper).toMatchSnapshot();
    });
});