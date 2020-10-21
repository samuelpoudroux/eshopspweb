import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Select, Tag, Col, Row, Checkbox } from "antd";

import {
  SORT_PRODUCTS_BY_HIGHER,
  SORT_PRODUCTS_BY_LOWEST,
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

  const { isMobile } = useResponsive();

  const selectHandleChange = (value) => {
    setValue(value);
    value === HIGHEST && products.sort(SORT_PRODUCTS_BY_HIGHER, products);
    value === LOWEST && products.sort(SORT_PRODUCTS_BY_LOWEST, products);
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
        <Col lg={8} md={8} sm={24} xs={24}>
          <Row justify="space-around" align="middle">
            <Col lg={3} md={2} sm={2} xs={2}>
              <span style={{ ...colorText }}>Prix:</span>
            </Col>
            <Col lg={21} md={22} sm={22} xs={22}>
              <Select
                style={{ width: 150 }}
                onChange={(value) => selectHandleChange(value)}
                value={value}
              >
                <Option style={{ ...colorText }} value={LOWEST}>
                  Prix croissant
                </Option>
                <Option style={{ ...colorText }} value={HIGHEST}>
                  Prix décroissant
                </Option>
              </Select>
            </Col>
          </Row>
        </Col>
        <Col md={8} sm={24} xs={24} style={{ marginTop: isMobile && 15 }}>
          <Row align="middle">
            <Col lg={1} md={2} sm={2} xs={2}>
              <span style={{ ...colorText }}>Categories:</span>
            </Col>
            <Col lg={23} md={2} sm={22} xs={22}>
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
