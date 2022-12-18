import { useAppSelector } from '../../redux/app-store/store';
import { quizActions } from '../../redux/features/quiz/quizSlice';
import { useDispatch } from 'react-redux';

import { useState } from 'react';

import Button from '../layout/Button';
import Question from "./Question";
import classes from '../../styles/Main.module.css';

import { CiCircleRemove } from 'react-icons/ci';

function APIQuiz() {
    const dispatch = useDispatch();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [trueBtnClasses, setTrueBtnClasses] = useState('');
    const [falseBtnClasses, setFalseBtnClasses] = useState('');
    const {question, correct_answer} = useAppSelector(state => state.quiz.APIQuiz[currentQuestion]);
    const {submitted, APIQuiz} = useAppSelector(state => state.quiz);

    const checkAnswer = (answer: string) => {
        // IF ANSWER IS CORRECT
        if(answer == correct_answer.toLocaleLowerCase()) {
            dispatch(quizActions.setSubmitted());
            dispatch(quizActions.setCorrectAnswers(1));
            
            if(answer === 'true'){
                setTrueBtnClasses(classes.correct_answer);
            }
            if(answer === 'false'){
                setFalseBtnClasses(classes.correct_answer);
            }

        // IF ANSWER IS WRONG
        } else {
            dispatch(quizActions.setSubmitted());
            if(answer === 'true'){
                setTrueBtnClasses(classes.wrong_answer);
            }
            if(answer === 'false'){
                setFalseBtnClasses(classes.wrong_answer);
            }
        }
    }

    // GO TO NEXT QUESTION | FINISH QUIZ
    const proceed = () => {
        setTrueBtnClasses('');
        setFalseBtnClasses('');

        if(currentQuestion === APIQuiz.length - 1) {
            dispatch(quizActions.finishQUiz());
            dispatch(quizActions.setShowingResult(true));
            return;
        }
        
        setCurrentQuestion(prev => prev + 1);
        dispatch(quizActions.setSubmitted());
    }

    const cancelQuiz = () => {
        dispatch(quizActions.finishQUiz());
    }

    const btnContent = currentQuestion === APIQuiz.length - 1 ? 'Finish' : 'Next';

    return (
        <div className={classes.quiz}>
            <Question content={question}/>
            <div className={classes.options}>
            <Button className={trueBtnClasses + ' ' + classes.answer_btn} disabled={submitted} handleClick={() => checkAnswer("true")} content='true'/>
            <Button className={falseBtnClasses + ' ' + classes.answer_btn} disabled={submitted} handleClick={() => checkAnswer("false")} content='false'/>
            </div>
            {submitted && <Button className={classes.next_btn} handleClick={proceed} content={btnContent}/>}
            <Button className={classes.cancel_btn} handleClick={cancelQuiz}><CiCircleRemove></CiCircleRemove></Button>
        </div>
    )
}

export default APIQuiz;