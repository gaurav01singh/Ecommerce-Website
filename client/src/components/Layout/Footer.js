import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">All right reserver &copy; Gaurav</h4>
      <p className="text-center mt-3">
        <Link to="/about">about</Link>
        <Link to="/contact">contect</Link>
        <Link to="/policy">Privacy policy</Link>
      </p>
    </div>
  );
};

export default Footer;
