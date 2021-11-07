import React from "react";

import type { GetArtworkListResponse } from "state/artwork/artworkApi";
import style from "./Favorite.module.css";

const Favorite: React.FC = () => {
  const [myFavorite, setMyFavorite] =
    React.useState<GetArtworkListResponse["data"]>();

  React.useEffect(() => {
    const rawFavorite = localStorage.getItem("favorite");

    if (rawFavorite) {
      const parsedFavorite = JSON.parse(rawFavorite);
      setMyFavorite(parsedFavorite);
    }
  }, []);

  const handleOnRemove = (artworkId: number) => {
    if (myFavorite) {
      const selectedIndex = myFavorite.findIndex(
        (favorite) => favorite.id === artworkId
      );

      const newFavorite = [...myFavorite];
      newFavorite.splice(selectedIndex, 1);

      setMyFavorite(newFavorite);
      localStorage.setItem("favorite", JSON.stringify(newFavorite));
    }
  };

  if (myFavorite && myFavorite.length > 0) {
    return (
      <>
        {myFavorite?.map((favorite) => {
          return (
            <div key={favorite.id} className={style.container}>
              <div className={style.headerContainer}>
                <h2 className={style.title}>{favorite?.title}</h2>
              </div>
              <img
                className={style.image}
                src={favorite?.image_url}
                alt={favorite?.title}
              />
              <div className={style.metaContainer}>
                <div>
                  <strong>{favorite?.artist_display}</strong>
                </div>
                <div>
                  <span
                    className="material-icons-outlined"
                    style={{ fontSize: 40 }}
                    onClick={() => handleOnRemove(favorite.id)}
                  >
                    delete
                  </span>
                </div>
              </div>
              <p>
                <strong>{favorite?.title}</strong>
                {` - ${favorite?.thumbnail.alt_text}`}
              </p>
              <p>
                <strong>{`Credit: `}</strong>
                {favorite?.credit_line}
              </p>
            </div>
          );
        })}
      </>
    );
  } else {
    return <div className="content-container">Sorry, no artwork found.</div>;
  }
};

export default Favorite;
