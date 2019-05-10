import * as types from './actionTypes';

export const showModal = modal => {
  return {
    type: types.RENDER_MODAL,
    payload: modal
  };
};
