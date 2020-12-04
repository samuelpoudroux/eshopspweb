import React, { useEffect, useState } from "react";
import Axios from "axios";
import styleVariable from "../../styleVariable";

const {
  REACT_APP_API_DOMAIN,
  REACT_APP_API_PRODUCT,
  REACT_APP_API_STOCK_NUMBER,
} = process.env;
export const Unavailable = ({ uid, num, placement, position }) => {
  const [stockNumber, setStockNumber] = useState(0);

  const getStockNumber = async () => {
    const { data } = await Axios.get(
      REACT_APP_API_DOMAIN +
        REACT_APP_API_PRODUCT +
        REACT_APP_API_STOCK_NUMBER +
        uid
    );
    setStockNumber(data);
  };

  useEffect(() => {
    getStockNumber();
  }, []);

  return (
    <div>
      {stockNumber === 0 && (
        <div
          style={{
            position: position ? position : "absolute",
            transform: "rotate(15deg)",
            zIndex: 1,
            fontSize: "12px",
            border: "1px solid red",
            padding: 3,
            color: "red",
            ...placement,
          }}
        >
          stock épuisé
        </div>
      )}

      {stockNumber <= num && stockNumber !== 0 && (
        <div
          style={{
            position: "absolute",
            transform: "rotate(15deg)",
            zIndex: 1,
            fontSize: "12px",
            border: `1px solid ${styleVariable.secondaryColor}`,
            padding: 3,
            color: styleVariable.secondaryColor,
            ...placement,
          }}
        >
          Maximum disponible
        </div>
      )}
    </div>
  );
};
