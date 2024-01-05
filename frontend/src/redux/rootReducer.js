import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { authReducer, chatReducer, userReducer } from "./slices";

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  // allow or disallow a slice to persist
  // whitelist: []
  // blacklist: []
};

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  chat: chatReducer,
});

export { rootPersistConfig, rootReducer };
