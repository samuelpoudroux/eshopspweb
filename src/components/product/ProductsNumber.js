import React, { useCallback, useContext } from 'react';
import { getNumberOfProducts } from '../../repository/product';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { Badge, Row } from 'antd';

const ProductsNumber = ({ header = false }) => {
  const basketList = JSON.parse(localStorage.getItem('basket'))
  const numOfProducts = useCallback(() => {
    return getNumberOfProducts(basketList ? basketList : [] );
  }, [basketList]);
  const totalOfProducts = numOfProducts();
  return (
    <Row justify="center" align="middle">
      <Badge
        style={{ backgroundColor: '#89ba17' }}
        count={`${totalOfProducts} piéces`}
      />
      {header && <ShoppingCartOutlined style={{ color: '#686868' }} />}
    </Row>
  );
};

export default ProductsNumber;
