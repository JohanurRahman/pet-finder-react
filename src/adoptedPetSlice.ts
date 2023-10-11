import { createSlice } from '@reduxjs/toolkit';

export const adoptedPetSlice = createSlice({
  name: 'adoptedPet',
  initialState: {
    value: null,
  },
  reducers: {
    adopt: (state, actions) => {
      state.value = actions.payload;
    },
  },
});

export const { adopt } = adoptedPetSlice.actions;
export default adoptedPetSlice.reducer;
