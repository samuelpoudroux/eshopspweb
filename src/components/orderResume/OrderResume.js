import React, { useState, useEffect } from "react";
import { Col, Divider, Row, notification } from "antd";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import ProductCardResume from "./ProductCardResume";
import styleVariable from "../../styleVariable";
import {
  getTotalPrice,
  checkProductsAvaibality,
} from "../../repository/product";
import { SmileOutlined } from "@ant-design/icons";
import _ from "lodash";
import useCategory from "../../customHooks/categoryHook";
import { upperCase } from "../../helpers/UpperCase";

const OrderResume = ({ basketList }) => {
  const [billsAddress, setBillsAddress] = useState();
  const [dropAddress, setDropAddress] = useState();
  const { categories, setCategories } = useCategory();

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

  return (
    <Col>
      <h2 style={{ textAlign: "center", color: styleVariable.secondaryColor }}>
        Récapitulatif de la commande
      </h2>
      <Row type="flex" justify="center" style={{ marginTop: 30 }}>
        <Col
          xxl={6}
          md={24}
          xs={24}
          lg={12}
          className="productCard"
          style={{ padding: 15 }}
        >
          <Row justify="center" style={{ color: styleVariable.secondaryColor }}>
            <b>Vos adresses</b>{" "}
          </Row>
          <Row justify="center" gutter={[0, 20]}>
            <Col xxl={24} xs={24}>
              <Col xxl={24} xs={24}>
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
              <Col xxl={24} xs={24}>
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
            </Col>
          </Row>
        </Col>

        <Col
          xxl={18}
          md={24}
          xs={24}
          lg={12}
          className="productCard"
          style={{ padding: 15 }}
        >
          <Row justify="center" style={{ color: styleVariable.secondaryColor }}>
            <b>Liste de produits</b>
          </Row>
          <Row
            style={{
              padding: 10,
            }}
            justify="center"
            gutter={[0, 5]}
          >
            {categories &&
              categories.list &&
              categories.list.length > 0 &&
              categories.list.map((category) => {
                return (
                  basketList.find(
                    (product) => product.category === category.name
                  ) && (
                    <Col
                      xxl={11}
                      xs={24}
                      style={{ margin: 20 }}
                      className="productCard"
                    >
                      <Row
                        style={{
                          padding: 10,
                          color: "white",
                          background: styleVariable.secondaryColor,
                        }}
                        justify=""
                      >
                        <b>{upperCase(category.name)}</b>
                      </Row>
                      <Row justify="start">
                        {basketList &&
                          basketList.length > 0 &&
                          basketList.map((item) => {
                            return (
                              item.category === category.name && (
                                <ProductCardResume
                                  key={item.id}
                                  product={item}
                                />
                              )
                            );
                          })}
                      </Row>
                    </Col>
                  )
                );
              })}
          </Row>
          <Divider className="dividerAuth" />
          <Row
            style={{ padding: 20 }}
            justify="center"
            align="middle"
            gutter={[15, 15]}
          >
            <Col>
              <b style={{ fontSize: "1.5em" }}>Total à payer: </b>
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
