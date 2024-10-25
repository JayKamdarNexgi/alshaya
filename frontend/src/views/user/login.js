import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx } from '../../common/CustomBootstrap';
import { userLogin } from '../../redux/actions';
import { NotificationManager } from '../../common/react-notifications';
import logo from '../../assets/img/logo/logo.svg';

const Login = ({ userLoginAction, authUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const loginFormSubmit = () => {
    setPasswordError(false);
    setEmailError(false);

    if (email === '') {
      setEmailError(true);
      NotificationManager.primary(
        '',
        'Please fill email the details',
        3000,
        null,
        null,
        ''
      );
      return;
    }
    if (password === '') {
      setPasswordError(true);
      NotificationManager.primary(
        '',
        'Please fill password the details',
        3000,
        null,
        null,
        ''
      );
      return;
    }
    userLoginAction({ email, password });
  };

  return (
    <>
      {authUser ? <Navigate replace to="/login" /> : ''}
      <div className="container-fluid">
        <Row>
          <Colxx xxs="12">
            <div className="login-form">
              <Card>
                <CardBody>
                  <div className="logo">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6LYRhWVD5wgxz41DkKbl6VrZqPtbcwNn5zEAD-wxV6yOrQY-6BmyKrVjNf4VtG8X83Xs&usqp=CAU"
                      alt="Cisco"
                      title="Cisco"
                    />
                  </div>
                  <form method="POST" onSubmit={() => loginFormSubmit()}>
                    <div
                      className={`form-group ${emailError ? 'has-error' : ''}`}
                    >
                      <label>Email</label>
                      <input
                        type="email"
                        className="input-control"
                        value={email}
                        placeholder="Enter Email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                    <div
                      className={`form-group ${
                        passwordError ? 'has-error' : ''
                      }`}
                    >
                      <label>Password</label>
                      <input
                        type="password"
                        className="input-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
                    </div>
                    <div className="form-group">
                      <button
                        type="button"
                        className="btn-outline"
                        onClick={() => loginFormSubmit()}
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </CardBody>
              </Card>
            </div>
          </Colxx>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

export default connect(mapStateToProps, {
  userLoginAction: userLogin,
})(Login);
