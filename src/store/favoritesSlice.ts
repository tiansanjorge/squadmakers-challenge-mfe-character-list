import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Favorite = {
  id: number;
  nombre: string;
  especie: string;
  imagen: string;
  ubicacion: string;
  origen: string;
  estado: "Vivo" | "Muerto" | "Desconocido";
};

const initialState: Favorite[] = [];

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Favorite>) => {
      const exists = state.find((p) => p.id === action.payload.id);
      if (exists) {
        return state.filter((p) => p.id !== action.payload.id);
      } else {
        return [...state, action.payload];
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
