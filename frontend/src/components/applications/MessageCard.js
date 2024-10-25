import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
// import DOMPurify from 'dompurify';
import {
  FaRegWindowClose,
  FaWindowClose,
  FaFilePdf,
} from 'react-icons/fa';
import { chatFeedback } from '../../redux/actions';
// import { TextToSpeechComponent } from '../../components/SDK/textToSpeech';
import logo from '../../assets/img/logo/logo.svg';

const MessageCard = ({
  item,
  hasErrorMessage,
  chatFeedbackAction,
  isFeedLoading,
  activeTab,
  aiName,
  initname,
}) => {
  const [play, setPlay] = useState(false);
  const [msg, setMsg] = useState(null);
  const [feedModal, openFeedbackModal] = useState(false);
  const [chatFeedback, setChatFeedback] = useState(null);
  const [isFeedSubmit, setIsFeedSubmit] = useState(false);
  const [detailInvoice, setDetailInvoice] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (item) setMsg(item);
  }, [item]);

  useEffect(() => {
    setTimeout(() => {
      if (isFeedSubmit && feedModal) openFeedbackModal(false);
      setIsFeedSubmit(false);
    }, 2000);
  }, [isFeedSubmit]);

  const initName = JSON.parse(localStorage.getItem('user_employee'))
    ?.displayName[0];

  const showSpeeker = () => {
    setPlay(true);
  };
  const hideSpeeker = () => {
    setPlay(false);
  };
  return (
    <>
      {msg && (
        <>
          {/* <TextToSpeechComponent play={play} textToSpeech={msg[1]} /> */}
          {msg[0] && (
            <div className="user-chat">
              <h6>
                Yasim<span className="init-name">YF</span>
              </h6>
              <div className="chat-content">
                {msg?.[3] !== 'file' ? (
                  <p>{msg[0]}</p>
                ) : (
                  <p className="img-uploaded">
                    <img src={msg[0]} />
                    <span>{msg[4]}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {msg[1] && (
            <div className="mobius-chat">
              <h6>
                <span className="init-name">
                  {initname[parseInt(activeTab, 10) - 1]}
                </span>
                {aiName[parseInt(activeTab, 10) - 1]}
              </h6>
              <div className={`chat-content`}>
                {activeTab !== '6' && (
                  <p
                    style={{ whiteSpace: 'pre-line' }}
                    dangerouslySetInnerHTML={{
                      __html: msg[1],
                    }}
                  ></p>
                )}
                {/* <span className="icon_span">
                  {feedIds.includes(msg[2].toString()) &&
                  isLikeFeed.filter((l) => l.flag === 2)?.length ? (
                    <FaThumbsDown
                      title="Dislike"
                      className="icon-button"
                      onClick={() =>
                        chatFeedbackAction({
                          id: msg[2],
                          flag: 2,
                          feedback: null,
                        })
                      }
                    />
                  ) : (
                    <FaRegThumbsDown
                      title="Dislike"
                      className="icon-button"
                      onClick={() =>
                        chatFeedbackAction({
                          id: msg[2],
                          flag: 2,
                          feedback: null,
                        })
                      }
                    />
                  )}
                  {feedIds.includes(msg[2]) &&
                  isLikeFeed.filter((l) => l.flag === 1)?.length ? (
                    <FaThumbsUp
                      title="Like"
                      className="icon-button"
                      onClick={() =>
                        chatFeedbackAction({
                          id: msg[2],
                          flag: 1,
                          feedback: null,
                        })
                      }
                    />
                  ) : (
                    <FaRegThumbsUp
                      className="icon-button"
                      title="Like"
                      onClick={() =>
                        chatFeedbackAction({
                          id: msg[2],
                          flag: 1,
                          feedback: null,
                        })
                      }
                    />
                  )}

                  <FaComment
                    className="icon-button"
                    title="Feedback"
                    onClick={() => openFeedbackModal(true)}
                  />
                  <FaClipboard
                    className="icon-button"
                    title="Copy text"
                    onClick={() => copyText(msg[1])}
                  />
                  {play ? (
                    <FaVolumeMute
                      title="Play"
                      className="icon-button"
                      onClick={hideSpeeker}
                    />
                  ) : (
                    <FaVolumeUp
                      title="Play"
                      className="icon-button"
                      onClick={showSpeeker}
                    />
                  )}
                </span> */}
              </div>
            </div>
          )}

          {feedModal && (
            <div className="feed-form">
              <form>
                <div className="header">
                  <h2 className="title">Feedback</h2>
                  <FaRegWindowClose onClick={() => openFeedbackModal(false)} />
                </div>
                {!isFeedSubmit && (
                  <>
                    <div className="form-group">
                      {!isFeedLoading && (
                        <textarea
                          rows="8"
                          onChange={(e) => setChatFeedback(e.target.value)}
                          value={chatFeedback}
                        ></textarea>
                      )}
                      {isFeedLoading && (
                        <div className="snippet feed" data-title="dot-pulse">
                          <div className="stage">
                            <div className="dot-pulse"></div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        onClick={() => {
                          chatFeedbackAction({
                            id: msg[2],
                            flag: 3,
                            feedback: chatFeedback,
                          });
                          setChatFeedback('');
                          setIsFeedSubmit(true);
                          // openFeedbackModal(false);
                        }}
                        className="btn btn-outline"
                      >
                        Submit
                      </button>
                    </div>
                  </>
                )}
                {isFeedSubmit && (
                  <div className="success-checkmark">
                    <div className="check-icon">
                      <span className="icon-line line-tip"></span>
                      <span className="icon-line line-long"></span>
                      <div className="icon-circle"></div>
                      <div className="icon-fix"></div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
          {detailInvoice && (
            <div className="chat-content detail-invoice">
              <div className="header">
                <p>
                  <img
                    src={logo}
                    title="Nexg AI"
                    alt="Nexg AI Logo"
                    width="200px"
                  />
                </p>
                <h2>
                  Invoice #{invoiceData.invoiceNumber} <span>Unpaid</span>
                </h2>

                <FaWindowClose
                  className="close-invoice"
                  onClick={() => {
                    setInvoiceData(null);
                    setDetailInvoice(false);
                  }}
                />
              </div>

              <div className="d-flex flex-direction-row justify-content-between align-items-end">
                <div className="address">
                  <h3>{invoiceData.shipTo.name}</h3>
                  <p>
                    <span>{invoiceData.shipTo.address}</span>
                  </p>
                  <p>
                    <span>{invoiceData.shipTo.email}</span>
                  </p>
                  <p>
                    <span>{invoiceData.shipTo.phone}</span>
                  </p>
                </div>
                <div className="bill-address">
                  <h3>Billed To:</h3>
                  <h3>{invoiceData.billTo.name}</h3>
                  <p>
                    <span>{invoiceData.billTo.address}</span>
                  </p>
                  <p>
                    <span>{invoiceData.billTo.email}</span>
                  </p>
                  <p>
                    <span>{invoiceData.billTo.phone}</span>
                  </p>
                </div>
              </div>
              <div className="table-responsive">
                <h3>
                  Order Summary
                  <span>
                    Order Date: <i>{invoiceData.date}</i>
                  </span>
                </h3>
                <table className="table">
                  <thead>
                    <tr>
                      <th width="50px">No.</th>
                      <th className="text-left">Description</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.items.map((item, i) => (
                      <tr>
                        <td>{i + 1}</td>
                        <td className="border-r text-left">
                          <h3>{item.description}</h3>
                        </td>
                        <td className="text-center">${item.unitPrice}</td>
                        <td className="text-center">{item.quantity}</td>
                        <td>${Math.imul(item.quantity, item.unitPrice)}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="5" className="p-2 text-right">
                        <h4>Subtotal:</h4> <span>${invoiceData.subtotal}</span>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan="5" className="p-2 text-right">
                        <h4>Tax:</h4> <span>${invoiceData.tax}</span>
                      </td>
                    </tr>
                    <tr className="no-border">
                      <td colSpan="5" className="p-2 text-right">
                        <h4>Total:</h4> <span>${invoiceData.total}</span>
                      </td>
                    </tr>
                    <tr className="no-border">
                      <td colSpan="5" className="p-2 text-right">
                        <button
                          className="btn btn-outline-zenus mr-2"
                          title="Download"
                        >
                          <FaFilePdf />
                        </button>
                        <button className="btn btn-outline-zenus">
                          Pay Now
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {detailInvoice && <div className="invoice-overlay"></div>}
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ dashboard }) => {
  const {
    threadId,
    isLikeFeed,
    feedIds,
    isFeedLoading,
    responseType,
    aiName,
    initname,
    hasErrorMessage
  } = dashboard;
  return {
    threadId,
    isLikeFeed,
    feedIds,
    isFeedLoading,
    responseType,
    aiName,
    initname,
    hasErrorMessage
  };
};

export default connect(mapStateToProps, {
  chatFeedbackAction: chatFeedback,
})(MessageCard);
