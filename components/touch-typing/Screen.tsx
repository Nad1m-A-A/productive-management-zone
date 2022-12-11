import Word from './Word';
import classes from '../../styles/Main.module.css';

type ScreenProps = {
    userResults: boolean[];
    currentIndex: number;
    wordsArray: string[];
}

function Screen({userResults, currentIndex, wordsArray} : ScreenProps) {
    return (
        <p className={classes.screen}>
            {wordsArray.map((word, index) => 
                <Word correct={userResults[index]} active={currentIndex === index} key={index} text={word}/>)}
        </p>
    )
}

export default Screen