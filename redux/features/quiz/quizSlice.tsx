import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type QuizType = {
    category: string;
    type: boolean;
    difficulty: string;
    question: string;
    correct_answer: string;
    incorrect_answers: boolean[];
}

type initialType = {
    APIQuiz: QuizType[];
    quizLoading: boolean;
    quizStart: boolean;
    activeAspect: string;
    submitted: boolean;
    correctAnswers: number;
    showingResult: boolean;
}

const initialState: initialType =  {
    APIQuiz: [],
    quizLoading: false,
    quizStart: false,
    activeAspect: '',
    submitted: false,
    correctAnswers: 0,
    showingResult: false,
}

const quizSlice = createSlice({
    name: 'quiz',
    initialState,
    reducers: {
        initializeAPIQuiz: (state, action: PayloadAction<[]>) => {
            state.APIQuiz = action.payload;
        },

        setAspect: (state, action) => {
            action.payload.data.forEach((item: {question: string},index: number) => {
                if(item.question.includes('&#039')){
                    const properQuestion = item.question.replace('&#039', '').replace('&#039', '').replace('&#039', '').replace('&#039', '');
                    action.payload.data[index].question = properQuestion;
                }
                if(item.question.includes('&quot;')){
                    const properQuestion = item.question.replace('&quot;', '').replace('&quot;', '').replace('&quot;', '').replace('&quot;', '');
                    action.payload.data[index].question = properQuestion;
                }
            })
            state.APIQuiz = action.payload.data;
            state.activeAspect = action.payload.aspect;
        },

        startQUiz: (state) => {
            state.quizStart = true;
        },

        setSubmitted: state => {
            state.submitted = !state.submitted;
        },

        setCorrectAnswers: (state, action) => {
            if(action.payload !== 0) {
                state.correctAnswers = state.correctAnswers + action.payload;
                return;
            }
            state.correctAnswers = action.payload;
        },

        setShowingResult: (state, action) => {
            state.showingResult = action.payload;
        },

        finishQUiz: state => {
            state.quizStart =  false;
            state.activeAspect =  '';
            state.submitted =  false;
        },

        setLoading: (state, action) => {
            state.quizLoading = action.payload;
        }
    }
})

export const quizActions = quizSlice.actions;
export default quizSlice.reducer;
