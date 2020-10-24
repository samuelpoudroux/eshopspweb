import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Select,
  Tag,
  Col,
  Row,
  Checkbox,
  Divider,
  Input,
  notification,
} from "antd";
import { PlusCircleOutlined, SmileOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import {
  SORT_PRODUCTS_BY_HIGHER,
  SORT_PRODUCTS_BY_LOWEST,
  SORT_PRODUCTS_BY_MAX_PRICE,
} from "../../constants/products";

import { LOWEST, HIGHEST } from "../../constants/category";

import useResponsive from "../../customHooks/responsiveHook";

const { REACT_APP_API_DOMAIN, REACT_APP_API_CATEGORIES } = process.env;

const { Option } = Select;
const { CheckableTag } = Tag;

const SortProducts = ({ categoriesHandleChange, products }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [categories, setCategories] = useState([]);
  const [value, setValue] = useState(null);
  const [newMaxBudget, setNewMaxBudget] = useState(null);
  const [items, setItems] = useState([
    { id: 1, value: "LOWEST", name: "Prix croissant" },
    { id: 2, value: "HIGHEST", name: "Prix Décroissant" },
  ]);

  const { isMobile } = useResponsive();

  const selectHandleChange = (value) => {
    setValue(value);
    value === HIGHEST && products.sort(SORT_PRODUCTS_BY_HIGHER);
    value === LOWEST && products.sort(SORT_PRODUCTS_BY_LOWEST);
    value !== LOWEST &&
      value !== HIGHEST &&
      products.sort(SORT_PRODUCTS_BY_MAX_PRICE, value);
  };

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);
    categoriesHandleChange(nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };

  const selectAllCategoriesButtonHandle = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectAllCategories(!selectAllCategories);
      setSelectedTags(categories);
      categoriesHandleChange(categories);
    } else {
      setSelectedTags([]);
    }
  };

  const addNewItem = () => {
    const priceMaxExisted = items.find((e) => e.value === newMaxBudget);
    if (!priceMaxExisted && newMaxBudget !== null) {
      const item = {
        id: uuidv4(),
        value: newMaxBudget,
        name: `${newMaxBudget}€`,
      };

      setItems([...items, item]);
      setNewMaxBudget(null);
    } else if (!priceMaxExisted && newMaxBudget === null) {
      notification.open({
        message: `Merci d'indiquer une valeur`,
        icon: <SmileOutlined style={{ color: "red" }} />,
        duration: 1,
      });
    } else {
      notification.open({
        message: `Le budget maximum de ${newMaxBudget}€ est déjà existant`,
        icon: <SmileOutlined style={{ color: "red" }} />,
        duration: 1,
      });
    }
  };

  useEffect(() => {
    Axios.get(
      REACT_APP_API_DOMAIN + REACT_APP_API_CATEGORIES
    ).then(({ data }) => setCategories(data));
  }, []);

  useEffect(() => {
    setValue("");
  }, [selectedTags]);

  const colorText = { color: "#878888" };

  return (
    <Col span={24} style={{ padding: 15 }}>
      <Row align="middle">
        <Col lg={8} md={6} sm={24} xs={24}>
          <Row justify="space-between" align="middle">
            <Col lg={3} md={4} sm={2} xs={2}>
              <span style={{ ...colorText }}>Prix:</span>
            </Col>
            <Col lg={21} md={20} sm={22} xs={22}>
              <Select
                dropdownRender={(menu) => (
                  <div>
                    {menu}
                    <Divider style={{ margin: "4px 0" }} />
                    <Row
                      align="middle"
                      justify="space-between"
                      style={{
                        padding: 8,
                      }}
                    >
                      <Col span={21}>
                        <Input
                          type="number"
                          min={0}
                          placeholder="Budget max"
                          value={newMaxBudget}
                          onChange={(e) => setNewMaxBudget(e.target.value)}
                        />
                      </Col>
                      <Col span={2}>
                        <PlusCircleOutlined onClick={() => addNewItem()} />
                      </Col>
                    </Row>
                  </div>
                )}
                style={{ width: 150 }}
                onChange={(value) => selectHandleChange(value)}
                value={value}
              >
                {items.map((item) => (
                  <Option value={item.value} key={item.id}>
                    {item.name}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>
        </Col>
        <Col
          lg={8}
          md={10}
          sm={24}
          xs={24}
          style={{ marginTop: isMobile && 15 }}
        >
          <Row align="middle">
            <Col lg={5} md={6} sm={8} xs={8}>
              <span style={{ ...colorText }}>Categories:</span>
            </Col>
            <Col lg={19} md={18} sm={16} xs={16}>
              {categories.map((tag) => (
                <CheckableTag
                  style={{
                    ...colorText,
                    width: "auto",
                    border: "1px #878888 dotted",
                  }}
                  key={tag.id}
                  checked={selectedTags.indexOf(tag) > -1}
                  onChange={(checked) => handleChange(tag, checked)}
                >
                  {tag.name}
                </CheckableTag>
              ))}
            </Col>
          </Row>
        </Col>
        <Col md={8} sm={24} xs={24} style={{ marginTop: isMobile && 15 }}>
          <Row>
            <Checkbox onChange={(e) => selectAllCategoriesButtonHandle(e)}>
              <span style={{ ...colorText }}>
                Selectionner toutes les catégories
              </span>
            </Checkbox>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default SortProducts;
