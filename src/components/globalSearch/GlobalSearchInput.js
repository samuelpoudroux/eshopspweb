import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/context';
import { Col } from 'antd';
import useResponsive from '../../customHooks/responsiveHook';

const Globalsearchinput = ({ globalSearchApi }) => {
  const [searchValue, setSearchValue] = useState(undefined);
  const { globalSearch } = useContext(AppContext);
  const { search } = globalSearch;
  const { isMobile } = useResponsive();

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
    <Col md={24} xs={24} sm={24} lg={24}>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="globalSearchInput"
        style={{
          display: 'flex',
          position: 'relative',
          marginTop: isMobile ? '8%' : '2%'
        }}
      >
        <input
          style={{
            borderRadius: '8px',
            height: '50px'
          }}
          type="text"
          placeholder="Rechercher"
          name="search"
          onChange={(e) => globalSearchHandleChange(e.target.value)}
        />
        <button
          style={{
            borderRadius: '8px ',
            width: '90px',
            marginLeft: '-80px',
            height: '50px'
          }}
          type="submit"
        >
          <i className="fa fa-search"></i>
        </button>
      </form>
    </Col>
  );
};

Globalsearchinput.propTypes = {};

export default Globalsearchinput;
