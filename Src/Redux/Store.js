import {
  autoBatchEnhancer,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import StateSlice from "./StateSlice";
import LoiginSlice from "./LoiginSlice";

const rootReducer = combineReducers({
  users: StateSlice,
  auth: LoiginSlice,
  // Add other reducers here if needed
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage, // Use AsyncStorage for React Native
  whitelist: ["users", "auth"], // Specify which slices of state to persist
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
