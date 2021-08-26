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
  origin: object;
  location: object;
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
