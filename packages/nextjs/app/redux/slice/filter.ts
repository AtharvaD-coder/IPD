import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchFilters = createAsyncThunk("fetchFilters", async () => {
  const response = await fetch("");
  return response.json();
});

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    filterValues: { purpose: "", type: "", price: [0, 100], area: [0, 100], bedrooms: 0, bathrooms: 0 },
    loading: false,
  },
  reducers: {},
});

export default filterSlice.reducer;
