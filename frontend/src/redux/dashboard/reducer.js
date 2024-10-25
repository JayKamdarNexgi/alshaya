import {
  POST_CHAT,
  POST_CHAT_SUCCESS,
  POST_CHAT_ERROR,
  POST_CHAT_FEEDBACK,
  POST_CHAT_FEEDBACK_SUCCESS,
  GET_TRENDING_TOPICS_SUCCESS,
  EMPLOYEE_TIME_OFF_SUCCESS,
  RESET_CHAT_SUCCESS,
  RESET_CHAT,
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
} from '../contants';

const INIT_STATE = {
  dataAI: [],
  ITInsightChat: [],
  OnBoardingChat: [],
  PasswordResetChat: [],
  JiraTicketCreationChat: [],
  hasErrorMessage: false,
  CodeGenerationChat: [],
  isLoading: false,
  isChatLoading: false,
  isFeedLoading: false,
  threadId: null,
  empTimeOff: null,
  treningTopics: null,
  isLikeFeed: [],
  responseType: [],
  feedIds: [],
  ITinsightChat: [],
  onBoardingChat: [],
  passwordResetChat: [],
  jiraTicketChat: [],
  codeGenChat: [],
  adaptiveCards: [],
  aiName: ['Nexgai', 'Predictive Purchase Insights'],
  initname: ['N', 'PP'],
  copilotInitMsg: [
    'Welcome to Leader Copilot. How may I assist you?',
    // 'Welcome to IT Insight Copilot. How may I assist you?',
    'Welcome to Predictive Purchase Insights. How may I assist you?',
    'Welcome to Reset Password Copilot. How may I assist you?',
    'Welcome to Jira Ticket Creation Copilot. How may I assist you?',
    '',
    'Welcome to Code Generation Copilot. How may I assist you?',
  ],
  initMsg: null,
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case RESET_CHAT:
      return {
        ...state,
        initMsg:
          state.copilotInitMsg[parseInt(action.payload.activeTab, 10) - 1],
        dataAI:
          action.payload.resetChat && action.payload.activeTab === '0'
            ? []
            : state.dataAI,
        ITinsightChat:
          (action.payload.resetChat && action.payload.activeTab === '1') ||
          action.payload.activeTab === '9'
            ? []
            : state.ITinsightChat,
        onBoardingChat:
          action.payload.resetChat && action.payload.activeTab === '2'
            ? []
            : state.onBoardingChat,
        passwordResetChat:
          action.payload.resetChat && action.payload.activeTab === '3'
            ? []
            : state.passwordResetChat,
        jiraTicketChat:
          action.payload.resetChat && action.payload.activeTab === '4'
            ? []
            : state.jiraTicketChat,
        codeGenChat:
          action.payload.resetChat && action.payload.activeTab === '6'
            ? []
            : state.codeGenChat,
      };
    case RESET_CHAT_SUCCESS:
      return {
        ...state,
        dataAI: [],
      };

    case POST_CHAT_FEEDBACK:
      return {
        ...state,
        isLikeFeed:
          state.isLikeFeed.filter((l) => l.id === action.payload.id).length &&
          state.isLikeFeed.filter((l) => l.flag === action.payload.flag)
            .length &&
          action.payload.flag !== 3
            ? [...state.isLikeFeed.filter((l) => l.id !== action.payload.id)]
            : [
                ...state.isLikeFeed,
                { flag: action.payload.flag, id: action.payload.id },
              ],

        feedIds:
          state.feedIds.filter((id) => id === action.payload.id).length &&
          state.isLikeFeed.filter((l) => l.flag === action.payload.flag).length
            ? [...state.feedIds.filter((id) => id !== action.payload.id)]
            : [...state.feedIds, action.payload.id],
        isFeedLoading: action.payload.flag === 3 ? true : false,
      };
    case POST_CHAT_FEEDBACK_SUCCESS:
      return {
        ...state,
        isFeedLoading: false,
      };
    case GET_TRENDING_TOPICS_SUCCESS:
      return {
        ...state,
        treningTopics: action.payload,
      };
    case EMPLOYEE_TIME_OFF_SUCCESS:
      return {
        ...state,
        empTimeOff: action.payload,
      };
    case POST_CHAT:
      if (action.payload.reset)
        return {
          ...state,
          ITInsightChat:
            action.payload.copilot === '1' ? [] : state.ITInsightChat,
          OnBoardingChat:
            action.payload.copilot === '2' ? [] : state.OnBoardingChat,
          PasswordResetChat:
            action.payload.copilot === '3' ? [] : state.PasswordResetChat,
          JiraTicketCreationChat:
            action.payload.copilot === '4' ? [] : state.JiraTicketCreationChat,
          CodeGenerationChat:
            action.payload.copilot === '6' ? [] : state.CodeGenerationChat,
          dataAI: action.payload.copilot === '0' ? [] : state.dataAI,
        };
      return {
        ...state,
        ITInsightChat:
          action.payload.copilot === '1' || action.payload.copilot === '9'
            ? [
                ...state.ITInsightChat,
                { ...[action.payload.keyword, null, null, 'message'] },
              ]
            : state.ITInsightChat,
        OnBoardingChat:
          action.payload.copilot === '2'
            ? [
                ...state.OnBoardingChat,
                { ...[action.payload.keyword, null, null, 'message'] },
              ]
            : state.OnBoardingChat,
        PasswordResetChat:
          action.payload.copilot === '3'
            ? [
                ...state.PasswordResetChat,
                { ...[action.payload.keyword, null, null, 'message'] },
              ]
            : state.PasswordResetChat,
        JiraTicketCreationChat:
          action.payload.copilot === '4'
            ? [
                ...state.JiraTicketCreationChat,
                { ...[action.payload.keyword, null, null, 'message'] },
              ]
            : state.JiraTicketCreationChat,
        CodeGenerationChat:
          action.payload.copilot === '6'
            ? [
                ...state.CodeGenerationChat,
                { ...[action.payload.keyword, null, null, 'message'] },
              ]
            : state.CodeGenerationChat,
        dataAI:
          action.payload.copilot === '0'
            ? [
                ...state.dataAI,
                {
                  ...[action.payload.keyword, null, null, 'message'],
                },
              ]
            : state.dataAI,
        isChatLoading: true,
      };
    case POST_CHAT_ERROR: {
      return {
        ...state,
        isChatLoading: false,
      };
    }
    case POST_CHAT_SUCCESS:
      return {
        ...state,
        isChatLoading: false,
        // threadId:
        //   action.payload.res.status === 200 ? action.payload.res.data.thread_id : null,
        hasErrorMessage: [action.payload.res?.isError],
        ITInsightChat:
          action.payload.copilot === '1' || action.payload.copilot === '9'
            ? [
                ...state.ITInsightChat,
                {
                  ...[
                    null,
                    action.payload.res?.summary,
                    null,
                    'message',
                    // action.payload.res.data.response,
                  ],
                },
                action.payload.res?.chart !== null && {
                  ...[
                    null,
                    {
                      barChart: {
                        categories: [
                          ...action.payload.res.json.map((j) => j[action.payload.res.chart.xlabel]),
                        ],
                        title: action.payload.res.chart.title,
                        values: [
                          ...action.payload.res.json.map((j) => j[action.payload.res.chart.ylabel]),
                        ],
                        xAxisLabel: action.payload.res.chart.xlabel,
                        yAxisLabel: action.payload.res.chart.ylabel,
                      },
                    },
                    null,
                    'json',
                    // action.payload.res.response,
                  ],
                },
                action.payload.res?.table !== null && {
                  ...[
                    null,
                    {
                      table: [...action.payload.res.json],
                      headers: action.payload.res.table,
                    },
                    null,
                    'json',
                    // action.payload.res.response,
                  ],
                },
              ]
            : state.ITInsightChat,
        OnBoardingChat:
          action.payload.copilot === '2' // && action.payload.status === 200
            ? [
                ...state.OnBoardingChat,
                {
                  ...[null, action.payload.res.result.replaceAll('\n', ''), null, 'message'],
                },
              ]
            : state.OnBoardingChat,
        PasswordResetChat:
          action.payload.copilot === '3' && action.payload.res.status === 200
            ? [
                ...state.PasswordResetChat,
                {
                  ...[
                    null,
                    action.payload.res.data.result,
                    action.payload.res.data.invoice
                      ? action.payload.res.data.invoice
                      : null,
                    action.payload.res.data.response,
                  ],
                },
              ]
            : state.PasswordResetChat,
        JiraTicketCreationChat:
          action.payload.copilot === '4' && action.payload.res.status === 200
            ? [
                ...state.JiraTicketCreationChat,
                {
                  ...[
                    null,
                    action.payload.res.data.result,
                    action.payload.res.data.invoice
                      ? action.payload.res.data.invoice
                      : null,
                    action.payload.res.data.response,
                  ],
                },
              ]
            : state.JiraTicketCreationChat,
        CodeGenerationChat:
          action.payload.copilot === '6' && action.payload.res.status === 200
            ? [
                ...state.CodeGenerationChat,
                {
                  ...[
                    null,
                    action.payload.res.data.result,
                    action.payload.res.data.invoice
                      ? action.payload.res.data.invoice
                      : null,
                    action.payload.res.data.response,
                  ],
                },
              ]
            : state.CodeGenerationChat,
        dataAI:
          action.payload.res.status === 200 && action.payload.copilot === '0'
            ? [
                ...state.dataAI,
                {
                  ...[
                    null,
                    action.payload.res.data.result,
                    action.payload.res.data.invoice
                      ? action.payload.res.data.invoice
                      : null,
                    action.payload.res.data.response,
                  ],
                },
              ]
            : state.dataAI,
      };
    case UPLOAD_FILE:
      return {
        ...state,
        dataAI: [
          ...state.dataAI,
          {
            ...[
              URL.createObjectURL(action.payload.file),
              null,
              null,
              'file',
              action.payload.file.name,
            ],
          },
        ],
        isChatLoading: true,
      };
    case UPLOAD_FILE_SUCCESS:
      return {
        ...state,
        dataAI:
          action.payload.res.status === 200
            ? [
                ...state.dataAI,
                {
                  ...[
                    null,
                    action.payload.result,
                    null,
                    action.payload.response,
                  ],
                },
              ]
            : state.dataAI,
        isChatLoading: false,
      };
    default:
      return state;
  }
};
