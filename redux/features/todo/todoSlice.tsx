import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type todoType = {
    id: string;
    active: boolean;
    content: string
}

type initialListType = {
    todoList: todoType[];
    tasksLoading: boolean;
}

const initialState: initialListType = {
    todoList: [],
    tasksLoading: false,
}

const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        initializeTasks: (state, action: PayloadAction<todoType[]>) => {
            state.todoList = action.payload;
        },

        setLoading: (state, action: PayloadAction<boolean>) => {
            state.tasksLoading = action.payload;
        }
    }
})

export const todoActions = todoSlice.actions;
export default todoSlice.reducer;