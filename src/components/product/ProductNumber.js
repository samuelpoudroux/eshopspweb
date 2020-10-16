import React from 'react';
import { Row } from 'antd';

const ProductNumber = ({ product }) => {
const list = JSON.parse(localStorage.getItem('basket'))

  return (
    <Row justify="center">
      {list &&
      list.length > 0 &&
      list.find((p) => p.id === product.id) !== undefined
        ? list.find((p) => p.id === product.id).num
        : '0'}{' '}
      piéces
    </Row>
  );
};

export default ProductNumber;
