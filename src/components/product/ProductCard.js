import React, { useContext } from 'react';
import { AppContext } from '../../context/context';
import { Popconfirm, Tag } from 'antd';
import ReactStars from 'react-rating-stars-component';
import { withRouter } from 'react-router';
import ProductNumber from './ProductNumber';

import { QuestionCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col } from 'antd';
import PropTypes from 'prop-types';
import Addandremoveproduct from './AddAndRemoveProduct';

const Productcard = ({ product, history }) => {
  const { basket, globalSearch } = useContext(AppContext);
  const { search } = globalSearch;
  const { list, removeProductFromBasket } = basket;

  const {
    id,
    name,
    shortDescription,
    category,
    notation,
    productPrice,
    imageUrl
  } = product;
  const priceStyle = {
    color: '#878888',
    fontSize: '1em',
    margin: '0'
  };

  const goToProductDetails = (e) => {
    search('');
    history.push(`/productDetails/${id}`);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={5}
      lg={5}
      className="productCard"
      style={{
        marginTop: '2%',
        paddingBottom: '2%',
        boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
        background: '#fff',
        borderRadius: '2px',
        position: 'relative'
      }}
      key={product.id}
    >
      <Row justify="space-between" align="middle " style={{ padding: '2px' }}>
        {list &&
          list.length > 0 &&
          list.find((p) => p.id === id) !== undefined &&
          list.find((p) => p.id === id).num > 0 && (
            <Popconfirm
              title="Souhaitez vous retirer tous ces produits présents dans le panier？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => removeProductFromBasket(product)}
            >
              <DeleteOutlined style={{ color: '#89ba17' }} />
            </Popconfirm>
          )}
        <ReactStars
          count={5}
          value={notation}
          edit={false}
          size={24}
          activeColor="#89ba17"
        />
        <p
          style={{
            fontSize: '1.2em',
            color: priceStyle.color,
            textAlign: 'center',
            margin: 0
          }}
        >
          {productPrice}€
        </p>
      </Row>
    
      <div onClick={(e) => goToProductDetails(e)}>
        <Row>
          <img
            alt="Image du produit"
            src={`${product.imageUrl}`}
            style={{maxHeight:'250px', minWidth: '100%'}}
            />
        </Row>

        <b style={{ color: priceStyle.color }}>{name}</b>
        <div
          style={{ marginTop: '20px', wordWwrap: 'break-word', padding: '2%' }}
        >
          <p style={{ color: priceStyle.color }}>{shortDescription !== 'null' ||shortDescription !== 'undefined'  && shortDescription}</p>
        </div>
        <ProductNumber product={product} />
        <div onClick={(e) => e.stopPropagation()}>
          <Addandremoveproduct product={product} />
        </div>
        <Row justify="center" align="middle">
          <b style={{ color: '#878888' }}> categorie: </b>
          <Tag style={{ marginLeft: '2%' }} color="#89ba17">
            {category}
          </Tag>
        </Row>
      </div>
    </Col>
  );
};

Productcard.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object
};

export default withRouter(Productcard);
