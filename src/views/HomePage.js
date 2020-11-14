import React, { useContext, useEffect } from "react";
import NewNess from "../components/product/NewNess";
import { Col, Divider, Row } from "antd";
import styleVariable from "../styleVariable";
import useCategory from "../customHooks/categoryHook";
import useResponsive from "../customHooks/responsiveHook";
import StickyBar from "../components/product/StickyBar";
import PageHeader from "../components/PageHeader";
import CategoryCard from "./categories/CategoryCard";
import { AppContext } from "../context/context";

const HomePage = ({ history }) => {
  const { categories, setCategories } = useCategory();
  const { isMobile } = useResponsive();
  const { globalSearch } = useContext(AppContext);
  const { search } = globalSearch;
  useEffect(() => {
    search("");
  }, []);

  return (
    <Col>
      <StickyBar title="ACCUEIL" />
      <PageHeader title={"ACCUEIL"} />
      <Row
        justify="center"
        gutter={[0, 30]}
        style={{ marginTop: isMobile ? 20 : 40 }}
      >
        <Col xxl={12} xs={24}>
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
                <CategoryCard id={category.id} />
              ))}
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default HomePage;
