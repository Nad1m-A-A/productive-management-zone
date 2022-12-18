import { quizActions } from "../../redux/features/quiz/quizSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/app-store/store";
import { useState } from "react";
import Button from "../layout/Button";

import classes from '../../styles/Main.module.css';

function APINavigations() {
    const {quizLoading} = useAppSelector(state => state.quiz);
    const [quizStarts, setQuizStarts] = useState(false);
    const [selected, setSelected] = useState('');
    const dispatch = useDispatch();
    const links = {
        history: 'https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=boolean',
        nature: 'https://opentdb.com/api.php?amount=10&category=17&difficulty=medium&type=boolean',
        computers: 'https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=boolean',
        geography: 'https://opentdb.com/api.php?amount=10&category=22&difficulty=medium&type=boolean',
        animals: 'https://opentdb.com/api.php?amount=8&category=27&difficulty=medium&type=boolean',
        art: 'https://opentdb.com/api.php?amount=3&category=25&difficulty=medium&type=boolean',
        mathematics: 'https://opentdb.com/api.php?amount=8&category=19&difficulty=medium&type=boolean',
    }

    const aspectHandler = (aspectNum: number) => {
        setQuizStarts(false);
        dispatch(quizActions.setLoading(true));
        const aspect = Object.keys(links)[aspectNum];
        const aspectLink = Object.values(links)[aspectNum];

        setSelected(aspect);
        fetch(aspectLink)
        .then(res => {
            if(!res.ok){
                dispatch(quizActions.setLoading(false));
                throw new Error('An Error Ocured while requesting the data... Please try again later')
            }
            return res.json();

        })
        .then(data => {
            setQuizStarts(true);
            dispatch(quizActions.setLoading(false));
            dispatch(quizActions.setAspect({data: data.results, aspect: aspect}));
        })
        .catch(error => {
            console.log(error);
        })
    }
    
    const startQuiz = () => {
        dispatch(quizActions.startQUiz());
    }

    return (
        <div className={classes.topics}>
            <div className={classes.first_row}>
            <Button handleClick={() => aspectHandler(0)} content='History' className={selected === 'history' ? classes.selected : ''}/>
            <Button handleClick={() => aspectHandler(1)} content='Nature' className={selected === 'nature' ? classes.selected : ''}/>
            <Button handleClick={() => aspectHandler(2)} content='Computers' className={selected === 'computers' ? classes.selected : ''}/>
            <Button handleClick={() => aspectHandler(3)} content='Geography' className={selected === 'geography' ? classes.selected : ''}/>
            </div>
            <div className={classes.second_row}>
            <Button handleClick={() => aspectHandler(4)} content='Animals' className={selected === 'animals' ? classes.selected : ''}/>
            <Button handleClick={() => aspectHandler(5)} content='Art' className={selected === 'art' ? classes.selected : ''}/>
            <Button handleClick={() => aspectHandler(6)} content='Mathematics' className={selected === 'mathematics' ? classes.selected : ''}/>
            </div>
            {quizStarts && !quizLoading && <div className={classes.start}>
                <Button handleClick={startQuiz} content="Start"></Button>
            </div>}
            {quizLoading && <span className={classes.loader}></span>}
        </div>
    )
}

export default APINavigations;