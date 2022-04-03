import { configureStore } from "@reduxjs/toolkit";
import pizzes from "../components/Pizzes/PizzesSlice";
import filters from "../components/Categories/FiltersAllSlice";
import cart from "../components/Cart/CartSlice";

const store = configureStore({
	reducer: { pizzes, filters, cart },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== "production",
});

export default store;
