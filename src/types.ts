export type CommonType = {
  id: number;
  name: string;
  type?: string;
  url: string;
  created: Date;
};

export type Character = CommonType & {
  status: string;
  species: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  image: string;
  episode: string[];
};

export type Location = CommonType & {
  dimension: string;
  residents: string[];
};

export type Episode = CommonType & {
  // eslint-disable-next-line camelcase
  air_date: string;
  episode: string;
  characters: string[];
};

export type InfoType = {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
};

export type PageType = [string | null, string | null];
