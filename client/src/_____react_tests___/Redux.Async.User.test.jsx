import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as consts from '../constants.js'
import * as loginAct from '../api/login.api.js'
import * as registerAct from '../api/register.api.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('user API actions', () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  describe('login API actions', () => {
    it('creates login_success', () => {
      const payload = {
        'email': "Mock@email.com", 
        'token': "MockToken",
        'has_profile': true, 
        'first_name': "Mock",
        'last_name': "Mock",
      };

      const mockData = {
        email: "Mock@email.com",
        password: "mock",
      }

      mockAxios.onPost(`${consts.HOST}${consts.LOGIN_URI}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.LOGIN_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(loginAct.login(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates login_fail', () => {
      const mockData = {
        email: "Mock@email.com",
        password: "mock",
      }

      mockAxios.onPost(`${consts.HOST}${consts.LOGIN_URI}`, mockData).reply(405, {'message': "Login must take a POST request"});
      const store = mockStore({});

      return store.dispatch(loginAct.login(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.LOGIN_FAILED)
      })
    });
  });

  describe('register API actions', () => {
    it('creates register_success', () => {
      const mockData = {
        email: "Mock@email.com", 
        password: "mock",
        password: "mock",
        first_name: "Mock",
        last_name: "Mock",
      };

      const payload = {
        email: "Mock@email.com",
        token: "mock",
      }

      mockAxios.onPost(`${consts.HOST}${consts.REGISTER_URI}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.REGISTER_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(registerAct.register(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates register_fail', () => {
      const mockData = {
        email: "Mock@email.com", 
        password: "mock",
        password: "mock",
        first_name: "Mock",
        last_name: "Mock",
      };

      mockAxios.onPost(`${consts.HOST}${consts.REGISTER_URI}`, mockData).reply(405, {'message': "Register must take a POST request."});

      const store = mockStore({});

      return store.dispatch(registerAct.register(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.REGISTER_FAILED)
      })
    });
  });
});