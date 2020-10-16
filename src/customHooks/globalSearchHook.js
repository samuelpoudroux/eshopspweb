import { useCallback, useReducer } from 'react';
import globalSearchReducer from '../reducers/globalSearchReducer';

import { GLOBAL_SEARCH } from '../constants/globalSearch';

// this customhooks manage the logic of my basket and give us acces to the function to add to remove
const useGlobalSearchResult = (props) => {
  const [globalSearch, dispatch] = useReducer(globalSearchReducer, {
    active: false
  });

  const search = useCallback((value, globalSearchApi) => {
    return dispatch({
      type: GLOBAL_SEARCH,
      value,
      globalSearchApi
    });
  }, []);

  return {
    globalSearch,
    search
  };
};

useGlobalSearchResult.propTypes = {};

export default useGlobalSearchResult;
