import { combineReducers } from 'redux';
import homeData from '../home/store';
import searchData from '../search/store';

const reducers = combineReducers({
  homeData,
  searchData
});

export default reducers;