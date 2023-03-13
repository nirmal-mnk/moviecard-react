import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import SearchBox from "../Components/Searchbox";

export default function Layout() {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState("vikram");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=b674b074&t=${movie}`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setIsError(error.Response);
        console.log(isError);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [movie]);
  const getSearchedVal = (data) => {
    console.log(data);
    setMovie(data);
  };

  let content;
  console.log(isError);
  if (isError) {
    content = (
      <div className="movie-card">
        <p>Oops, something went wrong.</p>;
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="movie-card">
        <p>Loading...</p>;
      </div>
    );
  } else {
    content = (
      <div className="movie-card">
        <Card movie={data} />
      </div>
    );
  }

  return (
    <div className="layout-main">
      <style>
        {`.layout-main:before {
            background-image: url(${data.Poster});
            }`}
      </style>
      <SearchBox getSearchedVal={getSearchedVal} />
      {content}
    </div>
  );
}
