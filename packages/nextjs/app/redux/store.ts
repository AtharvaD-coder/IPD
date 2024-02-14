// // store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import filterReducer from './slice/filter';
// export const store = configureStore({
//   reducer: {
//     filter: filterReducer,
//   },
// });
import { rootReducer } from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
