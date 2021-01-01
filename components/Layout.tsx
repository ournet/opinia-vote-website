import React, { ReactNode } from "react";
import { BaseComponentProps } from "./common";
import Navbar from "./Navbar";

const Layout: React.FC<BaseComponentProps> = (props) => (
  <div>
    <Navbar lang={props.lang} />
    {props.children}
  </div>
);

export default Layout;
