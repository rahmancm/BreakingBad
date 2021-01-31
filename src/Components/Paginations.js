import React from "react";

const Paginations = ({ postPerPage, totalPost, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="center">
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className="page-item p-2 bg-dark border-radius-rounded "
          >
            <a
              onClick={() => paginate(number)}
              href="!#"
              className="page-link "
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Paginations;
