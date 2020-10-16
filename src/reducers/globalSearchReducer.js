import { GLOBAL_SEARCH } from '../constants/globalSearch.js';
import { globalSearch } from '../repository/globalSearch';

const globalSearchReducer = (state, action) => {
  switch (action.type) {
    case GLOBAL_SEARCH:
      return globalSearch(state, action.value, action.globalSearchApi);
    default:
      break;
  }
};
export default globalSearchReducer;
