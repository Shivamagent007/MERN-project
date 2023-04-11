const Pagination = ({ productsPerPage, totalProducts, currentPage, onPageChange }) => {
    const pageNumbers = [];
  
    for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
      pageNumbers.push(i);
    }
  
    return (
      <nav className="flex justify-center my-4">
        <ul className="pagination">
          {pageNumbers.map((number) => (
            <li key={number} className={`mx-1 ${currentPage === number ? "bg-blue-500" : ""}`}>
              <button
                onClick={() => onPageChange(number)}
                className="py-2 px-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full"
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    );
  };

export { Pagination };
