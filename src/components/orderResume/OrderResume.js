import React, { useState, useEffect } from "react";
import { Col, Divider, Row, notification } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ProductCardResume from "./ProductCardResume";
import styleVariable from "../../styleVariable";
import { getTotalPrice } from "../../repository/product";
import { checkAvaibalityOfProducts } from "../../repository/order";
import { SmileOutlined } from "@ant-design/icons";
import _ from "lodash";

const OrderResume = ({ basketList, setBasketList }) => {
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
  const checkProductsAvaibality = async () => {
    const copy = _.cloneDeep(basketList);
    await Promise.all(
      basketList.map(async (product) => {
        const num = await checkAvaibalityOfProducts(product);
        if (num < product.num) {
          const indexOf = copy.indexOf(copy.find((p) => p.id === product.id));
          copy.splice(indexOf, 1, { ...product, stockAvailable: num });
          notification.open({
            message:
              "Des produits ne sont plus disponibles en quantité suffisante",
            icon: <SmileOutlined style={{ color: "red" }} />,
          });
        }
      })
    );
    await setBasketList(copy);
  };

  useEffect(() => {
    getInitialAddressData();
  }, []);

  useEffect(() => {
    checkProductsAvaibality();
  }, []);

  return (
    <Col>
      <h2 style={{ textAlign: "center" }}>Récapitulatif de la commande</h2>
      <Row type="flex" justify="center" style={{ marginTop: 30 }}>
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
          <Row style={{ marginTop: 20 }}>
            <Col xl={3} xs={8}>
              <Row justify="center">
                <b
                  style={{
                    wordBreak: "break-word",
                    color: styleVariable.thirdColor,
                  }}
                >
                  Nom du produit
                </b>
              </Row>
            </Col>

            <Col xl={21} xs={16}>
              <Row justify="space-between">
                <Col xl={12} xs={12}>
                  <Row justify="center">
                    <b> Qté</b>
                  </Row>
                </Col>
                <Col xl={12} xs={12}>
                  <Row justify="center">
                    <b>Sous-total</b>
                  </Row>
                </Col>
              </Row>
            </Col>
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
            {basketList &&
              basketList.length > 0 &&
              basketList.map((item) => (
                <Col span={24} key={item.id}>
                  <ProductCardResume
                    id={item.id}
                    productName={item.name}
                    productPrice={item.productPrice}
                    num={item.num}
                    stockAvailable={
                      item.stockAvailable ? item.stockAvailable : null
                    }
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
              <span
                style={{
                  fontSize: "1.5em",
                  color: styleVariable.secondaryColor,
                }}
              >
                {getTotalPrice(basketList)}€
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default OrderResume;
