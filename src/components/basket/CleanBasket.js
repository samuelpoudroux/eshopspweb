import React, { useContext } from 'react';
import { Popconfirm } from 'antd';
import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { AppContext } from '../../context/context';

const CleanBasket = ({ color = '#89ba17', fontSize = '20px' }) => {
  const { basket } = useContext(AppContext);
  const { removeAllProducts, list } = basket;
  return (
    <>
      {list.length > 0 && (
        <Popconfirm
          title="Souhaitez vous vider le panier？"
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          onConfirm={() => removeAllProducts()}
        >
          <DeleteOutlined style={{ color: color, fontSize: fontSize }} />
        </Popconfirm>
      )}
    </>
  );
};

export default CleanBasket;
