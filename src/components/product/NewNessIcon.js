import React from "react";
import PropTypes from "prop-types";
import styleVariable from "../../styleVariable";

const NewNessIcon = ({ height, width, style }) => {
  return (
    <div style={style}>
      <svg
        enable-background="new 0 0 96 96"
        height={height}
        id="Layer_1"
        version="1.1"
        viewBox="0 0 96 96"
        width={width}
      >
        <path
          d="  M34.183,66.082c-1.561,0.271-2.96,0.314-3.769-0.496c-2.016-2.015,1.254-7.69,0.146-10.363c-1.069-2.579-7.431-4.257-7.431-7.223  s6.361-4.644,7.431-7.223c1.108-2.673-2.16-8.35-0.146-10.363c2.015-2.016,7.69,1.254,10.363,0.146  c2.579-1.069,4.257-7.431,7.223-7.431s4.644,6.361,7.223,7.431c2.673,1.109,8.35-2.16,10.363-0.146  c0.846,0.846,0.761,2.337,0.459,3.979"
          fill={styleVariable.secondaryColor}
          stroke={styleVariable.secondaryColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
        <path
          d="  M65.363,37.748c-0.193,1.159-0.255,2.229,0.077,3.029c1.069,2.579,7.431,4.257,7.431,7.223s-6.361,4.644-7.431,7.223  c-1.109,2.673,2.16,8.35,0.146,10.363c-2.015,2.016-7.69-1.254-10.363-0.146c-2.579,1.069-4.257,7.431-7.223,7.431  s-4.644-6.361-7.223-7.431c-0.771-0.32-1.794-0.275-2.907-0.099"
          fill={styleVariable.thirdColor}
          stroke={styleVariable.secondaryColor}
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-miterlimit="10"
          stroke-width="2"
        />
      </svg>
    </div>
  );
};

NewNessIcon.propTypes = {};

export default NewNessIcon;
