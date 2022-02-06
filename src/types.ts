export type Datas = {
  page: number;
  results: any[];
  total_pages: number;
  total_results: number;
};

export type DatasResults = {};

export type ImageConfig = {
  backdrop_sizes: string[];
  poster_sizes: string[];
  profile_sizes: string[];
  base_url: string;
};

export type DetailData = {
  id: number;
  title: string;
  backdrop_path: string;
  genres: any[];
  release_date: string;
  overview: string;
};

export type CreditsData = {
  cast: Cast[];
};

export type Cast = {
  id: number;
  profile_path: string;
  name: string;
  character: string;
};

export type SearchData = {
  results: any[];
};

export type LocalStorage = {
  my_list: {
    id: number | string;
    title: string;
    backdrop_path: string;
    genres: any[];
  };
};
