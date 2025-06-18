import React from "react";

const StarFilled = ({ bg = "white", width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.76471 0L10.164 5.11115L15.5294 5.9358L11.6471 9.91204L12.5633 15.5294L7.76471 12.8759L2.96612 15.5294L3.88235 9.91204L0 5.9358L5.36541 5.11115L7.76471 0Z"
        fill="#1B1B1B"
      />
    </svg>
  );
};

export default StarFilled;
