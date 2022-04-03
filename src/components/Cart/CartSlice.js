import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	cartItems: {},
	totalPrice: 0,
	totalCount: 0,
};

const getTotalPrice = (arr) => arr.reduce((sum, obj) => obj.price + sum, 0);

const _get = (obj, path) => {
	const [firstKey, ...keys] = path.split(".");
	return keys.reduce((val, key) => {
		return val[key];
	}, obj[firstKey]);
};

const getTotalSum = (obj, path) => {
	return Object.values(obj).reduce((sum, obj) => {
		const value = _get(obj, path);
		return sum + value;
	}, 0);
};

const filtersSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addPizzaToCart: (state, action) => {
			const currentPizzaItems = !state.cartItems[action.payload.id]
				? [action.payload]
				: [...state.cartItems[action.payload.id].items, action.payload];

			const newItems = {
				...state.cartItems,
				[action.payload.id]: {
					items: currentPizzaItems,
					totalPrice: getTotalPrice(currentPizzaItems),
				},
			};

			const items = Object.values(newItems).map((obj) => obj.items);
			const allPizzes = [].concat.apply([], items);

			return {
				...state,
				cartItems: newItems,
				totalCount: allPizzes.length,
				totalPrice: getTotalPrice(allPizzes),
			};
		},

		clearCart: (state) => {
			state.cartItems = {};
			state.totalPrice = 0;
			state.totalCount = 0;
		},

		removePizzaItem: (state, action) => {
			const currentTotalPrice = state.cartItems[action.payload].totalPrice;
			const currentTotalLength = state.cartItems[action.payload].items.length;

			delete state.cartItems[action.payload];

			state.totalPrice = state.totalPrice - currentTotalPrice;
			state.totalCount = state.totalCount - currentTotalLength;
		},

		plustPizzaItem: (state, action) => {
			const newObjItems = [...state.cartItems[action.payload].items, state.cartItems[action.payload].items[0]];

			const newItems = {
				...state.cartItems,
				[action.payload]: {
					items: newObjItems,
					totalPrice: getTotalPrice(newObjItems),
				},
			};

			const totalCount = getTotalSum(newItems, "items.length");
			const totalPrice = getTotalSum(newItems, "totalPrice");

			return {
				...state,
				cartItems: newItems,
				totalCount,
				totalPrice,
			};
		},

		minusPizzaItem: (state, action) => {
			const oldItems = state.cartItems[action.payload].items;
			const newObjItems = oldItems.length > 1 ? state.cartItems[action.payload].items.slice(1) : oldItems;

			const newItems = {
				...state.cartItems,
				[action.payload]: {
					items: newObjItems,
					totalPrice: getTotalPrice(newObjItems),
				},
			};

			const totalCount = getTotalSum(newItems, "items.length");
			const totalPrice = getTotalSum(newItems, "totalPrice");

			return {
				...state,
				cartItems: newItems,
				totalCount,
				totalPrice,
			};
		},
	},
});

const {
	reducer,
	actions: { addPizzaToCart, clearCart, removePizzaItem, plustPizzaItem, minusPizzaItem },
} = filtersSlice;

export default reducer;
export { addPizzaToCart, clearCart, removePizzaItem, plustPizzaItem, minusPizzaItem };
