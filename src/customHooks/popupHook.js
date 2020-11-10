import { useCallback, useState } from "react";
import globalSearchReducer from "../reducers/globalSearchReducer";

import { GLOBAL_SEARCH } from "../constants/globalSearch";

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const usePopup = (props) => {
  const [favoriteIsActive, setFavoriteActive] = useState(false);
  const [subBasketVisible, setSubBasketVisible] = useState(false);
  const [menuIsOpened, setMenuIsOpened] = useState(false);
  const [chatActive, setChatActive] = useState(false);

  return {
    favoriteIsActive,
    setFavoriteActive,
    subBasketVisible,
    setSubBasketVisible,
    menuIsOpened,
    setMenuIsOpened,
    chatActive,
    setChatActive,
  };
};
usePopup.propTypes = {};

export default usePopup;
