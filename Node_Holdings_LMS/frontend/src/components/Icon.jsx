import React from 'react';

// A simple, reusable SVG icon component
const Icon = ({ path, className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={`icon ${className}`}
    width="20"
    height="20"
  >
    <path fillRule="evenodd" d={path} clipRule="evenodd" />
  </svg>
);

export default Icon;