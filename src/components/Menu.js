import React, { useState } from 'react';
import { Menu, Row, Col, Icon} from 'antd';
import { withRouter } from 'react-router';
import { HomeOutlined, CloseCircleOutlined, ContactsOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

const NavBar = ({ setMenuIsOpened, history }) => {
  const [current, setCurrent] = useState('home');
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const goToPage = (e, url) => {
    setCurrent(e.key);
    history.push(url);
    setMenuIsOpened(false);
  };

  return (
    <Row className="popup">
      <Row className="popup_inner" style={{ padding: '0px', fontSize:"20em" }}>
        <Col
          span={19}
          style={{
            height: '100%',
            background: 'red'
          }}
        >
          <Menu
            style={{
              height: '100%',
              paddingTop: '2%',
              border: '0px'
            }}
            onClick={handleClick}
            selectedKeys={[current]}
            mode="vertical"
          >

            <Menu.Item
              key="home"
              icon={<HomeOutlined style={{ color: '#89ba17 ', fontSize:'1.5em' }} />}
              onClick={(e) => goToPage(e, '/')}
              style={{fontSize:"1.5em"}}
            >
            
            Accueil
            </Menu.Item>
            <Menu.Item
              key="contact"
              icon={<ContactsOutlined style={{ color: '#89ba17 ', fontSize:'1.5em' }} />}
              onClick={(e) => goToPage(e, '/contact')}
              style={{fontSize:"1.5em"}}
            >
            contact
            </Menu.Item>
          </Menu>
        </Col>
        <Col
          span={5}
          style={{
            paddingTop: '25px',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            margin: 0
          }}
        >
          <CloseCircleOutlined
            onClick={() => setMenuIsOpened(false)}
            style={{ color: 'white', fontSize: '28px' }}
          />
        </Col>
      </Row>
    </Row>
  );
};

NavBar.propTypes = {
  setMenuIsOpened: PropTypes.func
};

export default withRouter(NavBar);
