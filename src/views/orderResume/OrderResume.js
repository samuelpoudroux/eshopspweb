import React, { useState, useEffect } from "react";
import { Col, Divider, Row } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ProductCardResume from "./ProductCardResume";
import styleVariable from "../../styleVariable";
import { getTotalPrice } from "../../repository/product";
import StickyBar from "../../components/product/StickyBar";

const OrderResume = () => {
  const user = JSON.parse(localStorage.getItem("users"))
    ? JSON.parse(localStorage.getItem("users"))
    : undefined;

  const [billsAddress, setBillsAddress] = useState(
    localStorage.getItem("billsAddress")
      ? JSON.parse(localStorage.getItem("billsAddress"))
      : user && user.userData.billsAddress
      ? JSON.parse(user.userData.billsAddress)
      : null
  );
  const [dropAddress, setDropAddress] = useState(
    localStorage.getItem("dropAddress")
      ? JSON.parse(localStorage.getItem("dropAddress"))
      : user && user.userData.dropAddress
      ? JSON.parse(user.userData.dropAddress)
      : null
  );
  useEffect(() => {
    billsAddress &&
      localStorage.setItem("billsAddress", JSON.stringify(billsAddress));
  }, [billsAddress]);
  useEffect(() => {
    dropAddress &&
      localStorage.setItem("dropAddress", JSON.stringify(dropAddress));
  }, [dropAddress]);
  const list = JSON.parse(localStorage.getItem("basket")) || [];
  return (
    <Col style={{ padding: 10 }}>
      <h3 style={{ textAlign: "center" }}>Récapitulatif de la commande</h3>
      <Row gutter={16} type="flex" justify="center" style={{ marginTop: 30 }}>
        <Col
          xxl={12}
          md={24}
          xs={24}
          lg={12}
          className="productCard"
          style={{ padding: 15 }}
        >
          <Row justify="center" style={{ color: styleVariable.secondaryColor }}>
            {" "}
            Votre adresse de livraison et facturation
          </Row>
          <Row
            justify="space-between"
            align="middle"
            gutter={[0, 20]}
            style={{ marginTop: 20 }}
          >
            <Col xxl={12} xs={24}>
              <Row justify="center">
                <b style={{ color: styleVariable.thirdColor }}>
                  Adresse de Livraison
                </b>
              </Row>
              <Row justify="center" style={{ marginTop: 15 }}>
                <GooglePlacesAutocomplete
                  selectProps={{
                    value: dropAddress,
                    onChange: (value) => setDropAddress(value),
                  }}
                  apiKey={process.env.REACT_APP_API_GOOGLE_MAP}
                  autocompletionRequest={{
                    bounds: [
                      { lat: 50, lng: 50 },
                      { lat: 100, lng: 100 },
                    ],
                    componentRestrictions: {
                      country: ["fr"],
                    },
                  }}
                />
              </Row>
            </Col>
            <Col xxl={12} xs={24}>
              <Row justify="center">
                <b style={{ color: styleVariable.thirdColor }}>
                  Adresse de Facturation
                </b>
              </Row>
              <Row justify="center" style={{ marginTop: 15 }}>
                <GooglePlacesAutocomplete
                  style={{ width: "100%" }}
                  selectProps={{
                    value: billsAddress,
                    onChange: (value) => setBillsAddress(value),
                  }}
                  apiKey={process.env.REACT_APP_API_GOOGLE_MAP}
                  autocompletionRequest={{
                    bounds: [
                      { lat: 50, lng: 50 },
                      { lat: 100, lng: 100 },
                    ],
                    componentRestrictions: {
                      country: ["fr"],
                    },
                  }}
                />
              </Row>
            </Col>
          </Row>
        </Col>

        <Col
          xxl={12}
          md={24}
          xs={24}
          lg={12}
          className="productCard"
          style={{ padding: 15 }}
        >
          <Row justify="center" style={{ color: styleVariable.secondaryColor }}>
            Votre liste de produits
          </Row>
          <Row
            style={{
              padding: 10,
              marginTop: 20,
            }}
            justify="space-between"
            align="middle"
            gutter={[0, 5]}
          >
            {list &&
              list.length > 0 &&
              list.map((item) => (
                <Col span={24}>
                  <ProductCardResume
                    id={item.id}
                    productName={item.name}
                    productPrice={item.productPrice}
                    num={item.num}
                  />
                </Col>
              ))}
          </Row>
          <Divider className="dividerAuth" />
          <Row
            style={{ padding: 20 }}
            justify="center"
            align="middle"
            gutter={[15, 15]}
          >
            <Col>
              <b style={{ fontSize: "1.5em" }}>Total: </b>{" "}
            </Col>
            <Col>
              <span style={{ fontSize: "1.5em" }}>{getTotalPrice(list)}€</span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default OrderResume;
