import React, { useState, useContext } from "react";
import { AppContext } from "../../context/context";
import { Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styleVariable from "../../styleVariable";

const Globalsearchinput = ({ globalSearchApi }) => {
  const [searchValue, setSearchValue] = useState(undefined);
  const { globalSearch } = useContext(AppContext);
  const { search } = globalSearch;

  const globalSearchHandleChange = (searchValue) => {
    setSearchValue(searchValue);
    search(searchValue, globalSearchApi);
  };

  return (
    <Input
      bordered={false}
      className="globalSearchInput"
      type="text"
      placeholder="Rechercher"
      name="search"
      onChange={(e) => globalSearchHandleChange(e.target.value)}
      suffix={<SearchOutlined style={{ color: styleVariable.thirdColor }} />}
    />
  );
};

Globalsearchinput.propTypes = {};

export default Globalsearchinput;
