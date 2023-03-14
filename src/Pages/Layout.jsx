import axios from "axios";
import { useEffect, useState } from "react";
import Card from "../Components/Card";
import SearchBox from "../Components/Searchbox";

export default function Layout() {
  const [data, setData] = useState([]);
  const [movie, setMovie] = useState("vikram");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          `http://www.omdbapi.com/?i=tt3896198&apikey=b674b074&t=${movie}`
        );
        if (
          response.data.Response === "True" &&
          response.data.Poster !== "N/A"
        ) {
          console.log(response.data);
          setData(response.data);
        } else {
          console.log(response.data);

          setData([]);
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [movie]);
  const getSearchedVal = (data) => {
    setMovie(data);
  };

  let content;
  if (isError) {
    content = (
      <div className="movie-card">
        <img src={require("../Images/Not_Found.png")} alt="Movie Not Found" />
        <p className="notfound">Movie Not Found</p>
      </div>
    );
  } else if (isLoading) {
    content = (
      <div className="movie-card">
        <p>Loading...</p>
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
