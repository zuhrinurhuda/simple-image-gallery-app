import React from "react";

import style from "./Container.module.css";

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({ children }) => {
  return <div className={style.container}>{children}</div>;
};

export default Container;
