import React, { useContext } from "react";
import PropTypes from "prop-types";
import Productcard from "../product/ProductCard";
import { withRouter } from "react-router";
import { Row, Col, Divider, Tag } from "antd";
import styleVariable from "../../styleVariable";
import { AppContext } from "../../context/context";

const GlobalsearchResult = ({ state, history }) => {
  const items = [];
  const { globalSearch } = useContext(AppContext);
  const { search } = globalSearch;

  const goToPage = (key, value) => {
    history.push(key === "categories" && `/categories/${value.name}`);
    search("");
  };
  for (const [key, values] of Object.entries(state)) {
    if (Array.isArray(values) && values.length > 0) {
      items.push(
        <Col span={24} key={key} style={{ margin: "2%" }}>
          <Row justify="center">
            <Tag
              color={styleVariable.secondaryColor}
              style={{ padding: "0% 1%" }}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </Tag>
          </Row>

          <Row
            gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
            style={{
              paddingLeft: "4%",
              paddingRight: "4%",
              justifyContent: "space-evenly",
            }}
          >
            {values.map((value) => (
              <React.Fragment key={value.id}>
                {key !== "products" && (
                  <div
                    key={value.name}
                    style={{
                      marginTop: "1%",
                      padding: "1% 2%",
                      boxShadow:
                        "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
                      background: "#fff",
                      borderRadius: "2px",
                      position: "relative",
                      cursor: "pointer",
                    }}
                    onClick={() => goToPage(key, value)}
                  >
                    {value.name}
                  </div>
                )}
                {key === "products" && <Productcard product={value} />}
              </React.Fragment>
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
