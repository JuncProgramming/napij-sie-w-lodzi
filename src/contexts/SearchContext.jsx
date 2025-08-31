import { createContext, useState } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <SearchContext.Provider value={{ isSearchActive, setIsSearchActive }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
