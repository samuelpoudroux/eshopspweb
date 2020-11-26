import React, { useContext } from "react";
import PropTypes from "prop-types";
import Productcard from "../product/ProductCard";
import { withRouter } from "react-router";
import { Row, Col, Divider, Tag } from "antd";
import styleVariable from "../../styleVariable";
import { AppContext } from "../../context/context";
import CategoryCard from "../../views/categories/CategoryCard";
import ProductCard from "../product/ProductCard";

const GlobalsearchResult = ({ state, history }) => {
  const items = [];

  for (const [key, values] of Object.entries(state)) {
    if (Array.isArray(values) && values.length > 0) {
      items.push(
        <Col span={24} key={key}>
          <Row justify="center">
            <Tag
              color={styleVariable.secondaryColor}
              style={{ padding: "0% 1%" }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Tag>
          </Row>

          <Row
            style={{
              padding: "2%",
              justifyContent: "center",
            }}
          >
            {values.map((value) => (
              <>
                {key !== "products" && key !== "categories" && (
                  <Col
                    xxl={4}
                    lg={6}
                    xs={17}
                    md={9}
                    sm={9}
                    key={value.id}
                    style={{
                      boxShadow:
                        "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                      background: "#fff",
                      borderRadius: "2px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                  >
                    {value.name}
                  </Col>
                )}
                {key === "products" && (
                  <Col xxl={4} lg={6} xs={17} md={9} sm={9} key={value.id}>
                    <ProductCard product={value} />
                  </Col>
                )}
                {key === "categories" && (
                  <Col xxl={4} lg={4} xs={17} md={9} sm={9} key={value.id}>
                    <CategoryCard id={value.id} />
                  </Col>
                )}
              </>
            ))}
          </Row>
          <Divider />
        </Col>
      );
    }
  }
  return (
    <>
      {items.length > 0 ? (
        items
      ) : (
        <h1 style={{ textAlign: "center", color: styleVariable.mainColor }}>
          pas de resultat
        </h1>
      )}
    </>
  );
};

GlobalsearchResult.propTypes = {
  state: PropTypes.object,
};

export default withRouter(GlobalsearchResult);
