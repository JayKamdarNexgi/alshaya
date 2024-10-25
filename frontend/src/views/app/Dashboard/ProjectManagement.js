import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx } from '../../../common/CustomBootstrap';
// // import { CircularProgressbar } from 'react-circular-progressbar';
import { PieChart, BarChart } from '../../../components/Chart/index';
import {
  resourceBarChartOptions,
  resourcePieChartOptions,
} from '../../../components/Chart/config';

import {
  pieChartReviewsData,
  resourceBarChartData,
} from '../../../components/Chart/charts';
import {
  FaArrowLeft,
  FaLongArrowAltUp,
  FaSort,
  FaSortDown,
  FaSortUp,
} from 'react-icons/fa';

const ProjectManagement = () => {
  const navigate = useNavigate();

  return (
    <div className="container project-mgmt">
      <button className="mb-3 btn-muted" onClick={() => navigate('/dashboard')}>
        <FaArrowLeft className="mr-2" />
        Go Back
      </button>
      <Row>
        <Colxx xxs="3">
          <Card className="status-card new-proj">
            <CardBody>
              {/* <h3 className="fw-light mb-0">23</h3> */}
              <h4>New Projects</h4>

              {/* <CircularProgressbar value="10" text="23" /> */}
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="3">
          <Card className="status-card on-going">
            <CardBody>
              {/* <h3 className="fw-light mb-0">32</h3> */}
              <h4>On Going Projects</h4>

              {/* <CircularProgressbar danger value="20" text="23" /> */}
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="3">
          <Card className="status-card success">
            <CardBody>
              {/* <h3 className="fw-light mb-0">142</h3> */}
              <h4>Completed Projects</h4>

              {/* <CircularProgressbar value="70" text="142" /> */}
            </CardBody>
          </Card>
        </Colxx>
        <Colxx xxs="3">
          <Card className="status-card success-dark">
            <CardBody>
              {/* <h3 className="fw-light mb-0">324</h3> */}
              <h4>Total Projects</h4>

              {/* <CircularProgressbar value="100" text="324" /> */}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="12 mt-4">
          <Card>
            <CardBody>
              <h3>Projects Status</h3>
              <div className="table-responsive mt-3">
                <table className="table stylish-table v-middle mb-0 no-wrap text-left">
                  <thead>
                    <tr>
                      <th className="border-0 text-muted fw-normal">
                        Project Assigned to:
                      </th>
                      <th className="border-0 text-muted fw-normal">
                        Project Title
                      </th>
                      <th className="border-0 text-muted fw-normal">
                        Priority
                      </th>
                      <th className="border-0 text-muted fw-normal text-center">
                        Resources Allocated
                      </th>
                      <th className="border-0 text-muted fw-normal text-center">
                        Suggested Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <h6 className="font-weight-medium mb-0">Nirav Joshi</h6>
                      </td>
                      <td>EAZY BENEFITPAY QR M</td>
                      <td>
                        <span className="badge bg-success px-2 py-1 text-white">
                          Low
                        </span>
                      </td>
                      <td className="text-center">21</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="text-muted btn btn-muted p-2 mb-2"
                        >
                          No action needed
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="font-weight-medium mb-0">Micheal Doe</h6>
                      </td>
                      <td>JASMIS CORPORATION W. BA</td>
                      <td>
                        <span className="badge bg-danger px-2 py-1 text-white">
                          High
                        </span>
                      </td>
                      <td className="text-center">15</td>
                      <td className="text-center">
                        <button type="button" className="btn-zinus mb-2">
                          <FaSortUp />
                          Increase Resource
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <h6 className="font-weight-medium mb-0">Johnathan</h6>
                      </td>
                      <td>TALABAT SERVICES COMPA MA</td>
                      <td>
                        <span className="badge bg-success px-2 py-1 text-white">
                          Low
                        </span>
                      </td>
                      <td className="text-center">18</td>
                      <td className="text-center">
                        <button
                          type="button"
                          className="btn-zinus mb-2 btn-warning"
                        >
                          <FaSortDown /> Descrease Resource
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx xxs="7 mt-4 d-flex align-items-stretch">
          <Card className="flex-1">
            <CardBody>
              <h3>Resource Insight</h3>
              <h4>Total Resources: 1240</h4>
              <div className="h-350">
                <BarChart
                  data={resourceBarChartData}
                  ownOpt={resourceBarChartOptions}
                  key="resource"
                />
              </div>
            </CardBody>
          </Card>
        </Colxx>

        <Colxx xxs="5 mt-4 d-flex align-items-stretch">
          <Card className="flex-1">
            <CardBody>
              <h3>Resource Allocation</h3>
              <div className="h-350">
                <PieChart
                  data={pieChartReviewsData}
                  ownOpt={resourcePieChartOptions}
                />
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
    </div>
  );
};

export default connect(null, null)(ProjectManagement);
