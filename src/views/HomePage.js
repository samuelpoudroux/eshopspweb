import React, { useContext } from "react";
import NewNess from "../components/product/NewNess";
import { Col, Divider, Row } from "antd";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";
import StickyBar from "../components/product/StickyBar";
import { AppContext } from "../context/context";
import scrollTop from "../repository/scrollTop";
import PageHeader from "../components/PageHeader";

const HomePage = ({ history }) => {
  const { appRef } = useContext(AppContext);
  const { categories, setCategories } = useCategory();
  const { isMobile } = useResponsive();

  const goToCategory = (category) => {
    scrollTop(appRef);
    history.push(`/categories/${category.name}`);
  };
  return (
    <Col>
      <StickyBar title="ACCUEIL" />
      <PageHeader title={"ACCUEIL"} />
      <Row justify="center" gutter={[0, 30]} style={{ marginTop: 40 }}>
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
                  style={{
                    margin: 20,
                    background: `linear-gradient(0deg, #0000008a, #89ba17), url(${category.imageUrl})`,
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                  xs={24}
                  md={12}
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
