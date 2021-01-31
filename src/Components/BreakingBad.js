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
  const [postPerPage] = useState(12);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div>
      <Header />
      <Search getQuery={(q) => setQuery(q)} />
      {items.length === 0 && (
        <div className="center">
          <div>
            <h3 className="text-danger">No Such Characters found !!!</h3>
          </div>
        </div>
      )}
      <CharacterGrid isLoading={isLoading} items={currentPost} />
      <Paginations
        postPerPage={postPerPage}
        totalPost={items.length}
        paginate={paginate}
      />
    </div>
  );
};

export default BreakingBad;
