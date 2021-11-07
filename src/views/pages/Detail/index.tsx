import React from "react";
import { useParams, Link } from "react-router-dom";

import Spinner from "views/components/Spinner";
import { useGetArtworkByIdQuery } from "state/artwork/artworkApi";
import type { GetArtworkListResponse } from "state/artwork/artworkApi";
import style from "./Detail.module.css";

const Detail: React.FC = () => {
  const { artworkId } = useParams<{ artworkId: string }>();

  const { data, error, isLoading } = useGetArtworkByIdQuery(artworkId);

  const [currentFavorite, setCurrentFavorite] =
    React.useState<GetArtworkListResponse["data"]>();

  React.useEffect(() => {
    const rawFavorite = localStorage.getItem("favorite");

    if (rawFavorite) {
      const parsedFavorite = JSON.parse(rawFavorite);
      setCurrentFavorite(parsedFavorite);
    }
  }, []);

  const handleOnFavorite = () => {
    if (data) {
      if (currentFavorite) {
        const newFavorite = currentFavorite.concat(data);

        setCurrentFavorite(newFavorite);
        localStorage.setItem("favorite", JSON.stringify(newFavorite));
      } else {
        setCurrentFavorite([data]);
        localStorage.setItem("favorite", JSON.stringify([data]));
      }
    }
  };

  const isFavorite = currentFavorite?.findIndex(
    (favorite) => favorite.id === data?.id
  );

  if (isLoading) {
    return (
      <div className="content-container">
        <Spinner />
      </div>
    );
  } else if (error) {
    return <div className="content-container">Oops something went wrong.</div>;
  } else if (data) {
    return (
      <div className={style.container}>
        <div className={style.headerContainer}>
          <Link to="/">
            <span className="material-icons-outlined">arrow_back_ios_new</span>
          </Link>
          <h2 className={style.title}>{data?.title}</h2>
        </div>
        <img className={style.image} src={data?.image_url} alt={data?.title} />
        <div className={style.metaContainer}>
          <div>
            <strong>{data?.artist_display}</strong>
          </div>
          <div>
            {isFavorite !== -1 ? (
              <span
                className="material-icons"
                style={{ fontSize: 40, color: "#ed0226" }}
              >
                favorite
              </span>
            ) : (
              <span
                className="material-icons-outlined"
                style={{ fontSize: 40 }}
                onClick={handleOnFavorite}
              >
                favorite_border
              </span>
            )}
          </div>
        </div>
        <p>
          <strong>{data?.title}</strong>
          {` - ${data?.thumbnail.alt_text}`}
        </p>
        <p>
          <strong>{`Credit: `}</strong>
          {data?.credit_line}
        </p>
      </div>
    );
  } else {
    return <div className="content-container">Sorry, no artwork found.</div>;
  }
};

export default Detail;
