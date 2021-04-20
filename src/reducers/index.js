import { combineReducers } from 'redux';
import session from './session.js';
const rootReducer = combineReducers({ 
    session: session
});
export default rootReducer;