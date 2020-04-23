import * as authActions from '../store/actions/auth.action'
import * as consts from '../constants.js'

describe('auth actions', () => {
  it('should give login action success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.LOGIN_SUCCESS,
        payload: payload,
    }
    expect(authActions.loginSuccessfully(payload)).toEqual(expectedAction)
  })

  it('should give login action failed', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.LOGIN_FAILED,
        payload: payload,
    }
    expect(authActions.loginFailed(payload)).toEqual(expectedAction)
  })

  it('should give login action success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.LOGIN_SUCCESS,
        payload: payload,
    }
    expect(authActions.loginSuccessfully(payload)).toEqual(expectedAction)
  })

  it('should give register action success', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.REGISTER_SUCCESS,
        payload: payload,
    }
    expect(authActions.registerSuccessfully(payload)).toEqual(expectedAction)
  })

  it('should give register action fail', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.REGISTER_FAILED,
        payload: payload,
    }
    expect(authActions.registerFailed(payload)).toEqual(expectedAction)
  })

  it('should give set payload info action', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.SET_USER_INFO,
        payload: payload,
    }
    expect(authActions.setUserInfo(payload)).toEqual(expectedAction)
  })

  it('should give update profile action', () => {
    const payload = 'payload'
    const expectedAction = {
        type: consts.UPDATE_PROFILE,
        payload: payload,
    }
    expect(authActions.updateProfile(payload)).toEqual(expectedAction)
  })
})