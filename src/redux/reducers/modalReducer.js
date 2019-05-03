import * as types from '../actions/actionTypes';

export function modal(activeModal = 'Modal2', action) {
  switch (action.type) {
    case types.RENDER_MODAL:
      return action.payolad;
    default:
      return activeModal;
  }
}
