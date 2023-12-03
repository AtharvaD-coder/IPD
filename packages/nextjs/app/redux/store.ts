// store.ts
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';


export type RootState = ReturnType<typeof store.getState>;


const store = configureStore({
  reducer: rootReducer,
});

export default store;