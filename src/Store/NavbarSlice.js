import { createSlice } from "@reduxjs/toolkit";

const NavbarSlice = createSlice({
  name: "NavbarSlice",
  initialState: { isNavOpen: false },
  reducers: {
    openNav: (state) => {
      state.isNavOpen = true;
    },
    closeNav: (state) => {
      state.isNavOpen = false;
    },
  },
});

export const { openNav, closeNav } = NavbarSlice.actions;
export default NavbarSlice.reducer;
