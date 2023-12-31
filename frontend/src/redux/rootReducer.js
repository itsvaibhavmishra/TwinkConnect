import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";

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
});

export { rootPersistConfig, rootReducer };
