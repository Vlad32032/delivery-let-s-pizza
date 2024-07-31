import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ISortOption {
	name: string,
	sortProperty: string,
}

interface IFilterState {
	activeSortOption: ISortOption,
	categoriesIndex: number,
	pageIndex: number,
	searchValue: string,
}

const initialState: IFilterState = {
	activeSortOption: { name: "популярности ( ↑ )", sortProperty: "rating" },
	categoriesIndex: 0,
	pageIndex: 0,
	searchValue: "",
};

export const filterSlice = createSlice({
	name: "filter",
	initialState,
	reducers: {
		setActiveSortOption: (state, action: PayloadAction<ISortOption>) => {
			state.activeSortOption = action.payload;
		},
		setCategoriesIndex: (state, action: PayloadAction<number>) => {
			state.categoriesIndex = action.payload;
		},
		setPageIndex: (state, action: PayloadAction<number>) => {
			state.pageIndex = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		},
		setAllSearchParams: (state, action: PayloadAction<IFilterState>) => {
			state.activeSortOption = action.payload.activeSortOption;
			state.categoriesIndex = Number(action.payload.categoriesIndex);
			state.pageIndex = Number(action.payload.pageIndex);
			state.searchValue = action.payload.searchValue;
		},
		resetAllSearchParams: (state) => {
			state.activeSortOption = initialState.activeSortOption;
			state.categoriesIndex = initialState.categoriesIndex;
			state.pageIndex = initialState.pageIndex;
			state.searchValue = initialState.searchValue;
		},
	},
});

export const {
	setCategoriesIndex,
	setActiveSortOption,
	setPageIndex,
	setSearchValue,
	setAllSearchParams,
	resetAllSearchParams,
} = filterSlice.actions;

export const selectFilterState = (state: RootState) => state.filter;
export const selectActiveSortOption = (state: RootState) => state.filter.activeSortOption;
export const selectCategoriesIndex = (state: RootState) => state.filter.categoriesIndex;

export default filterSlice.reducer;
