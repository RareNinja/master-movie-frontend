import { api } from "./api/api";
import { InfoProp } from "./types";

const tmdb = {
  getHomeList: async () => {
    return [
      {
        slug: "originals",
        title: "Originais do Netflix",
        items: await api.get("/originalMovies"),
      },
      {
        slug: "trending",
        title: "Recomendados para Você",
        items: await api.get("/trendingMovies"),
      },
      {
        slug: "toprated",
        title: "Em Alta",
        items: await api.get("/topretedMovies"),
      },
      {
        slug: "action",
        title: "Ação",
        items: await api.get("/actionMovies"),
      },
      {
        slug: "comedy",
        title: "Comédia",
        items: await api.get("/comedyMovies"),
      },
      {
        slug: "horror",
        title: "Terror",
        items: await api.get("/horrorMovies"),
      },
      {
        slug: "romance",
        title: "Romance",
        items: await api.get("/romanceMovies"),
      },
      {
        slug: "documentary",
        title: "Documentários",
        items: await api.get("/documentaryMovies"),
      },
    ];
  },
  getMovieInfo: async (movieId: number, type: string): Promise<InfoProp> => {
    let info = {} as InfoProp;

    if (movieId) {
      switch (type) {
        case "movie":
          info = await api.get(`/movie/${movieId}`);
          break;
        case "tv":
          info = await api.get(`/tv/${movieId}`);
          break;
        default:
          break;
      }
    }
    console.log(info, "infod");
    return info;
  },
};

export default tmdb;
