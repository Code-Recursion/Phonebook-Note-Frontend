import React from "react";

const Star = ({ bg = "white", width = 24, height = 24 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.76471 1L11.164 6.11115L16.5294 6.9358L12.6471 10.912L13.5633 16.5294L8.76471 13.8759L3.96612 16.5294L4.88235 10.912L1 6.9358L6.36541 6.11115L8.76471 1Z"
        fill="white"
        stroke="black"
        strokeWidth="0.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Star;
