import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import EmptyImage from "assets/images/empty-image.png";

export interface Pagination {
  total: number;
  limit: number;
  offset: number;
  total_pages: number;
  current_page: number;
  next_url: string;
}

export interface Thumbnail {
  lqip: string;
  width: number;
  height: number;
  alt_text: string;
}

export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  credit_line: string;
  image_id: string;
  image_url: string;
  thumbnail: Thumbnail;
}

export interface GetArtworkListQuery {
  page: number;
  limit: number;
  search?: string;
}

export interface GetArtworkListResponse {
  pagination: Pagination;
  data: Artwork[];
  config?: {
    iiif_url: string;
    website_url: string;
  };
}

export interface GetArtworkByIdResponse {
  data: Artwork;
}

const fields =
  "id,title,artist_display,date_display,credit_line,image_id,thumbnail";

export const artworkApi = createApi({
  reducerPath: "artwork",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.artic.edu/api/v1/" }),
  endpoints: (builder) => ({
    getArtworkList: builder.query<GetArtworkListResponse, GetArtworkListQuery>({
      query: ({ page, limit, search }) =>
        `artworks/search?q=${search}&fields=${fields}&page=${page}&limit=${limit}`,
      transformResponse: (response: GetArtworkListResponse) => {
        const data = response.data.map((artwork) => {
          if (artwork.image_id) {
            return {
              ...artwork,
              image_url: `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`,
            };
          } else {
            return {
              ...artwork,
              image_url: EmptyImage,
            };
          }
        });

        return {
          pagination: response.pagination,
          data,
        };
      },
    }),
    getArtworkById: builder.query<Artwork, string>({
      query: (id) => `artworks/${id}?fields=${fields}`,
      transformResponse: (response: GetArtworkByIdResponse) => {
        if (response.data.image_id) {
          return {
            ...response.data,
            image_url: `https://www.artic.edu/iiif/2/${response.data.image_id}/full/843,/0/default.jpg`,
          };
        } else {
          return {
            ...response.data,
            image_url: EmptyImage,
          };
        }
      },
    }),
  }),
});

export const { useGetArtworkListQuery, useGetArtworkByIdQuery } = artworkApi;
