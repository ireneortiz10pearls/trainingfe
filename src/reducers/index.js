import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import category from './category';
import list from './list';
import user from './user';
import course from './course';
import courseChapter from './courseChapter';

export default combineReducers({
  alert,
  auth,
  category,
  list,
  user,
  course,
  courseChapter,
});
