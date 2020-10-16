import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { AppContext } from '../../context/context';
import {
  CloseCircleOutlined,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Card, Col, Row, Popconfirm } from 'antd';
import CleanBasket from './CleanBasket';
import { getTotalPrice } from '../../repository/product';
import Addandremoveproduct from '../product/AddAndRemoveProduct';
import ProductNumber from '../product/ProductNumber';

const Basket = ({ setBasketActive }) => {
  const { basket } = useContext(AppContext);
  const basketList = JSON.parse(localStorage.getItem('basket'))

  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList);
  }, [basket]);
  const { removeProductFromBasket } = basket;
  const productName = (product) => {
    return (
      <Row justify="space-between">
        <h2 style={{ color: '#89ba17' }}>{product.name}</h2>
        <Popconfirm
          title="Souhaitez vous retirer ce produit panier？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => removeProductFromBasket(product)}
        >
          <DeleteOutlined style={{ color: '#89ba17' }} />
        </Popconfirm>
      </Row>
    );
  };

  return (
    <div className="basket">
      <Col className="basket_inner">
        <div style={{ padding: '2%' }}>
          <Row justify="space-between">
            <CleanBasket color={'white'} fontSize={'30px'} />
            <CloseCircleOutlined
              style={{ color: 'white', fontSize: '30px' }}
              onClick={() => setBasketActive(false)}
            />
          </Row>
          <Row style={{ marginTop: '10%' }}>
            {basketList &&
              basketList.length > 0 &&
              basketList.map(
                (product) =>
                  product.num > 0 && (
                    <Col span={24}>
                      <Row justify="center" align="middle">
                        <Col key={product.id} span={22}>
                          <Card
                            style={{ marginTop: '5px' }}
                            title={productName(product)}
                            bordered={false}
                          >
                            <Row justify="space-between" align="middle">
                              <Col span={4}>
                                <ProductNumber product={product} />
                              </Col>
                              <Col span={12}>
                                <Addandremoveproduct product={product} />
                              </Col>
                                <p style={{ color: '#686868' }}>
                                  Sous-total:{product.productPrice * product.num}€
                                </p>
                            </Row>
                          </Card>
                        </Col>
                      </Row>
                    </Col>
                  )
              )}
          </Row>
          <Row align="center" style={{ color: 'white', fontSize: '2em' }}>
            {!basket.list ||
              (basket.list.length === 0 && <p>Votre panier est vide</p>)}
          </Row>
        </div>

        <Row
          style={{
            marginTop: '20%',
            background: 'rgba(104,104,104, 0.8)',
            padding: '10px'
          }}
          justify="space-between"
        >
          <Col>
            <b style={{ color: 'white', fontSize: '1.5em' }}>Prix total:</b>{' '}
          </Col>
          <Col>
            <b style={{ color: 'white', fontSize: '1.5em' }}>
              {totalPrices()}€
            </b>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

Basket.propTypes = {
  setBasketActive: PropTypes.func
};

export default Basket;
