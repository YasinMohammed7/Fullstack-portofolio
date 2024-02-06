import React from "react";
import Header from "../pages/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../pages/footer/Footer";

const Layout = ({ width }) => {
  return (
    <>
      <Header width={width} />
      <Outlet />
      <Footer width={width} />
    </>
  );
};

export default Layout;
