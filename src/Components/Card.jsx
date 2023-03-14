import { ColorExtractor } from "react-color-extractor";
import { useState, useEffect } from "react";

export default function Card(props) {
  const movieData = props.movie;
  const [colors, setColors] = useState([]);
  const handleColors = (colorList) => {
    setColors(colorList);
  };
  return (
    <div className="card-inner">
      <div
        style={{ backgroundColor: colors[0], color: "#fff" }}
        className="card-content"
      >
        <style>
          {`.card-content::after {
           background: linear-gradient(to right, ${colors[0]} 12%, transparent);
            }`}
        </style>
        <div className="card-content-sec">
          <div className="card-content-sub">
            <h2>{movieData.Title}</h2>
            <p>
              {movieData.Year},<span> {movieData.Director}</span>
            </p>
            <p>
              <span>{movieData.Language} - </span>
              {movieData.Genre}
            </p>
            <p className="plot">{movieData.Plot}</p>
          </div>
          <div className="card-content-sub">
            <p>
              <span className="highlight">{movieData.Runtime}</span>
              &#9733; {movieData.imdbRating}
            </p>
            <p>{movieData.Actors}</p>
          </div>
        </div>
      </div>
      <div className="card-image">
        <ColorExtractor getColors={handleColors}>
          <img src={movieData.Poster} alt="Movie Poster" />
        </ColorExtractor>
      </div>
    </div>
  );
}
