import React, { useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
const imgnotfound = require("../../assets/images/imgnotfound.png")

type MovieRowPros = {
  title: String,
  items: ItemsProps,
  handleModal: () => void,
  handleSelectedMovie: (item: any) => void,
}

type ItemsProps = {
  data: {
    results: any
  }
}

const MovieRow = ({ title, items, handleModal, handleSelectedMovie }: MovieRowPros) => {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow = () => {
    let x = scrollX + Math.round(window.innerWidth / 2);
    if (x > 0) {
      x = 0;
    }
    setScrollX(x);
  };

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listW = items?.data.results?.length * 150;
    if (window.innerWidth - listW > x) {
      x = window.innerWidth - listW - 60;
    }
    setScrollX(x);
  };

  return (
    <div className="movieRow">
      {title !== "Originais do Netflix" ? (
        <>
          <h2>{title}</h2>
          <div className="movieRow--left" onClick={handleLeftArrow}>
            <NavigateBeforeIcon style={{ fontSize: 50 }} />
          </div>
          <div className="movieRow--right" onClick={handleRightArrow}>
            <NavigateNextIcon style={{ fontSize: 50 }} />
          </div>
          <div className="movieRow--listarea">
            <div
              className="movieRow--list"
              style={{
                marginLeft: scrollX,
                width: items?.data.results?.length * 150,
              }}
            >
              {items?.data.results?.length > 0 &&
                items.data.results.map((item: any, key: any) => (

                  <div
                    key={key}
                    className="movieRow--item"
                    onClick={() => {
                      handleSelectedMovie(item);
                    }}
                  >
                    <img
                      src={item.poster_path !== null ? `https://image.tmdb.org/t/p/w300${item.poster_path}` : imgnotfound}
                      alt={item.original_title}
                      style={item.poster_path !== null ? {} : { maxHeight: 226 }}
                    />
                  </div>
                ))}
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default MovieRow;