import * as types from './actionTypes';

export const showModal = modal => {
  return {
    type: types.RENDER_MODAL,
    payload: modal
  };
};

export const setActiveOrg = orgId => {
  return {
    type: types.SET_ACTIVE_ORG,
    payload: orgId
  };
};
