import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import axios from "axios";

const axiosFetch = async (url: string) => {
	const response = await axios.get(url);
	return response.data;
}

export const fetchPizzasLength = createAsyncThunk("pizzas/fetchPizzasLenghtStatus", axiosFetch);
export const fetchPizzaById = createAsyncThunk("pizzas/fetchPizzaByIdStatus", axiosFetch);
export const fetchPizzas = createAsyncThunk("pizzas/fetchPizzasStatus", axiosFetch);

export interface IPizza {
    id: string,
    title: string,
	description: string,
    imageUrl: string[],
    priceMin: number,
	prices: number[]
    sizes: number[],
    types: number[]
};

interface IPizzasState {
	pizzaById: IPizza | null, 
	pizzasListLength: number,
	pizzasList: IPizza[],
	status: "loading" | "success" | "error",
};

const initialState: IPizzasState = {
	pizzaById: null,
	pizzasListLength: 1,
	pizzasList: [],
	status: "loading",
};

export const pizzasSlise = createSlice({
	name: "pizzas",
	initialState,
	reducers: {
		setPizzasList: (state, action: PayloadAction<IPizza[]>) => {
			state.pizzasList = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPizzaById.pending, (state) => {
				state.pizzaById = null;
				state.status = "loading";
			})
			.addCase(fetchPizzaById.fulfilled, (state, action: PayloadAction<IPizza>) => {
				state.pizzaById = action.payload;
				state.status = "success";
			})
			.addCase(fetchPizzaById.rejected, (state) => {
				state.pizzaById = null;
				state.status = "error";
			});
		builder
			.addCase(fetchPizzas.pending, (state) => {
				state.pizzasList = [];
				state.status = "loading";
			})
			.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
				state.pizzasList = action.payload;
				state.status = "success";
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.pizzasList = [];
				state.status = "error";
			});
		builder
			.addCase(fetchPizzasLength.pending, (state) => {
				state.pizzasListLength = 1;
			})
			.addCase(fetchPizzasLength.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
				state.pizzasListLength = action.payload.length;
			})
			.addCase(fetchPizzasLength.rejected, (state) => {
				state.pizzasListLength = 1;
			});
		
	},
});

export const { setPizzasList } = pizzasSlise.actions;

export const selectPizzasState = (state: RootState) => state.pizzas;

export default pizzasSlise.reducer;
