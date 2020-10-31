import React, { useState, useEffect } from "react";
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
import styleVariable from "../../styleVariable";
import useCategory from "../../customHooks/categoryHook";

const { Option } = Select;
const { CheckableTag } = Tag;

const SortProducts = ({ categoriesHandleChange, products }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectAllCategories, setSelectAllCategories] = useState(false);
  const [value, setValue] = useState(null);
  const { categories, setCategories } = useCategory();
  const [items, setItems] = useState([
    { id: 1, value: "LOWEST", name: "Prix croissant" },
    { id: 2, value: "HIGHEST", name: "Prix Décroissant" },
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
      <Row align="middle" gutter={[15, 15]} justify="start">
        <Col xl={1} lg={6} xs={12}>
          <span>Prix:</span>
        </Col>
        <Col xl={2} lg={6} xs={12}>
          <Select
            dropdownRender={(menu) => (
              <div>
                {menu}
                <Divider style={{ margin: "4px 0" }} />
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

        <Col xl={2} lg={6} xs={12}>
          <span>Budget maximum: </span>
        </Col>
        <Col xl={2} lg={6} xs={12}>
          <Input
            type="number"
            min={0}
            placeholder="Budget max"
            onChange={(e) => sortByMaxBudget(e.target.value)}
          />
        </Col>
        <Col xl={1} lg={1} xs={12}>
          <span>Categories:</span>
        </Col>
        <Col lg={4} xs={12}>
          {categories.list.map((tag) => (
            <CheckableTag
              style={{
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
        <Col xl={4} lg={6} xs={24}>
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
