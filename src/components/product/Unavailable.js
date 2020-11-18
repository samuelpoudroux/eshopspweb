import React from "react";

export const Unavailable = ({ stockNumber, placement }) => {
  return (
    <div>
      {stockNumber === 0 && (
        <div
          style={{
            position: "absolute",
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
    </div>
  );
};
