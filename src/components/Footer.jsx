import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <p className="footer-links">
       
        <span> / </span>
        <a href="mailto:contact@sivadass.in" target="_blank">
          Need any help?
        </a>
        <span> / </span>
        <a href="/" target="_blank">
          OrderFoods
        </a>
        <span> / </span>
        <a href="https://sivadass.in" target="_blank">
          Read My Blog
        </a>
      </p>
      <p>
        &copy; {currentYear} <strong>Order Foods</strong> -Food Store
      </p>
    </footer>
  );
};

export default Footer;
