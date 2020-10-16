import React, { useContext } from 'react';
import { Row } from 'antd';
import { AppContext } from '../../context/context';
import ProductsNumber from '../product/ProductsNumber';
import TotalPrice from './TotalPrice';

const SubBasket = () => {
  const { basket } = useContext(AppContext);
let num = 0;
const productInBasket = basket.list.length > 0 && basket.list.reduce((accumulateur, valeurCourante) => {
  return accumulateur + valeurCourante.num * valeurCourante.productPrice;
}, num);

return (
    basket.list.length > 0 && productInBasket !== 0  && (
      <Row
        align="middle"
        style={{
          padding: '1%',
          boxShadow:
            '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
          background: '#fff',
          borderRadius: '2px'
        }}
      >
        <b style={{ color: '#686868' }}>Sous total:</b>
        <Row style={{ marginLeft: '5px' }}>
          <ProductsNumber />
          <TotalPrice />
        </Row>
      </Row>
    )
  );
};

export default SubBasket;
