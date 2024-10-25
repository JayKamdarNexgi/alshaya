import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import instance from '../../common/customeAxios';
import { USER_LOGIN } from '../contants';
import { userLoginSuccess } from './actions';
import { NotificationManager } from '../../common/react-notifications';

const userLoginAsync = async (credentials) => {
  // eslint-disable-next-line no-return-await
  return await instance
    .post('/login', credentials)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

function* userLogin({ payload }) {
  try {
    const userLoginResponce = yield call(userLoginAsync, payload);
    yield put(userLoginSuccess(userLoginResponce));
    localStorage.setItem('_cisco.auth_token', 'token'); // userLoginResponce.data
    NotificationManager.primary(
      '',
      'You have Successfully Loggedin',
      3000,
      null,
      null,
      ''
    );
  } catch (error) {
    console.log(error);
    // localStorage.setItem("_cisco.auth_token", "token"); // userLoginResponce.data
  }
}

export function* watchUserLogin() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(USER_LOGIN, userLogin);
}

export default function* rootSaga() {
  yield all([fork(watchUserLogin)]);
}
