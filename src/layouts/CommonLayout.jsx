import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const CommonLayout = ({ children }) => {
  return (
    <>
    
      <Header />
    <div className="container common-layout" style={{height:"calc(100vh - 230px)"}}>
      <main>{children}</main>
    </div>
    <Footer />
    </>
  );
};

export default CommonLayout;
