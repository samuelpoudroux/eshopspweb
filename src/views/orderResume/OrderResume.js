import React, { useState, useEffect } from "react";
import { Col, Divider, Row } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ProductCardResume from "./ProductCardResume";
import styleVariable from "../../styleVariable";
import { getTotalPrice } from "../../repository/product";

const OrderResume = () => {
  const [billsAddress, setBillsAddress] = useState();
  const [dropAddress, setDropAddress] = useState();

  const addBillsAddress = (value) => {
    setBillsAddress(value);
    localStorage.setItem("billsAddress", JSON.stringify(value));
  };
  const addDropAddress = (value) => {
    setDropAddress(value);
    localStorage.setItem("dropAddress", JSON.stringify(value));
  };

  const getInitialAddressData = async () => {
    if (localStorage.getItem("billsAddress")) {
      setBillsAddress(JSON.parse(localStorage.getItem("billsAddress")));
    } else if (
      localStorage.getItem("users") &&
      !localStorage.getItem("billsAddress")
    ) {
      const user = await JSON.parse(localStorage.getItem("users"));
      if (user && user.userData) {
        setBillsAddress(JSON.parse(user.userData.billsAddress));
      }
    }

    if (localStorage.getItem("dropAddress")) {
      setDropAddress(JSON.parse(localStorage.getItem("dropAddress")));
    } else if (
      localStorage.getItem("users") &&
      !localStorage.getItem("dropAddress")
    ) {
      const user = await JSON.parse(localStorage.getItem("users"));
      if (user && user.userData) {
        setDropAddress(JSON.parse(user.userData.dropAddress));
      }
    }
  };

  useEffect(() => {
    getInitialAddressData();
  }, []);

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
                    onChange: (value) => addDropAddress(value),
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
                    onChange: (value) => addBillsAddress(value),
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
                <Col span={24} key={item.id}>
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
