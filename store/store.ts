import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import tokenSlice from './tokenSlice';
import trackSlice from './trackSlice';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}  

const reducers = combineReducers({
    tokens: tokenSlice,     
    tracks: trackSlice,      
});
   
const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)