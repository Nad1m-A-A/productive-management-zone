import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type eventType = {
    id: string;
    title: string;
    date: string;
}

type initialListType = {
    eventsList: eventType[];
    eventsLoading: boolean;
}

const initialState: initialListType = {
    eventsList: [],
    eventsLoading: false,
}

const eventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        initializeEvents: (state, action: PayloadAction<eventType[]>) => {
            state.eventsList = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.eventsLoading = action.payload;
        }
    }
})

export const evetnsActions = eventsSlice.actions;
export default eventsSlice.reducer;