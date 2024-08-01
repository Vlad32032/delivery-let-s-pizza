import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getCartFromLocalStorage } from "../../utils/getCartFromLocalStorage";

export interface ICartItem {
    id: number,
    title: string,
    price: number,
    imageUrl: string,
    type: string,
    size: number,
    count: number
}

interface ICartState {
	totalPrice: number,
	totalCount: number,
	cartItems: ICartItem[],
}

const initialState: ICartState = {
	totalPrice: 0,
	totalCount: 0,
	cartItems: getCartFromLocalStorage()
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		countCart: (state) => {
			state.totalPrice = state.cartItems.reduce(
				(sum, obj) => obj.count * obj.price + sum,
				0
			);

			state.totalCount = state.cartItems.reduce(
				(sum, obj) => obj.count + sum,
				0
			);
		},
		addCartItems: (state, action: PayloadAction<ICartItem[]>) => {
			state.cartItems = action.payload;
		},
		addCartItem: (state, action: PayloadAction<ICartItem>) => {
			const findItem = state.cartItems.find(
				(obj) => obj.id === action.payload.id
			);

			if (findItem) {
				findItem.count++;
			} else {
				state.cartItems.push(action.payload);
			}
		},
		removeOneCartItem: (state, action: PayloadAction<ICartItem>) => {
			const findItem = state.cartItems.find(
				(obj) => obj.id === action.payload.id
			);

			if(!findItem) return;

			if (findItem.count === 1) {
				console.log(findItem.count);

				state.cartItems = state.cartItems.filter(
					(obj) => obj.id !== action.payload.id
				);
			} else {
				findItem.count--;
			}
		},
		removeAllCartItem: (state, action: PayloadAction<ICartItem>) => {
			state.cartItems = state.cartItems.filter(
				(obj) => obj.id !== action.payload.id
			);
		},
		clearCartItems: (state) => {
			state.totalPrice = 0;
			state.totalCount = 0;
			state.cartItems = [];
		},
	},
});

export const {
	countCart,
	addCartItems,
	addCartItem,
	removeOneCartItem,
	removeAllCartItem,
	clearCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
