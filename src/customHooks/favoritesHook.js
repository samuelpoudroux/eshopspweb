import _ from "lodash";
import { useState } from "react";

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  const oldFavorites =
    (JSON.parse(localStorage.getItem("favorites")) &&
      JSON.parse(localStorage.getItem("favorites"))) ||
    [];

  const addProductToFavorites = (product) => {
    const productIsinFavorites = oldFavorites.find((e) => e.id === product.id);
    if (!productIsinFavorites) {
      const newFavorites = [...oldFavorites, product];
      setFavorites(newFavorites);
      localStorage.setItem("favorites", JSON.stringify(newFavorites));
    }
  };
  const removeProductFromFavorites = (product) => {
    const productIsinFavorites = oldFavorites.find((e) => e.id === product.id);
    if (productIsinFavorites) {
      const newFavorites = _.cloneDeep(oldFavorites);
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
