import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';

const initialState: { testFinished: boolean; cloudSpeed: number; bestLoading: boolean } = {
    testFinished: false,
    cloudSpeed: 0,
    bestLoading: false,
}

const touchTypingSlice = createSlice({
    name: 'typing',
    initialState,
    reducers: {
        setTestFinished: (state, action: PayloadAction<boolean>) => {
            state.testFinished = action.payload;
        },

        setCloudSpeed: (state, action: PayloadAction<number>) => {
            state.cloudSpeed = action.payload;
        },

        setBestLoading: (state, action: PayloadAction<boolean>) => {
            state.bestLoading = action.payload;
        }
    }
})

export const typingActions = touchTypingSlice.actions;
export default touchTypingSlice.reducer;