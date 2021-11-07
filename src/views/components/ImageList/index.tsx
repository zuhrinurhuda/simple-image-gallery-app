import React from "react";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";

import Spinner from "views/components/Spinner";
import ImageItem from "views/components/ImageItem";
import type { GetArtworkListResponse } from "state/artwork/artworkApi";
import style from "./ImageList.module.css";

type Props = {
  isLoading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  data?: GetArtworkListResponse;
};

const ImageList: React.FC<Props> = ({ isLoading, error, data }) => {
  if (isLoading) {
    return (
      <div className="content-container">
        <Spinner />
      </div>
    );
  } else if (error) {
    return <div className="content-container">Oops something went wrong.</div>;
  } else if (data!.data?.length > 0) {
    return (
      <div className={style.gallery}>
        {data!.data?.map((artwork) => (
          <ImageItem
            key={artwork.id}
            artworkId={artwork.id}
            src={artwork.image_url}
            alt={artwork.title}
          />
        ))}
      </div>
    );
  } else {
    return <div className="content-container">Sorry, no artwork found.</div>;
  }
};

export default ImageList;
