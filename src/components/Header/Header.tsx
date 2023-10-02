import React, { useState } from "react";
import "./Header.css";

type HeaderProps = {
  black: boolean,
  setSearchItem: (item: string) => void
}

export default ({ black, setSearchItem }: HeaderProps) => {
  const [showSearch, setShowSearch] = useState(false);
  const [safeSearch, setSafeSearch] = useState(false);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchItem(e.target.value);
    if (e.target.value === '') {
      setShowSearch(false);
    }
  };

  return (
    <header className={black ? "black" : ""}>
      <div className="header--logo">
        <a href="/">
          <img src={require("../../assets/images/iconsfilmes.png")} alt="fire movies" />
        </a>
      </div>

      {!showSearch && (
        <div
          className="search-icon"
          onClick={() => setShowSearch(true)}
        >
          🔍
        </div>
      )}

      {showSearch && (
        <div className={showSearch ? "search-container show-search" : "search-container"}>
          <input
            className="search"
            type="text"
            placeholder="Pesquisa🔎"
            onChange={handleSearch}
          />
          <div className="toggle-wrapper"  >
            <label className="switch">
              <input type="checkbox" className={`hidden-toggle ${safeSearch ? 'active' : ''}`} onClick={() => setSafeSearch(!safeSearch)} />
              <div className="slider">
                <div className="button"></div>
              </div>
            </label>
            <div className="description">
              +18
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
