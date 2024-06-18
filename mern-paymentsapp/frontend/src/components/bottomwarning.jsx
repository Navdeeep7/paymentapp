import React from 'react';
import { Link } from 'react-router-dom';

const BottomWarning = ({ label, to, buttonText }) => {
  return (
    <div className="text-sm flex justify-center font-medium">
      <div>
        {label}
      </div>
      <div className="underline cursor-pointer">
        <Link to={to}>{buttonText}</Link>
      </div>
    </div>
  );
};

export default BottomWarning;
