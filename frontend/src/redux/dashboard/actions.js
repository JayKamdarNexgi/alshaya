import {
  POST_CHAT,
  POST_CHAT_SUCCESS,
  POST_CHAT_ERROR,
  POST_CHAT_FEEDBACK,
  POST_CHAT_FEEDBACK_SUCCESS,
  POST_CHAT_FEEDBACK_FORM,
  POST_CHAT_FEEDBACK_FORM_SUCCESS,
  GET_TRENDING_TOPICS,
  EMPLOYEE_TIME_OFF,
  GET_TRENDING_TOPICS_SUCCESS,
  EMPLOYEE_TIME_OFF_SUCCESS,
  RESET_CHAT,
  RESET_CHAT_SUCCESS,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
} from '../contants';

export const postChat = (payload) => ({
  type: POST_CHAT,
  payload,
});

export const postChatSuccess = (data) => ({
  type: POST_CHAT_SUCCESS,
  payload: data,
});

export const postChatError = (err) => ({
  type: POST_CHAT_ERROR,
  payload: err
})


export const uploadFile = (payload) => ({
  type: UPLOAD_FILE,
  payload,
});

export const uploadFileSuccess = (data) => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: data,
});

export const chatFeedback = (data) => ({
  type: POST_CHAT_FEEDBACK,
  payload: data,
});

export const chatFeedbackSuccess = (data) => ({
  type: POST_CHAT_FEEDBACK_SUCCESS,
  payload: data,
});

export const chatFeedbackForm = (form) => ({
  type: POST_CHAT_FEEDBACK_FORM,
  payload: form,
});

export const chatFeedbackFormSuccess = () => ({
  type: POST_CHAT_FEEDBACK_FORM_SUCCESS,
});

export const getTrendingTopics = () => ({
  type: GET_TRENDING_TOPICS,
});
export const getEmpTimeOff = (payload) => ({
  type: EMPLOYEE_TIME_OFF,
  payload: payload,
});
export const getTrendingTopicsSuccess = (payload) => ({
  type: GET_TRENDING_TOPICS_SUCCESS,
  payload: payload,
});
export const getEmpTimeOffSuccess = (payload) => ({
  type: EMPLOYEE_TIME_OFF_SUCCESS,
  payload: payload,
});

export const resetChat = (section) => ({
  type: RESET_CHAT,
  payload: section,
});
export const resetChatSuccess = (section) => ({
  type: RESET_CHAT_SUCCESS,
  payload: section,
});
