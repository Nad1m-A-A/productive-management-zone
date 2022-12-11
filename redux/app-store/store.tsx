import { configureStore } from "@reduxjs/toolkit";
import todoReducer from '../features/todo/todoSlice';
import TouchTypingReducer from "../features/touch-typing/TouchTypingSlice";
import eventsReducer from "../features/events/eventsSlice";
import userReducer from '../features/user/userSlice';
import quizReducer from '../features/quiz/quizSlice';

import { useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

const store = configureStore({
    reducer: {
        todo: todoReducer,
        typing: TouchTypingReducer,
        user: userReducer,
        events: eventsReducer,
        quiz: quizReducer
    }
})

type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// type AppDispatch = typeof store.dispatch
// export const useAppDispatch: () => AppDispatch = useDispatch;

export default store;














// import cakeReducer from '../features/cake/cakeSlice';
// const store = configureStore({
//     reducer: {
//         cake: cakeReducer,
//     }
// })

// export default store;