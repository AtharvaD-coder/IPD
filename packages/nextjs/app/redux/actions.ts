// actions.ts
import { createAction } from "@reduxjs/toolkit";

export const setFilterValues = createAction<{ [key: string]: any }>("SET_FILTER_VALUES");
export const setLoading = createAction<boolean>("SET_LOADING");
export const setPropertiesForSale = createAction<Array<any>>("SET_PROPERTIES_FOR_SALE");
export const setPropertiesForRent = createAction<Array<any>>("SET_PROPERTIES_FOR_RENT");

// // actions.ts

// import { createAction } from '@reduxjs/toolkit';

// export const setFilterValues = createAction<{ [key: string]: any }>('SET_FILTER_VALUES');
// export const setLoading = createAction<boolean>('SET_LOADING');
