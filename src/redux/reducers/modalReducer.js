import * as types from '../actions/actionTypes';

export function modal(state = { activeModal: null }, action) {
  switch (action.type) {
    case types.RENDER_MODAL:
      return { ...state, activeModal: action.payload };
    default:
      return state;
  }
}

export function user(state = { activeUser: null }, action) {
  switch (action.type) {
    case types.ACTIVE_USER:
      return { ...state, activeUser: action.payload };
    default:
      return state;
  }
}
