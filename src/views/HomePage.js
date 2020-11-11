import React, { useContext } from "react";
import NewNess from "../components/product/NewNess";
import { Col, Divider, Row } from "antd";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";
import StickyBar from "../components/product/StickyBar";
import { AppContext } from "../context/context";

const HomePage = ({ history }) => {
  const { appRef } = useContext(AppContext);
  const { categories, setCategories } = useCategory();
  const { isMobile } = useResponsive();

  const goToCategory = (category) => {
    appRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    history.push(`/categories/${category.name}`);
  };
  return (
    <Col>
      <StickyBar title="ACCUEIL" />
      <Row justify="center" gutter={[0, 30]}>
        <Col xxl={12} xs={24} style={{ padding: 10 }}>
          <h1 style={{ textAlign: "center", color: styleVariable.mainColor }}>
            {" "}
            QUI SOMMES-NOUS ?
          </h1>
          <Row justify="center">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illum,
            excepturi exercitationem nostrum quis eaque maiores itaque pariatur
            quas provident ad est quisquam minus, libero esse non cupiditate,
            consequatur nulla eos?
          </Row>
        </Col>

        {isMobile && (
          <Col span={5}>
            <Divider
              style={{
                width: "10px",
                background: styleVariable.secondaryColor,
              }}
            />
          </Col>
        )}

        <Col span={24}>
          <NewNess />
        </Col>

        {isMobile && (
          <Col span={5}>
            <Divider
              style={{
                width: "10px",
                background: styleVariable.secondaryColor,
              }}
            />
          </Col>
        )}

        <Col span={24}>
          <Row justify="center">
            <h2 style={{ color: styleVariable.mainColor }}>NOS CATÉGORIES</h2>
          </Row>
          <Row style={{ padding: 10 }} justify="center">
            {categories.list.length > 0 &&
              categories.list.map((category) => (
                <Col
                  className="categoryTag"
                  style={{ margin: 20 }}
                  xs={24}
                  xxl={4}
                  key={category.id}
                  onClick={() => goToCategory(category)}
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
    </Col>
  );
};

export default HomePage;
