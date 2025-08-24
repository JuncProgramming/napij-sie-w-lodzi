import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    const parsed = stored ? JSON.parse(stored) : [];
    const cleaned = [...new Set(parsed)].filter(
      item => item !== null && item !== undefined
    );

    if (cleaned.length !== parsed.length) {
      localStorage.setItem('favorites', JSON.stringify(cleaned));
    }

    return cleaned;
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = item => {
    setFavorites(prev => {
      const filtered = prev.filter(fav => fav !== item);
      const isCurrentlyFavorite = filtered.length < prev.length;

      if (isCurrentlyFavorite) {
        return filtered;
      } else {
        return [...filtered, item];
      }
    });
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, clearFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
