import { useState } from "react";

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const usePopup = (props) => {
  const [favoriteIsActive, setFavoriteActive] = useState(false);
  const [subBasketVisible, setSubBasketVisible] = useState(false);
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [addProduct, setAddProduct] = useState(true);
  const [addCategory, setAddCategory] = useState(false);

  return {
    favoriteIsActive,
    setFavoriteActive,
    subBasketVisible,
    setSubBasketVisible,
    menuIsOpened,
    setMenuIsOpened,
    chatActive,
    setChatActive,
    addProduct,
    setAddProduct,
    addCategory,
    setAddCategory,
  };
};
usePopup.propTypes = {};

export default usePopup;
