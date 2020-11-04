import React, { useState, useContext } from "react";
import { AppContext } from "../../context/context";
import { Col, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const Globalsearchinput = ({ globalSearchApi }) => {
  const [searchValue, setSearchValue] = useState(undefined);
  const { globalSearch } = useContext(AppContext);
  const { search } = globalSearch;

  const globalSearchHandleChange = (searchValue) => {
    setSearchValue(searchValue);
    search(searchValue, globalSearchApi);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchValue !== undefined && searchValue.length > 0)
      search(searchValue);
  };
  return (
    <Col md={24} xs={24} sm={24} lg={24} style={{ marginTop: 20 }}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="globalSearchInput"
        style={{
          display: "flex",
          position: "relative",
        }}
      >
        <Input
          style={{
            borderRadius: "8px",
            height: "50px",
          }}
          type="text"
          placeholder="Rechercher"
          name="search"
          onChange={(e) => globalSearchHandleChange(e.target.value)}
          suffix={<SearchOutlined style={{ color: "white" }} />}
        />
      </form>
    </Col>
  );
};

Globalsearchinput.propTypes = {};

export default Globalsearchinput;
