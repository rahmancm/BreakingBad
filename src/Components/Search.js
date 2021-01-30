import React, { useState } from "react";

const Search = ({ getQuery }) => {
  const [text, setText] = useState("");
  const onChange = (q) => {
    setText(q);
    getQuery(q);
  };
  return (
    <section className="search">
      <form>
        <input
          className="form-control"
          placeholder="Search Characters"
          onFocus
          value={text}
          onChange={(e) => onChange(e.target.value)}
          type="text"
        />
      </form>
    </section>
  );
};

export default Search;
