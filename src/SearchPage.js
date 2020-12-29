import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import SearchBar from './SearchBar';
import ResultList from './ResultList';

const SearchPage = (props) => {
      const [currentPage, setCurrentPage] = useState(0);
      const [pageCount, setPageCount] = useState(0);

      const [keyword, setKeyword] = useState('');
      const [resultList, setResultList] = useState();

      const updateResults = async (keyword) => {
            console.log(props.perPage);
            let obj = {
                      'pattern': keyword,
            };
            let objJsonStr = JSON.stringify(obj);
            let encodedRequest = Buffer.from(objJsonStr).toString("base64");
            console.log(encodedRequest);
            return await fetch('/search/' + encodedRequest + '/pp' + props.perPage + '/p' + currentPage)
              .then(response => response.json())
              .then(data => {
                    console.log(data)
                    let numPages = Math.ceil(data.num_results / props.perPage)
                    setPageCount(numPages)
                    setResultList(data.matches)
              });
      }

      const updateKeyword = async (keyword) => {
               setKeyword(keyword);
               updateResults(keyword);
            }

      // Whenever the currentPage is updated, request the right page of results
      useEffect(() => {
            updateResults(keyword);
      }, [currentPage]);

      const handlePageClick = (clickData) => {
            console.log(currentPage);
            setCurrentPage(clickData.selected);
      };

      return (
              <>
                <h1>Result List</h1>
                <SearchBar 
                 keyword={keyword} 
                 setKeyword={updateKeyword}
                />
                <div className="results">
                  <ResultList resultList={resultList}/>
                  <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                  />
                </div>

              </>
             );
}

export default SearchPage
