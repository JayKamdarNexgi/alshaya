import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody, Row } from 'reactstrap';
// import { Card, CardBody, Row } from "reactstrap";
import { Colxx } from '../../common/CustomBootstrap';
import { FaPaperPlane, FaUpload } from 'react-icons/fa';
import { ListCard, SliderCard, TextCard } from '../../components/AdaptiveCard';
// import BasicCarouselItem from '../../components/carousel';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { NotificationManager } from '../../common/react-notifications';

const Dashboard = ({ adaptiveCards }) => {
  const [leftsecTion, setLeftSection] = useState(true);

  useEffect(() => {
    if (adaptiveCards) {
      NotificationManager.primary(
        'Welcome to HRCopilot',
        'Hello Atreya',
        3000,
        null,
        null
      );
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
        {leftsecTion && (
          <Colxx className="d-sm-none d-md-block" md="3">
            {/* <h2 className="mb-3 page-title">
              Hello, <span>Atreya</span>
              <p>Welcome to Mobius HR</p>
            </h2> */}
            <ul>
              {adaptiveCards?.map((card) =>
                card.priority < 4 ? <li>{getAdaptiveCard(card)}</li> : null
              )}
            </ul>
          </Colxx>
        )}
        <Colxx sm="12" md={leftsecTion ? '6' : '9'}>
          <Card className="chat-bot">
            <CardBody>
              <PerfectScrollbar
                options={{ suppressScrollX: true, wheelPropagation: false }}
              >
                <div className="chat-box">
                  <div className="mobius-chat">
                    <h6>
                      <span className="init-name">N</span> NexgAI
                    </h6>
                    <div className="chat-content">
                      <p>Hello Atreya!!! </p>
                      <p>How can I help you today?</p>
                    </div>
                  </div>
                  <div className="user-chat">
                    <h6>
                      <span className="init-name">J</span>Jasim
                    </h6>
                    <div className="chat-content">
                      <p>File my expenses</p>
                    </div>
                  </div>
                  <div className="mobius-chat">
                    <h6>
                      <span className="init-name">N</span> NexgAI
                    </h6>
                    <div className="chat-content">
                      <p>Ok Atreya. As I see 2 nights in New York</p>
                    </div>
                  </div>
                  <div className="user-chat">
                    <h6>
                      <span className="init-name">J</span>Jasim
                    </h6>
                    <div className="chat-content">
                      <p>Yes</p>
                    </div>
                  </div>
                  <div className="mobius-chat">
                    <h6>
                      <span className="init-name">N</span> NexgAI
                    </h6>
                    <div className="chat-content">
                      <p>I have sent expenses to finance.</p>
                    </div>
                  </div>
                </div>
              </PerfectScrollbar>

              <div className="chat-input">
                <FaUpload />
                <input
                  type="text"
                  className="input-control"
                  placeholder="Type here..."
                />
                <FaPaperPlane />
              </div>
            </CardBody>
          </Card>
        </Colxx>
        <Colxx className="d-sm-none d-md-block" md="3">
          {adaptiveCards?.map((card) =>
            card.priority > 3 && card.priority < 7
              ? getAdaptiveCard(card)
              : null
          )}
        </Colxx>
      </Row>
    </>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const { adaptiveCards } = dashboard;
  return { adaptiveCards };
};

export default connect(mapStateToProps, {})(Dashboard);
