import { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { typingActions } from '../../redux/features/touch-typing/TouchTypingSlice';
import classes from '../../styles/Main.module.css'


type TimerProps = {
    timeRunning: boolean;
}

function Timer({timeRunning} : TimerProps) {
    const testTime = 60;
    const dispatch = useDispatch();
    const [counter, setCounter] = useState<number>(testTime);
    if(counter < 0) dispatch(typingActions.setTestFinished(true));

    useEffect(() => {
        const startCounting = setInterval(() => {
            setCounter(prev => prev - 1);
        }, 1000)

        if(!timeRunning) {
            clearInterval(startCounting);
        }
        
        return () => {
            clearInterval(startCounting);
            setCounter(testTime);
        };

    },[timeRunning])

    return (
        <p>Time: <span className={classes.data}>{counter}s</span></p>
    )
}

export default Timer;