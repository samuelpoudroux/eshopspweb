import React, { useContext } from "react";
import { AppContext } from "../../context/context";
import { Badge, Tag } from "antd";
import ReactStars from "react-rating-stars-component";
import { withRouter } from "react-router";
import ProductNumber from "./ProductNumber";
import { Row, Col } from "antd";
import PropTypes from "prop-types";
import Addandremoveproduct from "./AddAndRemoveProduct";
import RemoveSeveralProducts from "./RemoveSeveralProduct";

const Productcard = ({ product, history }) => {
  const { basket, globalSearch } = useContext(AppContext);
  const { search } = globalSearch;
  const list = JSON.parse(localStorage.getItem("basket")) || [];

  const {
    id,
    name,
    shortDescription,
    category,
    notation,
    productPrice,
    productPriceReduced,
  } = product;
  const priceStyle = {
    color: "red",
    fontSize: "1em",
    margin: "0",
  };

  const goToProductDetails = (e) => {
    search("");
    history.push(`/productDetails/${id}`);
  };

  return (
    <Col
      xs={24}
      sm={24}
      md={24}
      lg={6}
      className="productCard"
      style={{
        marginTop: "2%",
        paddingBottom: "2%",
        boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
        background: "#fff",
        borderRadius: "2px",
        position: "relative",
        cursor: "pointer",
      }}
      key={product.id}
    >
      <Col onClick={(e) => goToProductDetails(e)}>
        <Col style={{ height: "250px", maxWidth: "100%" }}>
          <img
            alt="Image du produit"
            src={`${product.imageUrl}`}
            style={{ height: "100%", width: "100%" }}
          />
        </Col>

        <Col style={{ padding: "20px" }}>
          <Row>
            <Col lg={2}>
              <b style={{ color: "#878888" }}>{name}</b>
            </Col>
          </Row>
          <Row style={{ marginTop: "15px" }} align="middle">
            <Col lg={2} md={5} sm={4} xs={4}>
              <p
                style={{
                  fontSize: "1.2em",
                  color: "#878888",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {productPrice}€
              </p>
            </Col>
            <Col lg={2} md={5} sm={4} xs={4}>
              <s
                style={{
                  fontSize: "1.2em",
                  color: priceStyle.color,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {/*productPriceReduced && `${productPriceReduced + "€"}`*/}
                {"5" + "€"}
              </s>
            </Col>
            <Col lg={15} md={5} sm={10} xs={10}>
              <Row justify="center">
                <ReactStars
                  count={5}
                  value={notation}
                  edit={false}
                  size={24}
                  activeColor="#89ba17"
                />
              </Row>
            </Col>
            <Col lg={5} md={5} sm={6} xs={6}>
              <Row justify="end">
                <Tag style={{ marginLeft: "2%" }} color="#89ba17">
                  {category}
                </Tag>
              </Row>
            </Col>
          </Row>
          <Row
            style={{
              marginTop: "20px",
              wordWwrap: "break-word",
              padding: "2%",
            }}
          >
            <p style={{ color: priceStyle.color }}>
              {shortDescription !== "null" ||
                (shortDescription !== "undefined" && shortDescription)}
            </p>
          </Row>
          <Row
            align="middle"
            justify="space-between"
            onClick={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
          >
            <Col>
              <ProductNumber product={product} />
            </Col>
            <Col>
              <div>
                <Addandremoveproduct product={product} />
              </div>
            </Col>
            <Col>
              {list &&
                list.length > 0 &&
                list.find((p) => p.id === id) !== undefined &&
                list.find((p) => p.id === id).num > 0 && (
                  <Row align="middle">
                    <RemoveSeveralProducts product={product} />
                  </Row>
                )}
            </Col>
          </Row>
        </Col>
      </Col>
    </Col>
  );
};

Productcard.propTypes = {
  product: PropTypes.object,
  history: PropTypes.object,
};

export default withRouter(Productcard);
