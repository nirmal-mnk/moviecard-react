import { ColorExtractor } from "react-color-extractor";
import { useState, useEffect } from "react";

export default function Card(props) {
  const movieData = props.movie;
  const [colors, setColors] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState("#FFFFFF");

  const getContrastColor = (hexColor) => {
    const r = parseInt(hexColor.substr(1, 2), 16);
    const g = parseInt(hexColor.substr(3, 2), 16);
    const b = parseInt(hexColor.substr(5, 2), 16);
    const yiq = (r * 299 + g * 587 + b * 114) / 1000;
    return yiq >= 300 ? "#000000" : "#FFFFFF";
  };
  const textColor = getContrastColor(backgroundColor);
  useEffect(() => {
    setTimeout(() => {
      getContrastColor(colors[0]);
      console.log(textColor);
    }, 1000);
  }, [colors]);
  const handleColors = (colorList) => {
    setColors(colorList);
    console.log(colorList);
  };
  return (
    <div className="card-inner">
      <div
        style={{ backgroundColor: colors[0], color: textColor }}
        className="card-content"
      >
        <style>
          {`.card-content::after {
           background: linear-gradient(to right, ${colors[0]} 12%, transparent);
            }`}
        </style>
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
      <div className="card-image">
        <ColorExtractor getColors={handleColors}>
          <img src={movieData.Poster} alt="Movie Poster" />
        </ColorExtractor>
      </div>
    </div>
  );
}
