import React, { useCallback, useContext } from 'react';
import { Badge } from 'antd';
import { getTotalPrice } from '../../repository/product';

const TotalPrice = () => {
  const basketList = JSON.parse(localStorage.getItem('basket'))
  const totalPrices = useCallback(() => {
    return getTotalPrice(basketList ? basketList : []);
  }, [basketList]);
  const totalPrice = totalPrices();
  return (
    <Badge
      style={{
        backgroundColor: '#fff',
        color: '#999',
        boxShadow: '0 0 0 1px #d9d9d9 '
      }}
      count={`${totalPrice} €`}
    />
  );
};

export default TotalPrice;
