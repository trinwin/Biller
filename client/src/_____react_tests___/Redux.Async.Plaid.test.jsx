import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

import * as consts from '../constants.js'
import * as plaidAct from '../api/plaid.api.js'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('plaid API actions', () => {
  let mockAxios;
  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  describe('plaid API login', () => {
    it('creates PLAID_LOGIN_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
      }

      mockAxios.onPost(`${consts.HOST}${consts.PLAID_ACCESS_TOKEN_URI}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_LOGIN_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidLogin(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_LOGIN_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_ACCESS_TOKEN_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidLogin(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_LOGIN_FAILED)
      })
    });
  });
  
  describe('plaid API transactions', () => {
    it('creates PLAID_GET_TRANSACTIONS_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_TRANSACTIONS_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidTransactions(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_TRANSACTIONS_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidTransactions(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_TRANSACTIONS_FAILED)
      })
    });
  });

  describe('plaid API transactions each', () => {
    it('creates PLAID_GET_TRANSACTIONS_EACH_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_EACH_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_TRANSACTIONS_EACH_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidTransactionsEach(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_TRANSACTIONS_EACH_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_TRANSACTIONS_EACH_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidTransactionsEach(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_TRANSACTIONS_EACH_FAILED)
      })
    });
  });

  describe('plaid API categories', () => {
    it('creates PLAID_GET_CATEGORY_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_CATEGORIES_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_CATEGORY_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidCategories(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_CATEGORY_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_CATEGORIES_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidCategories(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_CATEGORY_FAILED)
      })
    });
  });

  describe('plaid API net worth', () => {
    it('creates PLAID_GET_NET_WORTH_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_NET_WORTH_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_NET_WORTH_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidNetWorth(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_NET_WORTH_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_NET_WORTH_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidNetWorth(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_NET_WORTH_FAILED)
      })
    });
  });

  describe('plaid API monthly expenses', () => {
    it('creates PLAID_GET_MONTHLY_EXPENSE_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_EXPENSES_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_MONTHLY_EXPENSE_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidMonthlyExpenses(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_MONTHLY_EXPENSE_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_EXPENSES_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidMonthlyExpenses(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_MONTHLY_EXPENSE_FAILED)
      })
    });
  });

  describe('plaid API monthly income', () => {
    it('creates PLAID_GET_MONTHLY_EXPENSE_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_INCOME_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_MONTHLY_INCOME_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidMonthlyIncome(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_MONTHLY_EXPENSE_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_MONTHLY_INCOME_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidMonthlyIncome(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_MONTHLY_INCOME_FAILED)
      })
    });
  });

  describe('plaid API bills', () => {
    it('creates PLAID_GET_ALL_BILLS_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_BILLS_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_ALL_BILLS_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidBills(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_ALL_BILLS_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_BILLS_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidBills(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_ALL_BILLS_FAILED)
      })
    });
  });

  describe('plaid API graph data', () => {
    it('creates PLAID_GET_GRAPH_DATA_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_GRAPH_DATA_URI}?email=${mockData.email}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_GET_GRAPH_DATA_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidGraphData(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_GET_GRAPH_DATA_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_GRAPH_DATA_URI}?email=${mockData.email}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.plaidGraphData(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_GET_GRAPH_DATA_FAILED)
      })
    });
  });

  describe('plaid API change due date', () => {
    it('creates PLAID_UPDATE_DUE_DATE_SUCCESS', () => {
      const payload = {
        isGood: true
      };

      const mockData = {
        data: "mock",
        email: "mock@mock.com"
      }

      mockAxios.onPost(`${consts.HOST}${consts.PLAID_BILLS_DATE_UPDATE}`, mockData).reply(200, payload);

      const expectedActions = [{ type: consts.PLAID_UPDATE_DUE_DATE_SUCCESS, payload }]
      const store = mockStore({});

      return store.dispatch(plaidAct.changeDueDate(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      })
    });

    it('creates PLAID_UPDATE_DUE_DATE_FAILED', () => {
      const mockData = {
        data: "bad mock"
      }

      mockAxios.onGet(`${consts.HOST}${consts.PLAID_BILLS_DATE_UPDATE}`, mockData).reply(405, {'message': "bad"});
      const store = mockStore({});

      return store.dispatch(plaidAct.changeDueDate(mockData)).then(() => {
        // return of async actions
        expect(store.getActions()[0].type).toEqual(consts.PLAID_UPDATE_DUE_DATE_FAILED)
      })
    });
  });
});