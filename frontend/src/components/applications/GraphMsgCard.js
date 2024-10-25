import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FaCaretDown, FaRegWindowClose } from 'react-icons/fa';
import { chatFeedback } from '../../redux/actions';
// import { TextToSpeechComponent } from '../../components/SDK/textToSpeech';
import PerfectScrollbar from 'react-perfect-scrollbar';

// import { BarChart } from '../Chart/index';
import MyBarChart from './MyBarChart';

const GraphMsgCard = ({
  item,
  chatFeedbackAction,
  isFeedLoading,
  initname,
  aiName,
  activeTab,
}) => {
  const [play, setPlay] = useState(false);
  const [msg, setMsg] = useState(null);
  const [feedModal, openFeedbackModal] = useState(false);
  const [chatFeedback, setChatFeedback] = useState(null);
  const [isFeedSubmit, setIsFeedSubmit] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [chartType, setChartType] = useState(null);
  const [tableHeader, setTableHeader] = useState(null);
  const [tableData, setTableData] = useState(null);
  const colors = ['#21c1d6', '#1e88e5'];
  const [sortRow, setSortRow] = useState(null);
  const lightColors = ['rgba(33, 193, 214, 0.4)', 'rgba(30, 136, 229, 0.4)'];

  useEffect(() => {
    if (item) setMsg(item);
  }, [item]);

  useEffect(() => {
    setTableData(chartData);
    setTimeout(function () {}, 1000);
  }, [chartData]);

  const sortTableRow = (i) => {
    setSortRow((prev) => (prev === i ? null : i));
    let data;
    if (typeof tableData[0][Object.keys(tableData[0])[i]] === 'string') {
      data = tableData.sort((a, b) =>
        a[Object.keys(tableData[0])[i]].localeCompare(
          b[Object.keys(tableData[0])[i]]
        )
      );
      if (sortRow !== i) {
        data = [...data.reverse()];
      }
    } else {
      data = tableData.sort((a, b) =>
        sortRow !== i
          ? b[Object.keys(tableData[0])[i]] - a[Object.keys(tableData[0])[i]]
          : a[Object.keys(tableData[0])[i]] - b[Object.keys(tableData[0])[i]]
      );
    }
    setTableData([...data]);
  };

  const barData = {
    labels: [],
    datasets: [
      {
        borderColor: colors[1],
        backgroundColor: 'rgba(30, 136, 229, 0.4)',
        hoverBackgroundColor: colors[1],
        borderWidth: 2,
        label: '',
        barThickness: 25,
        data: [],
      },
    ],
  };

  useEffect(() => {
    if (item?.[1] === null) return;
    setChartType(Object.keys(item[1])[0]);
    setChartData(null);
    if (Object.keys(item[1])[0] === 'barChart') {
      barData.labels = [
        ...Object.values(item[1])[0].categories.map((c) =>
          c.length > 10 ? `${c.slice(0, 10)}...` : c
        ),
      ];
      barData.datasets[0].label = Object.values(item[1])[0].yAxisLabel;
      barData.datasets[0].data = Object.values(item[1])[0].values;
      setTimeout(function () {
        setChartData(barData);
      }, 500);
    }

    if (Object.keys(item[1])[0] === 'table') {
      setChartData(Object.values(item[1])[0]);
      setTableHeader(
        item[1].headers !== undefined ? item[1].headers.header : null
      );
    }
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
          {msg[0] !== null && (
            <div className="user-chat">
              <h6>
                Yasmin<span className="init-name">YF</span>
              </h6>
              <div className="chat-content">
                <p>{msg[0]}</p>
              </div>
            </div>
          )}

          {msg[1] !== null && (
            <div className="mobius-chat">
              <h6>
                <span className="init-name">
                  {initname[parseInt(activeTab, 10) - 1]}
                </span>
                {aiName[parseInt(activeTab, 10) - 1]}
              </h6>
              <div className="chat-content">
                {chartType === 'barChart' && chartData && (
                  <h2 className="mb-2">{Object.values(msg[1])[0].title}</h2>
                )}
                {chartType === 'table' && tableData && (
                  <h2 className="mb-2">
                    {Object.values(msg[1].headers.title)}
                  </h2>
                )}
                {chartType === 'barChart' && chartData && (
                  <PerfectScrollbar>
                    <div
                      className={`chart-container`}
                      style={{
                        width: `${chartData.datasets[0].data.length * 35}px`,
                      }}
                    >
                      <MyBarChart data={chartData} />
                    </div>
                  </PerfectScrollbar>
                )}
                <div className={`chart-container`}>
                  {chartType === 'table' && tableData && (
                    <div className="table-responsive">
                      <table className="table bg-white table-striped table-bordered">
                        <thead>
                          <tr>
                            {Object.keys(tableData[0]).map((t, i) => (
                              <th
                                className={sortRow === i ? 'sort' : ''}
                                key={`row_${i + 1}_${t.replaceAll(' ', '_')}`}
                              >
                                {t}
                                <button
                                  className={`btn btn-muted ${
                                    sortRow === i ? 'asc' : ''
                                  }`}
                                  onClick={() => sortTableRow(i)}
                                >
                                  <FaCaretDown />
                                </button>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.keys(tableData[0]).map(
                                (columnName, colIndex) => (
                                  <td key={colIndex}>{row[columnName]}</td>
                                )
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
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
    initname,
    aiName,
  } = dashboard;
  return {
    threadId,
    isLikeFeed,
    feedIds,
    isFeedLoading,
    responseType,
    initname,
    aiName,
  };
};

export default connect(mapStateToProps, {
  chatFeedbackAction: chatFeedback,
})(GraphMsgCard);
