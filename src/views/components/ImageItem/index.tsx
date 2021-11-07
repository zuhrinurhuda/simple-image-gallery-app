import React from "react";
import { Link } from "react-router-dom";

import style from "./ImageItem.module.css";

type Props = {
  artworkId: number;
  src: string;
  alt: string;
};

const ImageItem: React.FC<Props> = ({ artworkId, src, alt }) => {
  return (
    <Link className={style.galleryItem} to={`/detail/${artworkId}`}>
      <img src={src} alt={alt} />
    </Link>
  );
};

export default ImageItem;
