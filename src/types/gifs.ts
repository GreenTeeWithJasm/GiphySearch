type GifApiBody = {
  type: 'gif';
  embed_url: string;
};

export type GifsApiResponse = {
  data: GifApiBody[];
};
