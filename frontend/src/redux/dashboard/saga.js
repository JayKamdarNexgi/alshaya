import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
  POST_CHAT_FEEDBACK,
  POST_CHAT,
  POST_CHAT_FEEDBACK_FORM,
  GET_TRENDING_TOPICS,
  EMPLOYEE_TIME_OFF,
  UPLOAD_FILE,
} from '../contants';
import {
  postChatSuccess,
  chatFeedbackSuccess,
  postChatError,
  chatFeedbackFormSuccess,
  getEmpTimeOffSuccess,
  getTrendingTopicsSuccess,
  uploadFileSuccess,
} from './actions';
import { NotificationManager } from '../../common/react-notifications';

// axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;
// axios.defaults.baseURL = 'https://staging.cognino.com:8018';
// https://staging.cognino.com:8019/review_csv_agent

const postChatAsync = async ({ copilot, keyword }) => {
  let url =
    copilot === '1'
      ? 'https://staging.cognino.com:8030/chat'
      : 'https://staging.cognino.com:8030/chat';
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {

    success(
      axios({
        url: 'http://localhost:8000/chat',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // Add any auth token here
        },
        data: { query: keyword },
      })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          return {
            summary: error.message,
            table: null,
            chart: null,
            json: null,
            isError: true,
          };
        })
    );
  });
};

const getTopicsAsync = async () => {
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    success(
      axios({
        url: '/trending_topic',
        method: 'GET',
        headers: {
          // 'Content-Type': 'application/json',
          // Add any auth token here
        },
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        })
    );
  })
    .then((res) => res)
    .catch((error) => error);
};

const getEmpTimeOffAsync = async (user_id) => {
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    success(
      axios({
        url: '/get_employee_time_off',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // Add any auth token here
        },
        data: user_id,
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        })
    );
  });
};

const uploadFileAsync = async (payload) => {
  const formData = new FormData();
  formData.append('file', payload.file);

  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    success(
      axios({
        url: 'https://staging.cognino.com:8014/upload_it_onboarding_file?case_id=1',
        method: 'POST',
        headers: {
          'Content-Type':
            'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
          // Add any auth token here
        },
        data: formData,
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        })
    );
  });
};

function* postChat({ payload }) {
  try {
    const postChatRes = yield call(postChatAsync, payload);
    yield put(postChatSuccess({ res: postChatRes, copilot: payload.copilot }));
  } catch (error) {
    yield put(postChatError(error));
  }
}

const postChatFeedbackAsync = async (payload) => {
  // eslint-disable-next-line no-return-await
  return await new Promise((success) => {
    success(
      axios({
        url: '/chat_feedback',
        method: 'POST',
        headers: {
          // 'Content-Type': 'application/json',
          // Add any auth token here
        },
        data: payload,
      })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          return error;
        })
    );
  })
    .then((res) => res)
    .catch((error) => error);
};

const postFeedbackFormAsync = async (feedbackForm) => {
  // eslint-disable-next-line no-return-await
  return await axios
    .post('/feedback', feedbackForm)
    .then((res) => {
      return res;
    })
    .catch((error) => {
      return error;
    });
};

function* postChatFeedback({ payload }) {
  try {
    const postChatFeedbackResponce = yield call(postChatFeedbackAsync, payload);
    yield put(chatFeedbackSuccess(postChatFeedbackResponce.data));
    NotificationManager.success(
      '',
      'Thank you for your feedback',
      3000,
      null,
      null,
      ''
    );
  } catch (error) {
    console.log(error);
  }
}

function* postFeedbackForm({ payload }) {
  try {
    const postFeedbackFormResponce = yield call(postFeedbackFormAsync, payload);
    yield put(chatFeedbackFormSuccess(postFeedbackFormResponce.data));
    NotificationManager.primary(
      '',
      `Feedback Submitted Successfully`,
      3000,
      null,
      null,
      ''
    );
  } catch (error) {
    console.log(error);
  }
}

function* getTrendingTopics() {
  try {
    const getTopicsResponce = yield call(getTopicsAsync);
    yield put(getTrendingTopicsSuccess(getTopicsResponce.data));
  } catch (error) {
    console.log(error);
  }
}

function* getEmpTimeOff({ payload }) {
  try {
    const getEmpTimeOffResponce = yield call(getEmpTimeOffAsync, payload);
    yield put(getEmpTimeOffSuccess(getEmpTimeOffResponce.data));
  } catch (error) {
    console.log(error);
  }
}

function* uploadFile({ payload }) {
  try {
    const uploadFileResponce = yield call(uploadFileAsync, payload);
    yield put(uploadFileSuccess(uploadFileResponce.data));
  } catch (error) {
    console.log(error);
  }
}

export function* watchpostChat() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(POST_CHAT, postChat);
}

export function* watchPostChatFeedback() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(POST_CHAT_FEEDBACK, postChatFeedback);
}

export function* watchPostFeedbackForm() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(POST_CHAT_FEEDBACK_FORM, postFeedbackForm);
}

export function* watchGetTrendingTopics() {
  yield takeEvery(GET_TRENDING_TOPICS, getTrendingTopics);
}
export function* watchGetEmpTimeOff() {
  yield takeEvery(EMPLOYEE_TIME_OFF, getEmpTimeOff);
}
export function* watchUploadFile() {
  yield takeEvery(UPLOAD_FILE, uploadFile);
}

export default function* rootSaga() {
  yield all([
    fork(watchpostChat),
    fork(watchPostChatFeedback),
    fork(watchPostFeedbackForm),
    fork(watchGetTrendingTopics),
    fork(watchGetEmpTimeOff),
    fork(watchUploadFile),
  ]);
}
