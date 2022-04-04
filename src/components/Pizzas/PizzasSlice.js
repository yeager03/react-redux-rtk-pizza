import { createSlice, createAsyncThunk, createSelector } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const initialState = {
	pizzas: [],
	pizzaLoadingStatus: "idle",
};

export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzas", (sort_type) => {
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

const pizzasSlice = createSlice({
	name: "pizzas",
	initialState,
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.pizzaLoadingStatus = "loading";
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.pizzaLoadingStatus = "idle";
				state.pizzas = action.payload;
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.pizzaLoadingStatus = "error";
			})
			.addDefaultCase(() => {});
	},
});

const { reducer } = pizzasSlice;
export default reducer;

export const filteredPizzas = createSelector(
	// pizzas
	({ pizzas }) => pizzas.pizzas,
	({ pizzas }) => pizzas.pizzaLoadingStatus,
	// filters
	({ filters }) => filters.selectedPoppupFilter,
	({ filters }) => filters.selectedFilter,
	(pizzas, loading, selectedPoppupFilter, selectedFilter) => {
		if (selectedFilter === null) {
			return { pizzas, selectedPoppupFilter, loading };
		}
		return {
			pizzas: pizzas.filter((pizza) => pizza.category === selectedFilter),
			selectedPoppupFilter,
			loading,
		};
	}
);
