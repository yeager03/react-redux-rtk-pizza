import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	filters: [],
	filtersLoadingStatus: "idle",
	// filters, poppup
	poppup_filters: [],
	poppupFiltersLoadingStatus: "idle",
	// selected filters
	selectedFilter: null,
	selectedPoppupFilter: "популярности",
};

export const fetchFilters = createAsyncThunk("filters/fetchFilters", () => {
	const { request } = useHttp();
	return request("http://localhost:3001/filters");
});

export const fetchPoppupFilters = createAsyncThunk("filters/fetchPoppupFilters", () => {
	const { request } = useHttp();
	return request("http://localhost:3001/popup_filters");
});

const filtersSlice = createSlice({
	name: "filters",
	initialState,
	reducers: {
		selectFilter: (state, action) => {
			state.selectedFilter = action.payload;
		},
		selectPoppupFilter: (state, action) => {
			state.selectedPoppupFilter = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// filters
			.addCase(fetchFilters.pending, (state) => {
				state.filtersLoadingStatus = "loading";
			})
			.addCase(fetchFilters.fulfilled, (state, action) => {
				state.filtersLoadingStatus = "idle";
				state.filters = action.payload;
			})
			.addCase(fetchFilters.rejected, (state) => {
				state.filtersLoadingStatus = "error";
			})
			// poppup filters
			.addCase(fetchPoppupFilters.pending, (state) => {
				state.poppupFiltersLoadingStatus = "loading";
			})
			.addCase(fetchPoppupFilters.fulfilled, (state, action) => {
				state.poppupFiltersLoadingStatus = "idle";
				state.poppup_filters = action.payload;
			})
			.addCase(fetchPoppupFilters.rejected, (state) => {
				state.poppupFiltersLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const {
	reducer,
	actions: { selectFilter, selectPoppupFilter },
} = filtersSlice;

export default reducer;
export { selectFilter, selectPoppupFilter };
