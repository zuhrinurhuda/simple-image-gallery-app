import React from "react";
import { useLocation, NavLink } from "react-router-dom";

import style from "./Navigation.module.css";

type Props = {};

const Navigation: React.FC<Props> = () => {
  const location = useLocation();

  return (
    <nav className={style.navContainer}>
      <NavLink className={style.navLink} to="/">
        <div
          className={`${style.iconWrapper} ${
            location.pathname === "/" ? style.active : ""
          }`}
        >
          {location.pathname === "/" ? (
            <span className="material-icons">home</span>
          ) : (
            <span className="material-icons-outlined">home</span>
          )}
          Home
        </div>
      </NavLink>
      <NavLink className={style.navLink} to="/my-favorite">
        <div
          className={`${style.iconWrapper} ${
            location.pathname === "/my-favorite" ? style.active : ""
          }`}
        >
          {location.pathname === "/my-favorite" ? (
            <span className="material-icons">favorite</span>
          ) : (
            <span className="material-icons-outlined">favorite_border</span>
          )}
          Favorite
        </div>
      </NavLink>
    </nav>
  );
};

export default Navigation;
