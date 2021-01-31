import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import CharacterGrid from "./CharacterGrid";
import Search from "./Search";
import Paginations from "./Paginations";

export const BreakingBad = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(12);

  useEffect(() => {
    const fetchItem = async () => {
      const result = await axios(
        `https://www.breakingbadapi.com/api/characters?name=${query}`
      );

      setItems(result.data);
      setIsLoading(false);
    };
    fetchItem();
  }, [query]);

  //Get Current post . Pagination
  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = items.slice(indexOfFirstPost, indexOfLastPost);
  return (
    <div>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      <CharacterGrid isLoading={isLoading} items={currentPost} />
      <Paginations postPerPage={postPerPage} totalPost={items.length} />
    </div>
  );
};

export default BreakingBad;
