import * as plaidActions from '../store/actions/plaid.action'
import * as consts from '../constants.js'

describe('plaid actions', () => {
  it('should give plaid login success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_LOGIN_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidLoginSuccessfully(payload)).toEqual(expectedAction)
  })

  it('should give plaid login fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_LOGIN_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidLoginFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid trans success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_TRANSACTIONS_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidTransactionsSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid trans fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_TRANSACTIONS_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidTransactionsFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid trans each success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_TRANSACTIONS_EACH_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidTransactionsEachSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid cat success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_CATEGORY_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidCategoriesSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid cat fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_CATEGORY_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidCategoriesFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid net worth success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_NET_WORTH_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidNetWorthSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid net worth fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_NET_WORTH_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidNetWorthFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid monthly express success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_MONTHLY_EXPENSE_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidMonthlyExpensesSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid monthly express fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_MONTHLY_EXPENSE_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidMonthlyExpensesFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid monthly income success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_MONTHLY_INCOME_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidMonthlyIncomeSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid monthly income fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_MONTHLY_INCOME_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidMonthlyIncomeFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid bill success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_ALL_BILLS_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidBillsSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid bill fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_ALL_BILLS_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidBillsFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid due date update success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_UPDATE_DUE_DATE_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidBillUpdateSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid due date update success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_UPDATE_DUE_DATE_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidBillUpdateFailed(payload)).toEqual(expectedAction)
  })

  it('should give plaid graph data success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_GRAPH_DATA_SUCCESS,
        payload: payload,
    }
    expect(plaidActions.plaidGraphDataSuccess(payload)).toEqual(expectedAction)
  })

  it('should give plaid graph data fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.PLAID_GET_GRAPH_DATA_FAILED,
        payload: payload,
    }
    expect(plaidActions.plaidGraphDataFailed(payload)).toEqual(expectedAction)
  })
})