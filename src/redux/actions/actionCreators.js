import * as types from './actionTypes.js';

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

export const setActiveThread = threadId => {
  return {
    type: types.SET_ACTIVE_THREAD,
    payload: threadId
  };
};

export const switchSpaces = spaceId => {
  return { type: types.SHOW_SPACES_THREADS, payload: spaceId };
};

export const resetSpace = () => {
  return { type: types.RESET_SPACE };
};

export const resetPassword = () => {
  return { type: types.RESET_PASSWORD };
};

export const resetPasswordDone = () => {
  return { type: types.RESET_PASSWORD_DONE };
};

export const editingProfile = () => {
  return { type: types.EDITING_PROFILE };
};

export const editingProfileDone = () => {
  return { type: types.EDITING_PROFILE_DONE };
};
export const resetThread = () => {
  return { type: types.RESET_THREAD };
};
