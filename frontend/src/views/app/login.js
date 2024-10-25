import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
// import { jwtDecode } from 'jwt-decode';
import { Card, CardBody, Row } from 'reactstrap';
import { Colxx } from '../../common/CustomBootstrap';
import axios from 'axios';
import logo from '../../assets/img/logo/logo.svg';

const Login = () => {
  const navigate = useNavigate();
  const [isIframe, setIsIframe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    if (isIframe == false && window.location !== window.parent.location) {
      console.log('in iframe');
      setIsIframe(true);
    }
  }, [isIframe]);

  const makeApiRequest = async (email, user) => {
    try {
      setIsLoading(true);
      const result = await axios({
        url: `/get_employee?email=${email}`,
        method: 'GET',
      });
      console.log('result', result);
      if (result.status === 200 && result.data.id > 0) {
        setIsLoading(false);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('is_loggedin', true);
        localStorage.setItem('user_employee', JSON.stringify(result.data));
        navigate('/', { replace: true });
      } else {
        setIsLoading(false);
        setError('Something wrong. Please try after some time.');
      }
    } catch (e) {
      setIsLoading(false);
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const responseGoogle = (res) => {
    const token = res.credential;
    let decoded;
    // decoded = jwtDecode(token);
    console.log('decoded', decoded);
    if (decoded.hd == 'quantanite.com') {
      makeApiRequest(decoded.email, decoded);
    } else {
      console.log('responseGoogle', 'out side User');
    }
  };
  const responseGoogleError = () => {
    console.log('responseGoogleError');
    // localStorage.setItem("user", JSON.stringify(res));
    // navigate("/", { replace: true });
  };

  return (
    <div className="container-fluid">
      {isLoading && (
        <div className="loading-overlay ">
          <div className="loading" />
        </div>
      )}
      <Row>
        <Colxx xxs="12">
          <div className="login-form g-login">
            <Card>
              <CardBody className="p-5">
                <div className="logo d-flex justify-content-start">
                  <img src={logo} alt="Nexg AI" width="160" title="Nexg AI" />
                </div>
                <form method="POST">
                  <GoogleOAuthProvider clientId="74004915452-f0bsrm73i8nte6pacm7bad615jgpj67e.apps.googleusercontent.com">
                    <GoogleLogin
                      onSuccess={(e) => responseGoogle(e)}
                      onError={() => responseGoogleError()}
                    />
                  </GoogleOAuthProvider>
                </form>
              </CardBody>
            </Card>
          </div>
        </Colxx>
      </Row>
    </div>
  );
};

export default Login;
