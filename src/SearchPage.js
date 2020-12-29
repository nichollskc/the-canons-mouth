import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ResultList from './ResultList';

const SearchPage = (props) => {
      const [keyword, setKeyword] = useState('');
      const [resultList, setResultList] = useState();

      const updateResults = async (keyword) => {
            let obj = {
                      'pattern': keyword
            };
            let objJsonStr = JSON.stringify(obj);
            let encodedRequest = Buffer.from(objJsonStr).toString("base64");
            return await fetch('/search/' + encodedRequest)
              .then(response => response.json())
              .then(data => {
                    console.log(data)
                    setResultList(data.matches)
              });
      }

      const updateKeyword = async (keyword) => {
               setKeyword(keyword);
               updateResults(keyword);
            }

      return (
              <>
                <h1>Result List</h1>
                <SearchBar 
                 keyword={keyword} 
                 setKeyword={updateKeyword}
                />
                <ResultList resultList={resultList}/>
              </>
             );
}

export default SearchPage
