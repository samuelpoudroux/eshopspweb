import React, { useCallback, useContext } from "react";
import { HeartOutlined } from "@ant-design/icons";
import { Badge, Row } from "antd";

const FavoriteNumber = ({
  setFavoriteActive,
  favoriteIsActive,
  iconBasketColor,
  BadgeStyle,
}) => {
  const favoriteList = JSON.parse(localStorage.getItem("favorites")) || [];

  return (
    <Badge
      style={{ ...BadgeStyle, minWidth: "50px" }}
      count={favoriteList.length}
      offset={[23, -5]}
    >
      <HeartOutlined
        style={{
          fontSize: "20px",
          color: iconBasketColor || "white",
        }}
        onClick={() => setFavoriteActive(!favoriteIsActive)}
      />
    </Badge>
  );
};

export default FavoriteNumber;
