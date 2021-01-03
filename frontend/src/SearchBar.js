import React from 'react';

const SearchBar = ({keyword,setKeyword}) => {
      return (
              <input 
               id="searchBar"
               value={keyword}
               placeholder={"enter search term"}
               onChange={(e) => setKeyword(e.target.value)}
              />
            );
}

export default SearchBar
