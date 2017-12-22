import { combineReducers } from 'redux';

import auth from './auth';
import stories from './stories';
import annotations from './annotations';
import addStoryScreen from './addStoryScreen';

export default combineReducers({
  auth,
  stories,
  annotations,
  /// Screens
  addStoryScreen,
});
