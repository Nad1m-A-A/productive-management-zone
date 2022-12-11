import { useAppSelector } from '../../redux/app-store/store';
import { quizActions } from '../../redux/features/quiz/quizSlice';
import { useDispatch } from 'react-redux';
import classes from '../../styles/Main.module.css';

import Button from "../layout/Button";

function APIResult() {
    const dispatch = useDispatch();
    const { correctAnswers, APIQuiz } = useAppSelector(state => state.quiz);

    const backToMainQuiz = () => {
        dispatch(quizActions.setShowingResult(false));
        dispatch(quizActions.setCorrectAnswers(0));
    }

    return (
        <div className={classes.result}>
            <span>You correctly answered <span className={classes.data}>{correctAnswers}</span> out of <span className={classes.data}>{APIQuiz.length}</span> questions.</span>
            <Button handleClick={backToMainQuiz} content='Confirm'/>
        </div>
    )
}

export default APIResult;