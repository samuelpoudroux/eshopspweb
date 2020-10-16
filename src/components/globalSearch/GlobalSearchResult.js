import React from 'react';
import PropTypes from 'prop-types';
import Productcard from '../product/ProductCard';
import { Row, Col, Divider, Tag } from 'antd';

const GlobalsearchResult = ({ state }) => {
  const items = [];

  for (const [key, values] of Object.entries(state)) {
    if (Array.isArray(values) && values.length > 0) {
      items.push(
        <Col span={24} key={key} style={{ margin: '2%' }}>
          <Tag color="#89ba17" style={{ padding: '0% 1%' }}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Tag>
          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{
              paddingLeft: '4%',
              paddingRight: '4%',
              justifyContent: 'space-evenly'
            }}
          >
            {values.map((value) => (
              <React.Fragment key={value.id}>
                {key !== 'products' && (
                  <div
                    key={value.name}
                    style={{
                      marginTop: '1%',
                      padding: '1% 2%',
                      boxShadow:
                        '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                      background: '#fff',
                      borderRadius: '2px',
                      position: 'relative'
                    }}
                  >
                    {value.name}
                  </div>
                )}
                {key === 'products' && <Productcard product={value} />}
              </React.Fragment>
            ))}
          </Row>
          <Divider />
        </Col>
      );
    }
  }
  return <>{items.length > 0 ? items : <h1>pas de resultat</h1>}</>;
};

GlobalsearchResult.propTypes = {
  state: PropTypes.object
};

export default GlobalsearchResult;
