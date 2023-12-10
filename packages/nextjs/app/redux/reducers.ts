// reducers.ts
import { createReducer } from '@reduxjs/toolkit';
import { setFilterValues, setLoading, setPropertiesForSale, setPropertiesForRent } from './actions';

interface State {
  filterValues: { [key: string]: any };
  loading: boolean;
  propertiesForSale: Array<any>;
  propertiesForRent: Array<any>;
}

const initialState: State = {
  filterValues: { purpose: '', type: '', price: [0, 100], area: [0, 100], rooms: 0 },
  loading: false,
  propertiesForSale: [],
  propertiesForRent: [],
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterValues, (state, action) => {
      state.filterValues = { ...state.filterValues, ...action.payload };
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(setPropertiesForSale, (state, action) => {
      state.propertiesForSale = action.payload;
    })
    .addCase(setPropertiesForRent, (state, action) => {
      state.propertiesForRent = action.payload;
    });
});

export type RootState = ReturnType<typeof rootReducer>;





// // reducers.ts

// import { createReducer } from '@reduxjs/toolkit';
// import { setFilterValues, setLoading } from './actions';

// interface State {
//   filterValues: { [key: string]: any };
//   loading: boolean;
// }

// const initialState: State = {
//   filterValues: { purpose: '', type: '', price: [0, 100], area: [0, 100], rooms: 0 },
//   loading: false,
// };

// export const rootReducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(setFilterValues, (state, action) => {
//       state.filterValues = { ...state.filterValues, ...action.payload };
//     })
//     .addCase(setLoading, (state, action) => {
//       state.loading = action.payload;
//     });
// });

// export type RootState = ReturnType<typeof rootReducer>;
