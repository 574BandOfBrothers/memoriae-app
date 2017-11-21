import { combineReducers } from 'redux';

import auth from './auth';
import stories from './stories';
import addStoryScreen from './addStoryScreen';

export default combineReducers({
  auth,
  stories,
  /// Screens
  addStoryScreen,
});
