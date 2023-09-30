export type InfoProp = {
  data: {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: [];
    popularity: number;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    runtime: string;
    tagline: string;
    homepage: string;
    genres: [
      {
        name: string;
      }
    ];
    production_companies: [
      {
        name: string;
      }
    ];
    number_of_seasons: number;
    original_name: string;
    first_air_date: number;
  };
  length: number;
};
