import React from "react";
import NewNess from "../components/product/NewNess";
import { Col, Divider, Row } from "antd";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";

const HomePage = ({ history }) => {
  const { categories, setCategories } = useCategory();
  const { isMobile } = useResponsive();
  return (
    <Row justify="center">
      <Col xxl={12} xs={24} style={{ padding: 10, paddingTop: 0 }}>
        <h1 style={{ textAlign: "center" }}>Nos produits HOMEMADE</h1>
        <Row className="productCard" justify="center" style={{ padding: 20 }}>
          <iframe
            width="100%"
            height="315"
            src="https://www.youtube.com/embed/7iOpxGok9ig?autoplay=1&&mute=1"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </Row>
      </Col>
      <Col xxl={12} xs={24} style={{ padding: 10 }}>
        <h1 style={{ textAlign: "center", color: styleVariable.mainColor }}>
          {" "}
          Qui sommes-nous ?
        </h1>
        <Row justify="center">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum,
          excepturi exercitationem nostrum quis eaque maiores itaque pariatur
          quas provident ad est quisquam minus, libero esse non cupiditate,
          consequatur nulla eos?
        </Row>
      </Col>

      {isMobile && (
        <Col span={20}>
          <Divider className="dividerAuth" />
        </Col>
      )}
      <Col span={24}>
        <NewNess />
      </Col>

      {isMobile && (
        <Col span={20}>
          <Divider style={{ width: "10px" }} className="dividerAuth" />
        </Col>
      )}

      <Col span={24}>
        <Row justify="center">
          <h2 style={{ color: styleVariable.mainColor }}>Nos Catégories</h2>
        </Row>
        <Row style={{ padding: 10 }} justify="center">
          {categories.list.length > 0 &&
            categories.list.map((category) => (
              <Col
                className="categoryTag"
                style={{ margin: 20 }}
                xs={24}
                xxl={4}
                onClick={() => history.push(`/categories/${category.name}`)}
              >
                <Row justify="center" align="middle">
                  <b style={{ fontSize: "1.2em" }}>
                    {category.name.toUpperCase()}
                  </b>
                </Row>
              </Col>
            ))}
        </Row>
      </Col>
    </Row>
  );
};

export default HomePage;
