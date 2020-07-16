import { combineReducers } from 'redux'
import defaultState from '@/redux/state.js'

function time(state = defaultState.time, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_TIME':
      return action.data
    default:
      return state
  }
}

function getToken(state = defaultState.token, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SAVE_TOKEN':
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  time,
  getToken
})
