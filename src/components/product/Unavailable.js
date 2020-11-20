import React from "react";
import styleVariable from "../../styleVariable";

export const Unavailable = ({ stockNumber, num, placement, position }) => {
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
