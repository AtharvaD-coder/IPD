// // store.ts

// import { configureStore } from "@reduxjs/toolkit";
// import filterReducer from './slice/filter';

// export const store = configureStore({
//   reducer: {
//     filter: filterReducer,
//   },
// });


import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
