import React, { useState, useEffect } from "react";
import { Select, Tag, Col, Row, Checkbox, Divider, Input } from "antd";

import {
  SORT_PRODUCTS_BY_HIGHER,
  SORT_PRODUCTS_BY_LOWEST,
  SORT_PRODUCTS_BY_MAX_PRICE,
} from "../../constants/products";

import { LOWEST, HIGHEST } from "../../constants/category";

import styleVariable from "../../styleVariable";
import useCategory from "../../customHooks/categoryHook";
import { upperCase } from "../../helpers/UpperCase";
import useResponsive from "../../customHooks/responsiveHook";

const { Option } = Select;
const { CheckableTag } = Tag;

const SortProducts = ({ categoriesHandleChange, products }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [value, setValue] = useState(null);
  const { categories, setCategories } = useCategory();
  const { isMobile } = useResponsive();
  const [items, setItems] = useState([
    {
      id: 1,
      value: "LOWEST",
      name: "Prix croissant",
      color: "grey",
    },
    {
      id: 2,
      value: "HIGHEST",
      name: "Prix Décroissant",
      color: styleVariable.secondaryColor,
    },
  ]);

  const selectHandleChange = (value) => {
    setValue(value);
    value === HIGHEST && products.sort(SORT_PRODUCTS_BY_HIGHER);
    value === LOWEST && products.sort(SORT_PRODUCTS_BY_LOWEST);
  };

  const sortByMaxBudget = (value) => {
    products.sort(SORT_PRODUCTS_BY_MAX_PRICE, value);
  };

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked
      ? [...selectedTags, tag]
      : selectedTags.filter((t) => t.id !== tag.id);
    categoriesHandleChange(nextSelectedTags);
    setSelectedTags(nextSelectedTags);
  };
  console.log("nexSelect", selectedTags);

  const selectAllCategoriesButtonHandle = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectAllCategories(!selectAllCategories);
      setSelectedTags(categories.list);
      categoriesHandleChange(categories.list);
    } else {
      setSelectedTags([]);
    }
  };

  useEffect(() => {
    setValue("");
  }, [selectedTags]);

  return (
    <Col span={24} style={{ padding: 15 }}>
      <Row align="middle" justify="start" gutter={isMobile && [8, 15]}>
        <Col
          xl={{ span: 1 }}
          md={{ span: 1 }}
          lg={{ span: 1 }}
          xs={{ span: 2 }}
        >
          <span>Prix:</span>
        </Col>
        <Col
          xl={{ span: 3 }}
          lg={{ span: 5 }}
          md={{ span: 5 }}
          xs={{ span: 15, offset: 1 }}
        >
          <Select
            style={{ width: "100%" }}
            className="inputStyle"
            bordered={false}
            dropdownRender={(menu) => <div>{menu}</div>}
            onChange={(value) => selectHandleChange(value)}
            value={value}
          >
            {items.map((item) => (
              <Option
                style={{ color: item.color }}
                value={item.value}
                key={item.id}
              >
                {item.name}
              </Option>
            ))}
          </Select>
        </Col>

        <Col
          xxl={{ span: 2, offset: 1 }}
          xl={{ span: 3, offset: 1 }}
          lg={{ span: 3 }}
          md={{ span: 4 }}
          xs={{ span: 9 }}
        >
          <span style={{ color: styleVariable.secondaryColor }}>
            Budget maximum:{" "}
          </span>
        </Col>
        <Col
          xxl={{ span: 2 }}
          xl={{ span: 3 }}
          lg={{ span: 12 }}
          md={{ span: 10 }}
          xs={10}
        >
          <Input
            className="inputStyle"
            bordered={false}
            type="number"
            min={0}
            style={{ width: "100%" }}
            placeholder="Budget max"
            onChange={(e) => sortByMaxBudget(e.target.value)}
          />
        </Col>
        <Col
          xxl={{ span: 1 }}
          xl={{ span: 2, offset: 1 }}
          lg={{ span: 4 }}
          md={{ span: 5 }}
          xs={6}
        >
          <span>Categories:</span>
        </Col>
        <Col
          xxl={{ span: 7 }}
          xl={{ span: 9 }}
          lg={{ span: 12 }}
          md={{ span: 10 }}
          xs={18}
        >
          <Row justify="start">
            {categories.list.map((tag) => (
              <CheckableTag
                className="inputStyle"
                style={{
                  width: "auto",
                }}
                key={tag.id}
                checked={selectedTags.indexOf(tag) > -1}
                onChange={(checked) => handleChange(tag, checked)}
              >
                {upperCase(tag.name)}
              </CheckableTag>
            ))}
          </Row>
        </Col>
        <Col
          xxl={{ span: 4 }}
          xl={{ span: 24 }}
          lg={8}
          md={{ span: 8 }}
          xs={24}
        >
          <Row>
            <Checkbox onChange={(e) => selectAllCategoriesButtonHandle(e)}>
              <span style={{ color: styleVariable.mainColor }}>
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
