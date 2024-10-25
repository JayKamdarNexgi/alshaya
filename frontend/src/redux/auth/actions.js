import {
  USER_LOGIN,
  USER_LOGIN_SUCCESS
} from "../contants";

export const userLogin = (credentials) => ({
  type: USER_LOGIN,
  payload: credentials
});

export const userLoginSuccess = (userDetail) => ({
  type: USER_LOGIN_SUCCESS,
  payload: userDetail,
});
