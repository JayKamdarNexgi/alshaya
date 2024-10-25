import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

// import ReactWordcloud from 'react-wordcloud';
import { useNavigate } from 'react-router-dom';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { Card, CardBody, Row, Nav, TabContent, TabPane } from 'reactstrap';
// import { Card, CardBody, Row } from "reactstrap";
import { Colxx } from '../../../common/CustomBootstrap';

import { FaPaperPlane, FaUpload } from 'react-icons/fa';
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

const Copilot = ({
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
  aiName,
  initname,
}) => {
  const scrollBarRef = useRef(null);
  const [activeTab, setActiveTab] = useState('0');
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

  const searchFun = (query = null, reset = false) => {
    if (chatSearch === '' && query === null) return;
    postChatAction({
      keyword: query ? query : chatSearch,
      copilot: activeTab,
      reset,
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
      case '1':
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
                    active: activeTab === '0',
                    'btn-muted nav-link': true,
                  })}
                  onClick={() => {
                    setActiveTab('0');
                  }}
                >
                  All
                </button>
                <button
                  className={classnames({
                    active: activeTab === '1',
                    'btn-muted nav-link': true,
                  })}
                  onClick={() => {
                    setActiveTab('1');
                  }}
                >
                  Leader Board
                </button>
                <button
                  className={classnames({
                    active: activeTab === '2',
                    'btn-muted nav-link': true,
                  })}
                  onClick={() => {
                    setActiveTab('2');
                  }}
                >
                  Predictive Purchase Insights
                </button>
              </Nav>
              <Row>
                {dataAI_.length > 0 && (
                  <Colxx xxs="12">
                    <button
                      className="reset-chat-btn btn-outline-zenus"
                      onClick={() => {
                        searchFun('clear', true);
                        resetChatAction({ activeTab, resetChat: true });
                      }}
                    >
                      Reset Chat
                    </button>
                  </Colxx>
                )}
                <Colxx
                  xxs={
                    activeTab === '0' && dataAI_?.length === 0
                      ? '12 mb-3'
                      : '4 b-r'
                  }
                >
                  <TabContent activeTab={activeTab} className="copilot-tabs">
                    <TabPane
                      tabId="0"
                      className={
                        dataAI_?.length === 0
                          ? 'small-charts sm'
                          : 'small-charts'
                      }
                    >
                      {dataAI_?.length === 0 && (
                        <>
                          <Row>
                            <Colxx xxs="4 mx-auto">
                              <Card
                                className="adp-text-card"
                                onClick={() => setActiveTab('1')}
                              >
                                <CardBody>
                                  <h3 className="mb-3">Leader Board</h3>
                                  <LineChart data={lineChartData} />
                                </CardBody>
                              </Card>
                            </Colxx>
                            <Colxx xxs="4 mx-auto">
                              <Card
                                className="adp-text-card"
                                onClick={() => setActiveTab('2')}
                              >
                                <CardBody>
                                  <h3 className="mb-3">
                                    Predictive Purchase Insights
                                  </h3>
                                  <LineChart data={lineChartData} />
                                </CardBody>
                              </Card>
                            </Colxx>

                            {activeTab === '0' && dataAI_.length === 0 && (
                              <Colxx xxs="12">
                                <div className="chat-input pb-0">
                                  {isChatLoading && (
                                    <div
                                      className="snippet"
                                      data-title="dot-pulse"
                                    >
                                      <div className="mobius-chat">
                                        <h6>
                                          <span className="init-name">
                                            {
                                              initname[
                                                parseInt(activeTab, 10) - 1
                                              ]
                                            }
                                          </span>
                                        </h6>
                                      </div>
                                      <div className="stage">
                                        <div className="dot-pulse"></div>
                                      </div>
                                    </div>
                                  )}
                                  <FaUpload
                                    onClick={() =>
                                      document.getElementById('file').click()
                                    }
                                  />
                                  <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    className="d-none"
                                    onChange={(e) =>
                                      uploadFileAction({
                                        file: e.target.files[0],
                                      })
                                    }
                                  />
                                  <input
                                    type="text"
                                    id="chat_input"
                                    className="input-control"
                                    placeholder="Type here..."
                                    value={chatSearch}
                                    onChange={(e) =>
                                      setChatSearch(e.target.value)
                                    }
                                    onKeyUp={(e) => {
                                      if (e.keyCode === 13) searchFun();
                                    }}
                                  />
                                  <FaPaperPlane
                                    className="send"
                                    onClick={() => searchFun()}
                                  />
                                </div>
                              </Colxx>
                            )}
                          </Row>
                        </>
                      )}
                      {dataAI_?.length > 0 && (
                        <PerfectScrollbar
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          <Row>
                            <Colxx xxs="12">
                              <Card
                                className="adp-text-card"
                                onClick={() => setActiveTab('1')}
                              >
                                <CardBody>
                                  <h3 className="mb-3">
                                    Predictive Purchase Insights
                                  </h3>
                                  <LineChart data={lineChartData} />
                                </CardBody>
                              </Card>
                            </Colxx>
                          </Row>
                        </PerfectScrollbar>
                      )}
                    </TabPane>
                    <TabPane tabId="1">
                      <Card className="mb-3">
                        <CardBody>
                          <div className="dis-fit-content">
                            <h3 className="text-center">FAQ's</h3>
                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun('Show me the best performing brands')
                              }
                              title="Show me the best performing brands"
                            >
                              Show me the best performing brands
                            </button>

                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  'Show me which brands are not performing well'
                                )
                              }
                              title="Show me which brands are not performing well"
                            >
                              Show me which brands are not performing well
                            </button>

                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  'Show me breakup of sales across regions'
                                )
                              }
                              title="Show me breakup of sales across regions"
                            >
                              Show me breakup of sales across regions
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                      <Card className="mb-3 d-none">
                        <CardBody>
                          <h3 className="text-center mt-3">Customer Growth</h3>
                          <LineChart data={lineChartData} />
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="2">
                      <Card className="mb-3">
                        <CardBody>
                          <div className="dis-fit-content">
                            <h3 className="text-center">FAQ's</h3>
                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  'Which types of clothing should be prioritized in inventory for the upcoming holiday season in the UAE, based on consumer preferences and trends?'
                                )
                              }
                              title="Which types of clothing should be prioritized in inventory for the upcoming holiday season in the UAE, based on consumer preferences and trends?"
                            >
                              Stocking Inventory for Holiday Season
                            </button>
                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  'What specific measures can American Eagle implement to mitigate the impact of anticipated supply chain disruptions for the upcoming holiday season?'
                                )
                              }
                              title="What specific measures can American Eagle implement to mitigate the impact of anticipated supply chain disruptions for the upcoming holiday season?"
                            >
                              Supply Chain Disruption
                            </button>
                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  "How can I leverage persona data to effectively expand H&M's market share in the UAE? What targeted strategies should be prioritized?"
                                )
                              }
                              title="How can I leverage persona data to effectively expand H&M's market share in the UAE? What targeted strategies should be prioritized?"
                            >
                              Expanding Market Share
                            </button>
                            <button
                              className="btn-zinus mb-2 mt-2"
                              onClick={() =>
                                searchFun(
                                  'Does stocking the new arrivals from muji align with projected demand in the UAE market? What factors should be considered before launching them?'
                                )
                              }
                              title="Does stocking the new arrivals from muji align with projected demand in the UAE market? What factors should be considered before launching them?"
                            >
                              New Arrivals Analysis
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="3">
                      <Card>
                        <CardBody>
                          <h3 className="mb-3 text-center">
                            How to Reset Password?
                          </h3>

                          <div className="text-left">
                            <ol>
                              <li>Click on reset password link</li>
                              <li>Enter your employee ID</li>
                              <li>Enter OTP sent you on your email address</li>
                              <li>Enter new password</li>
                            </ol>
                          </div>
                          <button
                            className="btn-zinus mt-3"
                            title="Please reset my password"
                            onClick={() =>
                              searchFun('Please reset my password')
                            }
                          >
                            Please reset my password
                          </button>
                        </CardBody>
                      </Card>
                      <h3 className="mb-2 mt-3">
                        Raised Tickets for Reset Password
                      </h3>
                      <Card>
                        <CardBody>
                          <div className="chart-container">
                            <BarChart
                              data={resetPassTicketData}
                              key="resetPassTicketData"
                              optSatck={true}
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="4">
                      <Card>
                        <CardBody>
                          <div className="dis-fit-content">
                            <h3 className="mb-3 text-center">Jira Tickets</h3>
                            <button
                              className="btn-zinus mb-2"
                              title="Create jira ticket"
                              onClick={() => searchFun('Create jira ticket')}
                            >
                              Create jira ticket
                            </button>
                            <button
                              className="btn-zinus"
                              title="Check details of existing ticket"
                              onClick={() =>
                                searchFun('Check details of existing ticket')
                              }
                            >
                              Check details of existing ticket
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                      <h3 className="mb-2 mt-3">Jira Tickets Status</h3>
                      <Card>
                        <CardBody>
                          <div className="chart-container">
                            <BarChart
                              data={jiraTicketStatusData}
                              key="jiraTicketStatusData"
                            />
                          </div>
                        </CardBody>
                      </Card>
                    </TabPane>
                    <TabPane tabId="6">
                      <Card className="mb-3">
                        <CardBody>
                          <div className="dis-fit-content">
                            <h3 className="mb-3 text-center">Codes Example</h3>
                            <button
                              className="btn-zinus mb-3"
                              onClick={() =>
                                searchFun(
                                  'Write a program to swap numbers in python'
                                )
                              }
                              title="Write a program to swap numbers in python"
                            >
                              Write a program to swap numbers in python
                            </button>
                            <button
                              className="btn-zinus mb-3"
                              onClick={() =>
                                searchFun(
                                  'Write a program to find a fibonacci of a number'
                                )
                              }
                              title="Write a program to find a fibonacci of a number"
                            >
                              Write a program to find a fibonacci of a number
                            </button>
                            <button
                              className="btn-zinus"
                              onClick={() =>
                                searchFun(
                                  'Write a program to find GCD of two numbers'
                                )
                              }
                              title="Write a program to find GCD of two numbers"
                            >
                              Write a program to find GCD of two numbers
                            </button>
                          </div>
                        </CardBody>
                      </Card>
                      <h3 className="mb-2">Widely Used Languages</h3>
                      <Card>
                        <CardBody>
                          <div className="chart-container">
                            <PieChart data={pieChartData} />
                          </div>
                          <p className="mt-2">
                            Python, Java, JavaScript, C#, C++
                          </p>
                        </CardBody>
                      </Card>
                    </TabPane>
                  </TabContent>
                </Colxx>
                {(activeTab !== '0' || dataAI_.length > 0) && (
                  <>
                    <Colxx
                      xxs={
                        dataAI_?.length > 0 || activeTab !== '0' ? '8' : '12'
                      }
                    >
                      <div
                        className={
                          activeTab === '0' && dataAI_?.length === 0
                            ? 'chat-box'
                            : 'chat-box small'
                        }
                      >
                        <PerfectScrollbar
                          ref={scrollBarRef}
                          options={{
                            suppressScrollX: true,
                            wheelPropagation: false,
                          }}
                        >
                          {activeTab !== '0' && initMsg && (
                            <div className="mobius-chat">
                              <h6>
                                <span className="init-name">
                                  {initname[parseInt(activeTab, 10) - 1]}
                                </span>
                                {aiName[parseInt(activeTab, 10) - 1]}
                              </h6>
                              <div className="chat-content">
                                <p>{initMsg}</p>
                              </div>
                            </div>
                          )}
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
                                  activeTab={activeTab}
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
                                <span className="init-name">
                                  {initname[parseInt(activeTab, 10) - 1]}
                                </span>
                              </h6>
                            </div>
                            <div className="stage">
                              <div className="dot-pulse"></div>
                            </div>
                          </div>
                        )}
                        <FaUpload
                          onClick={() =>
                            document.getElementById('file').click()
                          }
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
                  </>
                )}
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
    aiName,
    initname,
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
    aiName,
    initname,
  };
};

export default connect(mapStateToProps, {
  postChatAction: postChat,
  resetChatAction: resetChat,
  uploadFileAction: uploadFile,
  // getTrendingTopicsAction: getTrendingTopics,
  // getEmpTimeOffAction: getEmpTimeOff,
})(Copilot);
