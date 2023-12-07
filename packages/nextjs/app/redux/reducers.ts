// reducers.ts

import { createReducer } from '@reduxjs/toolkit';
import { setFilterValues, setLoading } from './actions';

interface State {
  filterValues: { [key: string]: any };
  loading: boolean;
}

const initialState: State = {
  filterValues: { purpose: '', type: '', price: [0, 100], area: [0, 100], rooms: 0 },
  loading: false,
};

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFilterValues, (state, action) => {
      state.filterValues = { ...state.filterValues, ...action.payload };
    })
    .addCase(setLoading, (state, action) => {
      state.loading = action.payload;
    });
});

export type RootState = ReturnType<typeof rootReducer>;
