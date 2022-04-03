import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	pizzes: [],
	pizzaLoadingStatus: "idle",
};

export const fetchPizzes = createAsyncThunk("pizzes/fetchPizzes", (sort_type) => {
	const { request } = useHttp();
	const url = "http://localhost:3001/pizzas?_order";

	switch (sort_type) {
		case "цене":
			return request(`${url}=desc&_sort=price`);
		case "алфавиту":
			return request(`${url}=asc&_sort=name`);
		default:
			return request(`${url}=desc&_sort=rating`);
	}
});

const pizzesSlice = createSlice({
	name: "pizzes",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzes.pending, (state) => {
				state.pizzaLoadingStatus = "loading";
			})
			.addCase(fetchPizzes.fulfilled, (state, action) => {
				state.pizzaLoadingStatus = "idle";
				state.pizzes = action.payload;
			})
			.addCase(fetchPizzes.rejected, (state) => {
				state.pizzaLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { reducer } = pizzesSlice;
export default reducer;

export const filteredPizzes = createSelector(
	// pizzes
	({ pizzes }) => pizzes.pizzes,
	({ pizzes }) => pizzes.pizzaLoadingStatus,
	// filters
	({ filters }) => filters.selectedPoppupFilter,
	({ filters }) => filters.selectedFilter,
	(pizzes, loading, selectedPoppupFilter, selectedFilter) => {
		if (selectedFilter === null) {
			return { pizzes, selectedPoppupFilter, loading };
		}
		return {
			pizzes: pizzes.filter((pizza) => pizza.category === selectedFilter),
			selectedPoppupFilter,
			loading,
		};
	}
);
