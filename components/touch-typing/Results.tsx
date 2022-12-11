import { ref, set } from 'firebase/database';
import { db } from '../../pages/api/firebase';

import { useEffect, useState } from 'react';

import { useAppSelector } from '../../redux/app-store/store';

import Button from '../layout/Button';
import classes from '../../styles/Main.module.css';

type ResultProps = {
    userResults: boolean[];
    userWords: string[];
    restartHandler: () => void;
}

function Result({userResults, userWords, restartHandler} : ResultProps) {
    const correctWords: string[] = [];

    for(let i= 0; i < userWords.length; i++){
        if(userResults[i] === true ) correctWords.push(userWords[i])
    }

    const keyStrokes = userWords.join('').length;
    const correctKeys = correctWords.join('').length;
    const typos = keyStrokes - correctKeys;    

    const accuracy = keyStrokes - typos !== 0 ? (((keyStrokes - typos) / keyStrokes) * 100) : 0;
    const cleanAccuracy = accuracy === 100 ? accuracy : accuracy.toFixed(2)
    const netSpeed = ((correctKeys / 5) / 1);

    const userId = useAppSelector(state => state.user.id);
    const cloudSpeed = useAppSelector(state => state.typing.cloudSpeed);

    // SET SPEED
    useEffect(() => {
        const typingRefrence = ref(db, 'usersData/' + userId + '/touchSpeed');
        if(+netSpeed.toFixed() > cloudSpeed){
            set(typingRefrence, +netSpeed.toFixed());
        }
    }, [netSpeed, userId, cloudSpeed]);

    return (
        <div className={classes.results}>
            <div>Total Strokes: <span className={classes.numbers}>{keyStrokes}</span></div>
            <div>Correct Strokes: <span className={classes.numbers}>{correctKeys}</span></div>
            <div>Typos: <span className={classes.numbers}>{typos}</span></div>
            <div>Accuracy: <span className={classes.numbers}>{cleanAccuracy}%</span></div>
            <div>Speed: <span className={classes.numbers}>{netSpeed < 0 ? 0 : netSpeed.toFixed()}WPM</span></div>
            <Button
                content="Restart"
                handleClick={restartHandler}
                />
        </div>
    )
};

export default Result;
