import React, { useEffect, useState } from "react";
import "./App.css";
import tmdb from "./tmdb";
import MovieRow from "./components/MovieRow/MovieRow";
import FeaturedMovie, { ItemProps } from "./components/FeaturedMovies/FeaturedMovie";
import Header from "./components/Header/Header";
import Modal from "react-modal";
import CloseIcon from "@mui/icons-material/Close";
import { InfoProp, ItemPropsByData } from "./types";
import { AxiosResponse } from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

const customStyles = {
  content: {
    marginTop: 100,
    backgroundColor: "#111",
    padding: 36,
  },
};

type ListProps = {
  slug: string;
  title: string;
  items: AxiosResponse<any, any>;
}

const App = () => {
  const [movieList, setMovieList] = useState<ListProps[]>([]);
  const [featuredData, setFeaturedData] = useState({} as ItemPropsByData);
  const [blackHeader, setBlackHeader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [movieSelected, setMovieSelected] = useState<ItemPropsByData>();
  const [searchItem, setSearchItem] = useState<string>('');
  const [safeSearch, setSafeSearch] = useState<string>('');
  const [resultSearch, setResultSearch] = useState<any>(null);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectedMovie = async (item: ItemPropsByData) => {
    await tmdb
      .getMovieInfo(item.id, "movie")
      .then((res: InfoProp) => setMovieSelected(res.data));
  };

  useEffect(() => {
    const loadAll = async () => {

      let list = await tmdb.getHomeList();

      setMovieList(list);

      let originals = list.find((item) => item.slug === "originals") as ListProps;
      if (originals) {
        let randomChosen = Math.floor(
          Math.random() * (originals.items.data.results.length - 1)
        );
        let chosen = originals.items.data.results[randomChosen];
        let chosenInfo = await tmdb.getMovieInfo(chosen.id, "tv") as InfoProp;
        if (!chosenInfo.data) loadAll();
        setFeaturedData(chosenInfo.data);
      }
    };


    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  useEffect(() => {
    if (movieSelected?.id) {
      handleModal();
    }
  }, [movieSelected]);

  useEffect(() => {
    if (searchItem && searchItem?.length > 1) {
      setTimeout(() => {
        const endpoint = `https://api.themoviedb.org/3/search/movie?include_adult=${safeSearch}&api_key=4eefae54393dcb3c2ed71eca814368c5&language=pt-BR&query=${encodeURIComponent(
          searchItem
        )}`;

        fetch(endpoint)

          .then((response) => response.json())
          .then((json) => {
            if (!json?.results) {
              throw new Error(json?.statusMessage ?? "Error");
            }
            setResultSearch(json.results);
          })
          .catch((error) => console.error("Error:", error));
      }, 500);
    } else {
      setResultSearch(null);
    }
  }, [searchItem]);

  return (
    <div className="page">
      <Header black={blackHeader} setSearchItem={setSearchItem} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {resultSearch?.length > 0 && resultSearch != null ? (
          <MovieRow
            title={"Resultado da pesquisa"}
            items={{ data: { results: resultSearch } }}
            handleModal={handleModal}
            handleSelectedMovie={handleSelectedMovie}
          />
        ) : (
          movieList.map((item, key: number) => (
            <MovieRow
              key={key}
              title={item.title}
              items={item.items}
              handleModal={handleModal}
              handleSelectedMovie={handleSelectedMovie}
            />
          ))
        )}
      </section>
      <footer>
        Project developed by Davi Balan
      </footer>

      {movieList?.length <= 0 && (
        <div className="loading">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton />
          </SkeletonTheme>
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onRequestClose={handleModal}
        onAfterClose={() => {
          setMovieSelected(undefined);
        }}
        style={customStyles}
      >
        <div className="closeBtn">
          <button className="btnCloseModal" onClick={handleModal}>
            <CloseIcon />
          </button>
        </div>
        {movieSelected?.id ? (
          <div className="containerMovie">
            <section className="sectionItems">
              <div className="poster_wrapper true">
                <div className="poster">
                  <div className="image_content backdrop">
                    {movieSelected?.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p//w300_and_h450_bestv2${movieSelected.poster_path}`}
                        alt={movieSelected.original_title}
                      />
                    ) : (
                      <img
                        src="https://anthropology.utk.edu/wp-content/uploads/2016/03/NotAvailable.jpg"
                        alt="image not found"
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className="header_poster_wrapper true">
                <section>
                  <div
                    className="title ott_true"
                    style={{ margin: 36, color: "white" }}
                  >
                    <h2>
                      {movieSelected.title}
                      <span> ({movieSelected.release_date.split("-")[0]})</span>
                    </h2>

                    <div className="facts">
                      {movieSelected.genres.map((item: { name: string }, index: string | number) => {
                        return (
                          <span key={`${item.name}${index}`}>
                            {index !== 0 ? ", " : ""}
                            {item.name}
                          </span>
                        );
                      })}
                      <span> ● {movieSelected.runtime}m</span>
                    </div>

                    <div className="avaliations" style={{ marginTop: 22 }}>
                      Avaliação dos usuários{" "}
                      <span>
                        {movieSelected.vote_average.toFixed(2)} Pontos
                      </span>
                    </div>

                    <div className="tagline" style={{ marginTop: 22 }}>
                      "{movieSelected.tagline}"
                    </div>

                    <div className="sinopse" style={{ marginTop: 22 }}>
                      <h3>Sinopse</h3>
                      <p>{movieSelected.overview}</p>
                    </div>
                  </div>
                </section>
              </div>
            </section>
            <div className="companies">
              <h2>Produzido por</h2>
              {movieSelected.production_companies.map((item: { name: string }, index: number) => {
                return (
                  <span>
                    {index !== 0 ? ", " : ""}
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="loading">
            <img
              src="https://media.tenor.com/9CqTZoKN-KsAAAAC/loading-windows.gif"
              alt="Carregando"
              id="imgModal"
            />
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;