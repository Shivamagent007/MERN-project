import React, { useState } from "react";
import MetaData from "../layout/Header/MetaData";

const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  return (
    <>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <div className="pt-32 bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">
            Search Product
        </h1>
        <h1 className="text-center text-l font-bold text-gray-800">
          Hello my name is gomak
        </h1>
        <section className="py-10 bg-gray-100">
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"></div>
          <div className="relative text-gray-600">
            <form onSubmit={searchSubmitHandler}>
              <input
                className="w-full border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
                type="search"
                name="search"
                placeholder="Search a product"
                onChange={(e) => setKeyword(e.target.value)}
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-3 mr-4"
              >
                <svg
                  className="text-gray-600 h-4 w-4 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M15.223 13.777l-3.482-3.482a4.972 4.972 0 0 0 1.07-3.055c0-2.761-2.239-5-5-5s-5 2.239-5 5 2.239 5 5 5a4.972 4.972 0 0 0 3.055-1.07l3.482 3.482a1 1 0 1 0 1.414-1.414zM5 8a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                </svg>
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
};

export default Search;
