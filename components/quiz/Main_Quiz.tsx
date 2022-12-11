import { useAppSelector } from '../../redux/app-store/store';

import classes from '../../styles/Main.module.css';

import APINavigations from "./API_Navigations";
import APIQuiz from "./API_Quiz";
import APIResult from './API_Result';


function MainQuiz() {
    const {quizStart, showingResult} = useAppSelector(state => state.quiz);

    return (
        <div className={classes.section + ' ' + classes.quiz_section}>
            {!quizStart && !showingResult && <APINavigations/>}
            {quizStart && !showingResult && <APIQuiz/>}
            {showingResult && <APIResult/>}
        </div>
    )
}

export default MainQuiz;