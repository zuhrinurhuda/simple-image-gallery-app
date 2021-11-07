import React from "react";

import ImageList from "views/components/ImageList";
import Pagination from "views/components/Pagination";
import { useGetArtworkListQuery } from "state/artwork/artworkApi";
import style from "./Home.module.css";

const Home: React.FC = () => {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, error, isLoading } = useGetArtworkListQuery({
    page,
    limit: 15,
    search,
  });

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleOnPageChange = (type: "prev" | "next") => {
    let newPage = page;

    if (type === "prev") {
      if (newPage > 1) {
        newPage -= 1;
      }
    } else {
      newPage += 1;
    }

    setPage(newPage);
  };

  return (
    <div className={style.container}>
      <input
        className={style.input}
        placeholder="Type your search here"
        value={search}
        onChange={handleOnSearch}
      />
      <ImageList isLoading={isLoading} error={error} data={data} />
      <Pagination onChange={handleOnPageChange} />
    </div>
  );
};

export default Home;
