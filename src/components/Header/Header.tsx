import React from "react";
import "./Header.css";

type HeaderProps = {
  black: boolean,
  setSearchItem: (item: any) => void
}

export default ({ black, setSearchItem }: HeaderProps) => {
  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src="../../assets/images/iconsfilmes.png" alt="Fire Movies" />
        </a>
      </div>

      <input
        className="search"
        type="text"
        placeholder="Pesquisa🔎"
        onChange={(e) => {
          setSearchItem(e.target.value);
        }}
      />
    </header>
  );
};
