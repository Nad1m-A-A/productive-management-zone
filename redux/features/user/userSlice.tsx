import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: '',
    email: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        acquaint: (state, action) => {
            state.id = action.payload.id;
            state.email = action.payload.email;
        }
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;