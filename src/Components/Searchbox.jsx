import { useState, useRef } from "react";

export default function SearchBox(props) {
  const [searchval, setSearchVal] = useState("vikram");
  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchVal("");
    props.getSearchedVal(searchval);
  };
  return (
    <div className="searchbox">
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          name="searchbox"
          value={searchval}
          onChange={(e) => setSearchVal(e.target.value)}
          placeholder="Search Movie, Web Series"
        />
      </form>
    </div>
  );
}
