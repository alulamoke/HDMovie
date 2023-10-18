import { combineReducers } from 'redux';
import { adminReducer } from './admin.reducer';
import { alertReducer } from './alert-reducer';
import { castReducer } from './cast.reducer';
import { configReducer } from './config.reducer';
import { genreReducer } from './genre.reducer';
import { movieReducer } from './movie.reducer';
import { userReducer } from './user.reducer';

export default combineReducers({
  config: configReducer,
  admin: adminReducer,
  cast: castReducer,
  genre: genreReducer,
  movie: movieReducer,
  user: userReducer,
  alert: alertReducer,
});
