import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CloseCircleOutlined,
  HeartFilled,
  QuestionCircleOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Card, Col, Row, Popconfirm } from "antd";
import Addandremoveproduct from "../product/AddAndRemoveProduct";
import styleVariable from "../../styleVariable";
import { useContext } from "react";
import { AppContext } from "../../context/context";

const Favorites = ({ setFavoriteActive }) => {
  const { favorites } = useContext(AppContext);
  const [notification, addNotification] = useState(false);

  const {
    removeAllProductFromFavorites,
    removeProductFromFavorites,
  } = favorites;
  const list = JSON.parse(localStorage.getItem("favorites")) || [];
  const productName = (product) => {
    return (
      <Row justify="space-between">
        <Col span={21} style={{ wordBreak: "break-word" }}>
          <h2 style={{ color: styleVariable.mainColor }}>{product.name}</h2>
        </Col>
        <Col span={3}>
          <Popconfirm
            title="Souhaitez vous supprimer ce produit de vos favoris"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
            onConfirm={() => removeProductFromFavorites(product)}
          >
            <DeleteFilled
              style={{ color: styleVariable.secondaryColor, fontSize: "30px" }}
            />
          </Popconfirm>
        </Col>
      </Row>
    );
  };

  const closeFavorites = (e) => {
    setFavoriteActive(false);
  };

  return (
    <div className="basket" onClick={(e) => closeFavorites(e)}>
      <Col
        className="basket_inner"
        style={{ background: styleVariable.secondaryColor, paddingTop: 15 }}
      >
        <div style={{ padding: "2%" }}>
          <Row justify="space-between" onClick={(e) => e.stopPropagation()}>
            <Popconfirm
              title="Souhaitez vous vider ts vos favoris"
              icon={<QuestionCircleOutlined style={{ color: "red" }} />}
              onConfirm={() => removeAllProductFromFavorites()}
            >
              <DeleteFilled style={{ color: "white", fontSize: "30px" }} />
            </Popconfirm>
            <HeartFilled
              style={{
                fontSize: "30px",
                color: "white",
              }}
            />
            <b style={{ color: "white" }}>Mes futurs achats</b>
            <CloseCircleOutlined
              style={{ color: "white", fontSize: "30px" }}
              onClick={() => setFavoriteActive(false)}
            />
          </Row>
          <Row
            style={{ marginTop: "10%" }}
            onClick={(e) => e.stopPropagation()}
          >
            {list &&
              list.length > 0 &&
              list.map((product) => (
                <Col span={24}>
                  <Row justify="center">
                    <Col key={product.id} span={24} style={{}}>
                      <Card
                        style={{ marginTop: "5px" }}
                        title={productName(product)}
                        bordered={false}
                      >
                        <Row justify="space-between" align="middle">
                          <Col span={14}>
                            <Addandremoveproduct
                              notification={notification}
                              addNotification={addNotification}
                              product={product}
                            />
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              ))}
          </Row>
        </div>
      </Col>
    </div>
  );
};

Favorites.propTypes = {
  setFavoritesActive: PropTypes.func,
};

export default Favorites;
