import React, { useEffect, useState, useContext,  } from 'react';
import axios from 'axios';
import { ShoppingCartOutlined, QuestionCircleOutlined, DeleteOutlined} from '@ant-design/icons';
import { Col, Row, Tag, Popconfirm} from 'antd';
import Addandremoveproduct from '../../components/product/AddAndRemoveProduct';
import ProductNumber from '../../components/product/ProductNumber';
import ProductDetailsTabs from '../../components/product/ProductDetailsTabs';
import { AppContext } from '../../context/context';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const { basket } = useContext(AppContext);
  const { removeProductFromBasket } = basket;
  const { id } = match.params;
  const { REACT_APP_API_DOMAIN, REACT_APP_API_PRODUCT } = process.env;

  const getProduct = async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_PRODUCT + `${id}`
    );
    setProduct(data);
  };
  useEffect(() => {
    getProduct();
  }, []);

  return (
    
    <Row justify="center" align='middle' style={{ minHeight:'50vh', padding:15}}>
      <Col lg={14} sm={24} xs={24}>
          <img
          alt="example"
          src={`/productImage/${product.fileName}`}
          style={{maxHeight:'250px', maxWidth:'400px'}}
          />
      </Col>
      <Col lg={10} sm={24} xs={24} style={{boxShadow: '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
      background: '#fff', padding:15}}>
      <Row justify='space-between' align='middle'>
      <h1>{product.name}</h1>
      <Col lg={4}>
      <Row >
      <b style={{ color: '#878888' }}> categorie: </b>
      <Tag  color="#89ba17" style={{marginLeft:'2%'}}>
        {product.category}
      </Tag>
      
      
      </Row>
      
      </Col>
      </Row>
      <Row>
      
      </Row>
          <Row  justify="start" align='middle'  >
          <Col lg={2}>
              <Row>
                  <b style={{fontSize:"2em"}}>{product.productPrice}€</b>
              </Row>
          </Col>
                      <Addandremoveproduct buttonPadding={10} product={product} />
                      <Col lg={6}>
                      <Row align='middle'>
                          <ProductNumber product={product} />
                          <ShoppingCartOutlined
                              style={{ color: '#89ba17', marginLeft: '5px' }}
                          />
                      </Row>
                      </Col>
                      <Popconfirm
              title="Souhaitez vous retirer tous ces produits présents dans le panier？"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              onConfirm={() => removeProductFromBasket(product)}
            >
              <DeleteOutlined style={{ color: '#89ba17' }} />
            </Popconfirm>
          </Row>
        <ProductDetailsTabs description={product.longDescription}/>
      </Col>
    </Row>
    

    
  );
};

export default ProductDetail;
