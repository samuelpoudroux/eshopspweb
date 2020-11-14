import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import PropTypes from "prop-types";
import { AppContext } from "../../context/context";
import scrollTop from "../../repository/scrollTop";
import { useState } from "react";
import { withRouter } from "react-router";

const CategoryCard = ({ history, id }) => {
  const { appRef } = useContext(AppContext);
  const [category, setCategory] = useState(undefined);
  const { REACT_APP_API_DOMAIN, REACT_APP_API_CATEGORIES } = process.env;

  const goToCategory = () => {
    scrollTop(appRef);
    history.push(`/categories/${category.name}`);
  };

  const getCategory = async () => {
    const { data } = await axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_CATEGORIES + id
    );
    setCategory(data);
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <Col
      key={id}
      className="categoryTag"
      style={{
        background: `linear-gradient(0deg, #0000008a, #89ba17), url(${
          category && category.imageUrl
        })`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      xs={24}
      md={12}
      xxl={4}
      key={category && category.id}
      onClick={() => goToCategory()}
    >
      <Row justify="center" align="middle">
        <b style={{ fontSize: "1.2em" }}>
          {category && category.name && category.name.toUpperCase()}
        </b>
      </Row>
    </Col>
  );
};

CategoryCard.propTypes = {};

export default withRouter(CategoryCard);
