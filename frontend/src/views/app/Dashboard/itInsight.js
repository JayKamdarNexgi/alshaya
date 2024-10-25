import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

// import ReactWordcloud from 'react-wordcloud';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';

import { Card, CardBody, Row, Nav, TabContent, TabPane } from 'reactstrap';
// import { Card, CardBody, Row } from "reactstrap";
import { Colxx } from '../../../common/CustomBootstrap';

import { FaPaperPlane, FaUpload, FaWindowRestore } from 'react-icons/fa';
import { postChat, resetChat, uploadFile } from '../../../redux/actions';

import {
  AreaChart,
  BarChart,
  PieChart,
  LineChart,
} from '../../../components/Chart/index';

import {
  barChartData,
  lineChartData,
  pieChartData,
  conversionChartData,
  jiraTicketStatusData,
  raisedTicketData,
  resetPassTicketData,
  empOnboardData,
} from '../../../components/Chart/charts';
// import BasicCarouselItem from '../../components/carousel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MessageCard from '../../../components/applications/MessageCard';
import GraphMsgCard from '../../../components/applications/GraphMsgCard';
import { NotificationManager } from '../../../common/react-notifications';

const ITCopilot = ({
  postChatAction,
  dataAI,
  isLoading,
  initMsg,
  isChatLoading,
  resetChatAction,
  uploadFileAction,
  ITInsightChat,
  OnBoardingChat,
  PasswordResetChat,
  JiraTicketCreationChat,
  ProjectManagementChat,
  CodeGenerationChat,
}) => {
  const scrollBarRef = useRef(null);
  const [activeTab, setActiveTab] = useState('9');
  const [chatSearch, setChatSearch] = useState('');
  const [searchName, setSearchName] = useState(null);
  const [record, setRecord] = useState(false);
  const [dataAI_, setDataAI] = useState([]);

  useEffect(() => {
    resetChatAction({ activeTab, resetChat: false });
    setTimeout(() => {
      document.getElementById('chat_input').focus();
    }, 700);
  }, [activeTab]);

  const searchFun = (query = null) => {
    if (chatSearch === '' && query === null) return;
    postChatAction({
      keyword: query ? query : chatSearch,
      copilot: activeTab,
    });
    setChatSearch('');
  };
  const startRecording = () => {
    setRecord(true);
  };

  const stopRecording = () => {
    setRecord(false);
  };
  const onWord = (word_) => {
    console.log('onWord: ', word_);
    setSearchName(word_);
  };
  const onEnd = (word_) => {
    console.log('onEnd: ', word_);
    setSearchName(word_);
    searchFun();
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    NotificationManager.success(
      '',
      'You copied the text successfully',
      3000,
      null,
      null,
      ''
    );
  };

  const focusScrollBottom = () => {
    setTimeout(() => {
      if (scrollBarRef.current) {
        scrollBarRef.current._ps.element.scrollTop =
          scrollBarRef.current._ps.contentHeight;
      }
    }, 200);
  };

  useEffect(() => {
    focusScrollBottom();
  }, [isChatLoading]);

  useEffect(() => {
    switch (activeTab) {
      case '9':
        setDataAI(ITInsightChat);
        return;
      case '2':
        setDataAI(OnBoardingChat);
        return;
      case '3':
        setDataAI(PasswordResetChat);
        return;
      case '4':
        setDataAI(JiraTicketCreationChat);
        return;
      case '5':
        setDataAI(ProjectManagementChat);
        return;
      case '6':
        setDataAI(CodeGenerationChat);
        return;
      case '0':
        setDataAI(dataAI);
    }
  }, [
    ITInsightChat,
    OnBoardingChat,
    PasswordResetChat,
    JiraTicketCreationChat,
    ProjectManagementChat,
    CodeGenerationChat,
    dataAI,
    activeTab,
  ]);
  const navigate = useNavigate();

  return (
    <>
      <Row>
        <Colxx sm="12 align-items-stretch flex-direction-column d-flex">
          <Card className="chat-bot pb-0">
            <CardBody className="p-0">
              <Nav
                tabs
                className="card-header-tabs d-flex justify-content-around mb-4"
              >
                <button
                  className={classnames({
                    active: activeTab === '9',
                    'btn-muted nav-link': true,
                  })}
                  onClick={() => {
                    setActiveTab('9');
                  }}
                >
                  Project Pro
                </button>
              </Nav>
              <Row>
                <Colxx xxs="12">
                  <div className="chat-box small">
                    <PerfectScrollbar
                      ref={scrollBarRef}
                      options={{
                        suppressScrollX: true,
                        wheelPropagation: false,
                      }}
                    >
                      <div className="mobius-chat">
                        <h6>
                          <span className="init-name">N</span> NexgAI
                        </h6>
                        <div className="chat-content">
                          <p>
                            Hello! Welcome to NexgAI Project Management
                            Assistant.
                          </p>
                        </div>
                      </div>
                      {dataAI_.length > 0 &&
                        dataAI_.map((d, i) => {
                          return d[3] !== 'json' ? (
                            <MessageCard
                              item={d}
                              key={`msg_card_${i}`}
                              activeTab={activeTab}
                              copyText={(text) => copyText(text)}
                            />
                          ) : (
                            <GraphMsgCard
                              item={d}
                              key={`g_card_${i}`}
                              copyText={(text) => copyText(text)}
                            />
                          );
                        })}
                    </PerfectScrollbar>
                  </div>

                  <div className="chat-input">
                    {isChatLoading && (
                      <div className="snippet" data-title="dot-pulse">
                        <div className="mobius-chat">
                          <h6>
                            <span className="init-name">N</span>
                          </h6>
                        </div>
                        <div className="stage">
                          <div className="dot-pulse"></div>
                        </div>
                      </div>
                    )}
                    <FaUpload
                      onClick={() => document.getElementById('file').click()}
                    />
                    <input
                      type="file"
                      id="file"
                      name="file"
                      className="d-none"
                      onChange={(e) =>
                        uploadFileAction({ file: e.target.files[0] })
                      }
                    />
                    <input
                      type="text"
                      id="chat_input"
                      className="input-control"
                      placeholder="Type here..."
                      value={chatSearch}
                      onChange={(e) => setChatSearch(e.target.value)}
                      onKeyUp={(e) => {
                        if (e.keyCode === 13) searchFun();
                      }}
                    />
                    <FaPaperPlane
                      onClick={() => searchFun()}
                      className="send"
                    />
                  </div>
                </Colxx>
              </Row>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading" />
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const {
    adaptiveCards,
    dataAI,

    ITInsightChat,
    OnBoardingChat,
    PasswordResetChat,
    JiraTicketCreationChat,
    ProjectManagementChat,
    CodeGenerationChat,
    isLoading,
    threadId,
    empTimeOff,
    treningTopics,
    isChatLoading,
    initMsg,
  } = dashboard;
  return {
    adaptiveCards,
    dataAI,

    ITInsightChat,
    OnBoardingChat,
    PasswordResetChat,
    JiraTicketCreationChat,
    ProjectManagementChat,
    CodeGenerationChat,
    isLoading,
    threadId,
    treningTopics,
    empTimeOff,
    isChatLoading,
    initMsg,
  };
};

export default connect(mapStateToProps, {
  postChatAction: postChat,
  resetChatAction: resetChat,
  uploadFileAction: uploadFile,
  // getTrendingTopicsAction: getTrendingTopics,
  // getEmpTimeOffAction: getEmpTimeOff,
})(ITCopilot);
