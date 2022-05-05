import { combineReducers } from 'redux';

import { httpReducer } from './reducers/httpReducer';
import { clientReducer } from './reducers/clientReducer';

const rootReducer = combineReducers({
  http: httpReducer,
  client: clientReducer,
});

export default rootReducer;
