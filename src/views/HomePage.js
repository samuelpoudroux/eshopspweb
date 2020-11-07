import React from "react";
import NewNess from "../components/product/NewNess";
import { Col, Row } from "antd";
import styleVariable from "../styleVariable";

const HomePage = () => {
  return (
    <Row style={{ paddingTop: 10 }}>
      <Col xxl={12} xs={24} style={{ padding: 10 }}>
        <h1 style={{ textAlign: "center" }}>Nos produits HOMEMADE</h1>
        <Row justify="center">
          <iframe
            width="560"
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

      <Col span={24} style={{ marginTop: 15 }}>
        <NewNess />
      </Col>
    </Row>
  );
};

export default HomePage;
