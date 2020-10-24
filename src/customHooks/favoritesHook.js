import _ from "lodash";
import { useState } from "react";

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const addProductToFavorites = (product) => {
    console.log("produict", product);
    const productIsinFavorites = favorites.find((e) => e.id === product.id);
    if (!productIsinFavorites) {
      const newFavorites = [...favorites, product];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };
  const removeProductFromFavorites = (product) => {
    console.log("fav", favorites);
    const productIsinFavorites = favorites.find((e) => e.id === product.id);
    if (productIsinFavorites) {
      const newFavorites = _.cloneDeep(favorites);
      const index = newFavorites.findIndex(
        (i) => i.id === productIsinFavorites.id
      );
      index > -1 && newFavorites.splice(index, 1);
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };

  return {
    addProductToFavorites,
    removeProductFromFavorites,
    favorites,
  };
};

export default useFavorites;
