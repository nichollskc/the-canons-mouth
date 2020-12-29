import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ResultList from './ResultList';

const SearchPage = (props) => {
      const [keyword, setKeyword] = useState('');
      const [resultListDefault, setResultListDefault] = useState();
      const [resultList, setResultList] = useState();

      const fetchData = async () => {
              return await fetch('https://restcountries.eu/rest/v2/all')
                .then(response => response.json())
                .then(data => {
                             setResultList(data) 
                             setResultListDefault(data)
                           });}

      const updateResults = async (keyword) => {
            let obj = {
                      'user1':'1234'
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
               const filtered = resultListDefault.filter(result => {
                         return result.name.toLowerCase().includes(keyword.toLowerCase())
               })
               setKeyword(keyword);
               setResultList(filtered);
               updateResults(keyword);
            }

      useEffect( () => {fetchData()},[]);
        
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
