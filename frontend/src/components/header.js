import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import logo from '../assets/img/logo/logo.png';
import { Row } from 'reactstrap';
import { Colxx } from '../common/CustomBootstrap';
import {
  FaUser,
  FaIdCard,
  FaTools,
  FaMedal,
  FaMapMarker,
  FaPowerOff,
  FaGift,
} from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();
  const clearStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('is_loggedin');
    localStorage.removeItem('user_employee');
    navigate('/login', { replace: true });
  };

  return (
    <>
      <header>
        <Row className="align-items-center">
          <Colxx xxs="6">
            <div className="logo">
              <a href="/" title="Nexg AI" className="mb-0">
                <img
                  src={logo}
                  title="Nexg AI"
                  alt="Nexg AI Logo"
                  width="130px"
                />
              </a>
            </div>
          </Colxx>
          <Colxx xxs="3"></Colxx>
          <Colxx xxs="3">
            <div className="user-acc">
              <UncontrolledDropdown>
                <DropdownToggle className="header-icon" color="empty">
                  <FaUser /> Yasmin Fayyad
                </DropdownToggle>
                <DropdownMenu>
                  <button>
                    <div className="acc-info">
                      <span className="init-name">YF</span>
                      <p className="user-name">
                        <span>Yasmin Fayyad</span>
                        <span className="email">yasmin.fayyad@nexgai.com </span>
                        <span>Phone: +965 1234 5678</span>
                        <span>Age: 29</span>

                        <span>Location: Kuwait City, Kuwait </span>
                      </p>
                    </div>
                  </button>
                  <DropdownItem>
                    <FaIdCard />
                    Account
                  </DropdownItem>
                  {/* <button type="button" className="copilot-btn">
                    My Copilot
                  </button> */}
                  <DropdownItem>
                    <FaGift />
                    Loyalty Points: 350/500
                  </DropdownItem>
                  <DropdownItem>
                    <FaMedal />
                    Tier: Platinum
                  </DropdownItem>
                  <DropdownItem>
                    <FaTools />
                    Settings
                  </DropdownItem>
                  <div className="acc-list">
                    <h4>Accounts</h4>
                    <DropdownItem className={'selected'}>
                      Yasmin Fayyad
                      <p className="mt-2 email">yasmin.fayyad@nexgai.com</p>
                    </DropdownItem>
                    <DropdownItem>
                      Jasim
                      <p className="mt-2 email">jasim@hotmail.com</p>
                    </DropdownItem>
                  </div>

                  <DropdownItem>
                    <FaPowerOff />
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>
          </Colxx>
        </Row>
      </header>
    </>
  );
};

export default Header;
