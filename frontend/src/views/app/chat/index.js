import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';

import ReactWordcloud from 'react-wordcloud';
import { useNavigate } from 'react-router-dom';

import { Card, CardBody, Row } from 'reactstrap';
// import { Card, CardBody, Row } from "reactstrap";
import { Colxx } from '../../../common/CustomBootstrap';

import { useParams } from 'react-router-dom';

import {
  FaPaperPlane,
  FaUpload,
  FaWhatsapp,
  FaRegWindowClose,
} from 'react-icons/fa';
import {
  postChat,
  getTrendingTopics,
  getEmpTimeOff,
} from '../../../redux/actions';

import {
  AreaChart,
  BarChart,
  PieChart,
  PolarAreaChart,
  RadarChart,
  ScatterChart,
} from '../../../components/Chart/index';
import { chartTooltip } from '../../../components/Chart/util';

import {
  polarAreaChartData,
  scatterChartData,
  barChartData,
  radarChartData,
  pieChartData,
  conversionChartData,
} from '../../../components/Chart/charts';
// import BasicCarouselItem from '../../components/carousel';
import PerfectScrollbar from 'react-perfect-scrollbar';
import MessageCard from '../../../components/applications/MessageCard';
import GraphMsgCard from '../../../components/applications/GraphMsgCard';
import { NotificationManager } from '../../../common/react-notifications';
import paymentModeImg from '../../../assets/img/payment-mode.png';

const pieChartOptions = {
  legend: {
    display: false,
    position: 'bottom',
    labels: {
      padding: 30,
      usePointStyle: true,
      fontSize: 12,
    },
  },
  responsive: true,
  maintainAspectRatio: false,
  title: {
    display: false,
  },
  layout: {
    padding: {
      bottom: 20,
    },
  },
  tooltips: chartTooltip,
};

const Copilot = ({
  adaptiveCards,
  postChatAction,
  dataAI,
  isLoading,
  isChatLoading,
  responseType,
}) => {
  let { copilotName } = useParams();
  const [leftsecTion, setLeftSection] = useState(true);
  const scrollBarRef = useRef(null);
  const [activeTab, setActiveTab] = useState('1');
  const [chatSearch, setChatSearch] = useState('');
  const [searchName, setSearchName] = useState(null);
  const [record, setRecord] = useState(false);
  const [dataAI_, setDataAI] = useState([]);
  const [infoLabel, setInfoLabel] = useState(true);

  const searchFun = (query = null) => {
    if (chatSearch === '' && query === null) return;
    setInfoLabel(false);
    postChatAction({
      keyword: query ? query : chatSearch,
      copilot: copilotName,
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
    }, 100);
  };

  useEffect(() => {
    focusScrollBottom();
  }, [isChatLoading]);

  useEffect(() => {
    setDataAI(dataAI);
  }, [dataAI]);

  const handleChatInputPress = (e) => {
    if (e.key === 'Enter') {
      if (searchName.length > 0) {
        searchFun();
        focusScrollBottom();
      }
    }
  };
  const handleSendButtonClick = () => {
    if (searchName.length > 0) {
      searchFun();
      focusScrollBottom();
    }
  };
  useEffect(() => {
    if (adaptiveCards) {
      setLeftSection(() =>
        adaptiveCards.filter((card) => card.priority < 4).length ? true : false
      );
    }
  }, [adaptiveCards]);

  const getAdaptiveCard = (card) => {
    switch (card.type) {
      case 4:
        return <SliderCard key={card.priority} cardData={card} />;

      case 2:
        return <TextCard cardData={card} />;

      case 3:
        return <ListCard cardData={card} />;

      // case 4:
      //   return <ListCard cardData={card} />;
    }
  };

  return (
    <>
      <Row>
        <Colxx className="d-sm-none d-md-flex flex-direction-column" md="3">
          <div className="left-items">
            <h3 className="mb-2">Trending Topics</h3>
            <Card className="text-card">
              <CardBody>
                {/* {treningTopics?.map((topic) => (
                  <button
                    type="button"
                    className="btn-outline-zenus btn mb-2"
                    onClick={() => searchFun(topic.query)}
                  >
                    {topic.query}
                  </button>
                ))} */}
                <button
                  type="button"
                  className="btn-outline-zenus btn mb-2"
                  onClick={() => searchFun('How do I pay my bills?')}
                >
                  How do I pay my bills?
                </button>
                <button
                  type="button"
                  className="btn-outline-zenus btn mb-2"
                  onClick={() => searchFun('How do I setup a new service?')}
                >
                  How do I setup a new service?
                </button>
                <button
                  type="button"
                  className="btn-outline-zenus btn mb-2"
                  onClick={() => searchFun('What services do you offer?')}
                >
                  What services do you offer?
                </button>
              </CardBody>
            </Card>
          </div>
        </Colxx>
        <Colxx
          sm="12 align-items-stretch flex-direction-column d-flex"
          md={'9'}
        >
          <Card className="chat-bot mt-3">
            <CardBody className="p-0">
              <div className="chat-box">
                <PerfectScrollbar
                  ref={scrollBarRef}
                  options={{ suppressScrollX: true, wheelPropagation: false }}
                >
                  <div className="mobius-chat">
                    <h6>
                      <span className="init-name">N</span> NexgAI
                    </h6>
                    <div className="chat-content">
                      <p>Hello, How may I assist you?</p>
                    </div>
                  </div>
                  {dataAI_.length > 0 &&
                    dataAI_.map((d) => {
                      return responseType !== 'json' ? (
                        <MessageCard
                          item={d}
                          copyText={(text) => copyText(text)}
                        />
                      ) : (
                        <GraphMsgCard
                          item={d}
                          copyText={(text) => copyText(text)}
                        />
                      );
                    })}
                </PerfectScrollbar>
              </div>

              <div className="chat-input">
                {infoLabel && (
                  <div className="info-label">
                    <button
                      onClick={() => setInfoLabel(false)}
                      className="btn-muted"
                    >
                      x
                    </button>
                    To get started click on a trending topic or ask anything.
                  </div>
                )}
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
                <FaUpload />
                <input
                  type="text"
                  className="input-control"
                  placeholder="Type here..."
                  value={chatSearch}
                  onChange={(e) => setChatSearch(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.keyCode === 13) searchFun();
                  }}
                />
                <FaPaperPlane onClick={() => searchFun()} />
              </div>
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
    isLoading,
    threadId,
    empTimeOff,
    treningTopics,
    isChatLoading,
    responseType,
  } = dashboard;
  return {
    adaptiveCards,
    dataAI,
    isLoading,
    threadId,
    treningTopics,
    empTimeOff,
    isChatLoading,
    responseType,
  };
};

export default connect(mapStateToProps, {
  postChatAction: postChat,
  // getTrendingTopicsAction: getTrendingTopics,
  // getEmpTimeOffAction: getEmpTimeOff,
})(Copilot);
