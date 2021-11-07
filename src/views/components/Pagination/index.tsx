import React from "react";

import style from "./Pagination.module.css";

type Props = {
  onChange: (type: "prev" | "next") => void;
};

const Pagination: React.FC<Props> = ({ onChange }) => {
  return (
    <div className={style.container}>
      <button className={style.button} onClick={() => onChange("prev")}>
        Prev
      </button>
      <button className={style.button} onClick={() => onChange("next")}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
