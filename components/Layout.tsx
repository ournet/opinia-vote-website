import React from "react";
import Navbar from "./Navbar";

const Layout: React.FC = (props) => (
  <div>
    <Navbar />
    {props.children}
  </div>
);

export default Layout;
