import React from 'react';
// import * as ReactDOM from "react-dom/client";
import {
  Routes,
  Route,
  HashRouter,
  Navigate,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { persistor, store } from './redux/store';
import Login from './views/app/login';
import 'react-perfect-scrollbar/dist/css/styles.css';
import BasicLayout from './layout/Basic';
import Header from './components/header';
import ProjectManagement from './views/app/Dashboard/ProjectManagement';
// import Dashboard from './views/app/Dashboard';
import Dashboard from './views/app/Alshaya';
import ITCopilot from './views/app/Dashboard/itInsight';
// import 'react-circular-progressbar/dist/styles.css';

// import "./App.scss";
import './assets/css/vendor/bootstrap.min.css';
import './assets/scss/index.scss';
import { NotificationContainer } from './common/react-notifications/index';

const App = () => {
  const RequireAuth = ({ children }) => {
    const user = localStorage.getItem('is_loggedin');
    let location = useLocation();

    // if (!user) {
    //   // Redirect them to the /login page, but save the current location they were
    //   // trying to go to when they were redirected. This allows us to send them
    //   // along to that page after they login, which is a nicer user experience
    //   // than dropping them off on the home page.
    //   return <Navigate to="/login" state={{ from: location }} replace />;
    // }

    return children;
  };
  return (
    <>
      <NotificationContainer />
      <Provider store={store}>
        <React.StrictMode>
          <HashRouter>
            <Routes>
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Header />
                    <BasicLayout>
                      <Dashboard />
                    </BasicLayout>
                  </RequireAuth>
                }
              />
              <Route
                path="/it-insight"
                element={
                  <RequireAuth>
                    <BasicLayout>
                      <ITCopilot />
                    </BasicLayout>
                  </RequireAuth>
                }
              />
              {/* <Route
                path="/project-management"
                element={
                  <RequireAuth>
                    <Header />
                    <BasicLayout>
                      <ProjectManagement />
                    </BasicLayout>
                  </RequireAuth>
                }
              /> */}
              {/* <Route path="login" element={<Login />} /> */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
            {/* <Routes>
                <Route path="/" element={<Home />} />
              </Routes> */}
          </HashRouter>
        </React.StrictMode>
      </Provider>
    </>
  );
};

export default App;
