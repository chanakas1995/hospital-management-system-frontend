export default {
  OPEN_CREATE_PATIENT_POPUP: (state, isOpen) => {
    state.popups.createPatientPopup = isOpen;
  },
  ADD_REQUEST: (state) => {
    state.pendingRequestsCount += 1;
  },
  REMOVE_REQUEST: (state) => {
    state.pendingRequestsCount =
      state.pendingRequestsCount > 0 ? state.pendingRequestsCount - 1 : 0;
  },
  SET_MESSAGE: (state, message) => {
    state.message = message;
  },
};
