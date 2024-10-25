import React from 'react';
import { connect } from 'react-redux';
// import { Routes, Route } from 'react-router-dom';
import BasicLayout from '../layout/Basic';
import Header from '../components/header';

import Dashboard from './app/Dashboard/index';

import Copilot from './app/chat/index';

function Home() {
  return (
    <>
      <Header />
      <BasicLayout>
        <Dashboard />
        {/* <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="copilot/:graph" element={<Copilot />} />
        </Routes> */}
      </BasicLayout>
    </>
  );
}

const mapStateToProps = ({ dashboard }) => {
  const { isLoading } = dashboard;
  return { isLoading };
};

export default connect(mapStateToProps, null)(Home);
