import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../../app/store";

export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
}

export interface Filters {
  category: string;
  minPrice: number | null;
  maxPrice: number | null;
  search: string;
}

export interface ProductsState {
  items: Product[];
  filteredItems: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  filters: Filters;
}

const initialState: ProductsState = {
  items: [],
  filteredItems: [],
  status: "idle",
  filters: {
    category: "",
    minPrice: null,
    maxPrice: null,
    search: "",
  },
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    return (await res.json()) as Product[];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters(state, action: { payload: Partial<Filters> }) {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = state.items.filter((p) => {
        const matchCategory =
          !state.filters.category || p.category === state.filters.category;
        const matchMinPrice =
          state.filters.minPrice === null || p.price >= state.filters.minPrice;
        const matchMaxPrice =
          state.filters.maxPrice === null || p.price <= state.filters.maxPrice;
        const matchSearch =
          !state.filters.search ||
          p.title.toLowerCase().includes(state.filters.search.toLowerCase());

        return matchCategory && matchMinPrice && matchMaxPrice && matchSearch;
      });
    },

    sortByPriceLowToHigh(state) {
      state.filteredItems = [...state.filteredItems].sort(
        (a, b) => a.price - b.price
      );
    },
    sortByPriceHighToLow(state) {
      state.filteredItems = [...state.filteredItems].sort(
        (a, b) => b.price - a.price
      );
    },

    resetSort(state) {
      const { category, minPrice, maxPrice, search } = state.filters;
      state.filteredItems = state.items.filter((p) => {
        const matchCategory = !category || p.category === category;
        const matchMinPrice = minPrice === null || p.price >= minPrice;
        const matchMaxPrice = maxPrice === null || p.price <= maxPrice;
        const matchSearch =
          !search || p.title.toLowerCase().includes(search.toLowerCase());
        return matchCategory && matchMinPrice && matchMaxPrice && matchSearch;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilters, sortByPriceLowToHigh, sortByPriceHighToLow, resetSort } =
  productsSlice.actions;

export const selectFilteredProducts = (state: RootState) =>
  state.products.filteredItems;

export default productsSlice.reducer;
