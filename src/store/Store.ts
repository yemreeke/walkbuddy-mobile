import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from "@react-native-async-storage/async-storage";
import authReducer from "./reducers/authReducer";
import thunk from 'redux-thunk';

const authPersistConfig = {
    key: 'auth',
    storage: AsyncStorage,
}

const authPersistedReducer = persistReducer(authPersistConfig, authReducer)
const Store = configureStore({
    reducer: {
        auth: authPersistedReducer,
    },
    middleware: [thunk]
})

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;
export const persistor = persistStore(Store)

export default Store;