import React, { useState, useEffect, useRef } from 'react';
import ReactPaginate from 'react-paginate';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import debounce from 'underscore/modules/debounce.js';

import SearchBar from './SearchBar';
import ResultList from './ResultList';
import LoadingSpinner from './LoadingSpinner';

const SearchPage = (props) => {
    const [currentPage, setCurrentPage] = useState(0);
    const [pageCount, setPageCount] = useState(0);
    const [totalResults, setTotalResults] = useState(0);
    const [numFilteredResults, setNumFilteredResults] = useState(0);
    const [keyword, setKeyword] = useState('');
    const [resultList, setResultList] = useState();
    const [promiseInProgress, setPromiseInProgress] = useState(false);
    const [promiseBegun, setPromiseBegun] = useState(false);

    const delayedUpdateResults = useRef(debounce((newValue) => updateResults(newValue), 1000));
    const delayedSetPromiseInProgress = useRef(debounce((newValue) => setPromiseInProgress(newValue), 1));

    const updateResults = async (keyword) => {
        console.log(props.perPage);
        let obj = {
                  'pattern': keyword,
                  'config': {'selected_texts': Array.from(props.selected_texts)},
        };
        console.log(obj);
        let objJsonStr = JSON.stringify(obj);
        console.log(objJsonStr);
        let encodedRequest = Buffer.from(objJsonStr).toString("base64");
        console.log(encodedRequest);
        setPromiseInProgress(true);
        return await fetch('/search/' + encodedRequest + '/pp' + props.perPage + '/p' + currentPage)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                let numPages = Math.ceil(data.num_filtered_matches / props.perPage)
                setPageCount(numPages)
                setResultList(data.matches)
                setTotalResults(data.num_matches)
                setNumFilteredResults(data.num_filtered_matches)
                props.updateCountsByText(data.counts_by_text)
                setPromiseInProgress(false);
             });
    }

    const updateKeyword = async (keyword) => {
        setKeyword(keyword);
    };

    // Whenever the currentPage is updated, request the right page of results
    useEffect(() => {
        updateResults(keyword);
    }, [currentPage, props.selected_texts]);

    // Whenever keyword is updated, send a request to update the results.
    // Delay this request until no keypresses have been made in the last second to
    // avoid sending too many requests
    useEffect(() => {
        delayedUpdateResults.current(keyword)
    }, [keyword]);

    useEffect(() => {
        delayedSetPromiseInProgress.current(promiseBegun)
    }, [promiseBegun]);

    const handlePageClick = (clickData) => {
        console.log(currentPage);
        setCurrentPage(clickData.selected);
    };

    return (
        <Container>
            <h1>The Canon's Mouth</h1>
            <Row>
                <Col>
                    <SearchBar keyword={keyword} setKeyword={updateKeyword} />
                </Col>
                <Col>
                    <LoadingSpinner promiseInProgress={promiseInProgress}/>
                </Col>
            </Row>
            <Row>
                <div className="results">
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
                      forcePage={currentPage}
                    />
                    <p>Total results: {totalResults}. In selected texts: {numFilteredResults}</p>
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
                      forcePage={currentPage}
                    />
                </div>
            </Row>
        </Container>
           );
}

export default SearchPage
