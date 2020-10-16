import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../context/context';
import { withRouter } from 'react-router';
import {
  MenuOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  LogoutOutlined,
  QqOutlined
} from '@ant-design/icons';
import { Row, Col, Popover } from 'antd';
import logo from '../assets/logoWhite.svg';
import ProductsNumber from '../components/product/ProductsNumber';
import TotalPrice from '../components/basket/TotalPrice';
import NavBar from './Menu';
import CleanBasket from '../components/basket/CleanBasket';
import Globalsearchinput from '../components/globalSearch/GlobalSearchInput';
import useResponsive from '../customHooks/responsiveHook';
import Axios from 'axios';
import { logout } from '../repository/auth';
import useIsAdmin from '../customHooks/isAdminHooks';

const Header = ({ setBasketActive, basketIsActive, history, setChatActive }) => {
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const { isMobile } = useResponsive();
  const [globalSearchApi, setGlobalSearchApi] = useState();

  const { REACT_APP_API_DOMAIN, REACT_APP_API_GLOBAL_SEARCH } = process.env;

  const iconStyle = { color: 'white', marginLeft: '10px' };
  const getGlobalSearchApi = async () => {
    try {
      const { data: globalSearchApi } = await Axios.get(
        REACT_APP_API_DOMAIN + REACT_APP_API_GLOBAL_SEARCH
      );
      setGlobalSearchApi(globalSearchApi);
    } catch (err) {
      console.log('error', err);
    }
  };

  const { isAdmin } = useIsAdmin();

  const local = JSON.parse(localStorage.getItem('users'))
    ? JSON.parse(localStorage.getItem('users'))
    : undefined;
  useEffect(() => {
    getGlobalSearchApi();
  }, []);

  return (
    <header
      style={{
        zIndex: 0,
        padding: isMobile ? '3%' : '1.5%',
        background: '#686868'
      }}
    >
      {menuIsOpened && <NavBar setMenuIsOpened={setMenuIsOpened} />}
      <Row align="middle" style={{ width: '100%', height: '10%' }}>
        <Col lg={2} md={1} xs={1} sm={1}>
          <MenuOutlined
            onClick={() => setMenuIsOpened(!menuIsOpened)}
            style={{ float: 'left', fontSize: '28px', color: 'white' }}
          />
        </Col>
        <Row align='middle' justify="center">
        <Col lg={13} md={23} xs={18} sm={18}>
          <img
            alt="logo"
            src={logo}
            style={{
              maxWidth: isMobile ? '50%' : '50%',
              maxHeight: isMobile ? '100%' : '50%'
            }}
          />
        </Col>
        <Col lg={1} md={23} xs={6} sm={6}>
        <Popover title="Besoin d'aide">
        <QqOutlined onClick={() => setChatActive(true)} style={{ fontSize:50, color:'white'}} />

              </Popover>
        </Col>
        
        </Row>
        

        <Col
          lg={4}
          md={24}
          xs={24}
          style={{
            marginTop: isMobile && '8%'
          }}
        >
          <Row justify="center" align="middle">
            <Col lg={6} md={2} xs={6} sm={3}>
              <ShoppingCartOutlined
                style={{ fontSize: '20px', color: 'white' }}
                onClick={() => setBasketActive(!basketIsActive)}
              />
            </Col>
            <Col lg={6} md={4} xs={6} sm={6}>
              <ProductsNumber />
            </Col>
            <Col lg={6} md={4} xs={6} sm={6}>
              <TotalPrice />
            </Col>
            <Col lg={6} md={4} xs={6} sm={6}>
              <CleanBasket />
            </Col>
          </Row>
        </Col>
        <Col lg={4} md={23} xs={23} sm={23}>
          <Row
            align="middle"
            justify="center"
            style={{ marginTop: isMobile && '8%' }}
          >
            {local && local.isLogged && (
              <Row align="middle" justify="center">
                <p style={{ color: 'white', margin: '0', fontSize: '1.3em' }}>
                  Bienvenue{' '}
                  {local &&
                    local.firstName &&
                    local.firstName[0].toUpperCase() +
                      local.firstName.substring(1)}
                </p>
                <LogoutOutlined
                  style={iconStyle}
                  onClick={() => logout(history)}
                />
              </Row>
            )}

            {!local && (
              <LoginOutlined
                style={iconStyle}
                onClick={() => history.push('/login')}
              />
            )}

            {isAdmin && (
              <p style={{ margin: 0, marginLeft: '10px', color: 'white' }}>
                Administration
              </p>
            )}
          </Row>
        </Col>
      </Row>
      <Globalsearchinput globalSearchApi={globalSearchApi} />
    </header>
  );
};

export default withRouter(Header);
