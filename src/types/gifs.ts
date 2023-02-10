type GifApiBody = {
  type: 'gif';
  embed_url: string;
  url: string;
};

export type GifsApiResponse = {
  data: GifApiBody[];
};
