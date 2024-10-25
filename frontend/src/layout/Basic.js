import React from 'react';

const BasicLayout = ({ children }) => {
  return (
    <>
      <main>
        <div className="container-fluid">{children}</div>
      </main>
    </>
  );
};

export default BasicLayout;
