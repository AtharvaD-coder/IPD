// actions.ts

import { createAction } from '@reduxjs/toolkit';

export const setFilterValues = createAction<{ [key: string]: any }>('SET_FILTER_VALUES');
export const setLoading = createAction<boolean>('SET_LOADING');
