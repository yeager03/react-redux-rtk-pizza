import { configureStore } from "@reduxjs/toolkit";
import pizzas from "../components/Pizzas/PizzasSlice";
import filters from "../components/Categories/FiltersAllSlice";
import cart from "../components/Cart/CartSlice";

const store = configureStore({
	reducer: { pizzas, filters, cart },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
