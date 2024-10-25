import { USER_LOGIN_SUCCESS } from "../contants";

const INIT_STATE = {
  authUser: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      window.location.reload();
      return {
        ...state,
        authUser: action.payload.userDetail,
      };
    default:
      return state;
  }
};
