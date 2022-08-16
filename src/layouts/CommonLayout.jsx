import React from "react";
import Header from "components/Header";
import Footer from "components/Footer";

const CommonLayout = ({ children }) => {
  return (
    <>
    
      <Header />
      <div style={{height:"calc(100vh - 230px)"}}>

    <div className="container common-layout" >
      <main>{children}</main>
    </div>
    <Footer />
      </div>
    </>
  );
};

export default CommonLayout;
