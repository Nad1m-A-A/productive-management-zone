import { useEffect, useRef, useState } from "react";

import { useDispatch } from 'react-redux';
import { typingActions } from '../../redux/features/touch-typing/TouchTypingSlice';

import Results from './Results';
import Screen from './Screen';
import Status from './Status';
import Button from "../layout/Button";
import Input from "../layout/Input";

import { useAppSelector } from "../../redux/app-store/store";

import classes from '../../styles/Main.module.css';

function TouchTyping() {
    const words = 'the be and of a have to it I for you he with do say this they at but we his from that not by she or what go their can who get if would my make know will up time year think which them some me people take into just see him your come could now than other how then our two these want way look first also new because day more use no man find here thing give many well those tell one very her even any good woman through us life child there down may  should call world school still try in as last ask need too feel three when state never become between high really something another family own out leave put old while mean on keep student why let great same big group begin seem country help talk turn problem every start hand might show part about against place over such again few most week company where system each program hear so question during work play government run small number off always move like night live point believe hold today bring happen next without before large all million must home under water room write mother'
    const wordsGenerater = () => words.split(' ').sort(() => Math.random() > 0.5 ? 1 : -1).map(word => word.trim());
    const [wordsArray, setWordsArray] = useState<string[]>([]);

    const typingInputRef = useRef<HTMLInputElement>(null!);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [userResults, setUserResult] = useState<boolean[]>([]);
    const [userWords, setUserWords] = useState<string[]>([]);
    const [timeRunning, setTimeRunning] = useState<boolean>(false);
    const [restarting, setRestarting] = useState<boolean>(false);

    const dispatch = useDispatch();
    const testFinished = useAppSelector(state => state.typing.testFinished);

    useEffect(() => {
        setWordsArray(wordsGenerater());
    },[restarting])

    const process = () => {
        const value = typingInputRef.current.value;
        setTimeRunning(true);

        if(value.endsWith(' ')){
            if(value.trim().length === 0) {
                typingInputRef.current.value = '';
                return;
            }

            setUserWords(prev => {
                const newArr = [...prev, value.trim()];
                return newArr;
            });

            setCurrentIndex(prevIndex => prevIndex + 1);
            typingInputRef.current.value = '';

            setUserResult(prev => {
                const newArray = [...prev];
                    newArray[currentIndex] = value.trim() === wordsArray[currentIndex];
                    return newArray;
                })
        }
    }

    const restartHandler = () => {
        if(typingInputRef.current) typingInputRef.current.value = '';        
        dispatch(typingActions.setTestFinished(false)); 
        setCurrentIndex(0);
        setUserResult([]);
        setUserWords([]);
        setTimeRunning(false);
        setRestarting(prev => !prev); // what matters here is just changing the value so that the <Screen> component will rerender
    }

    return (
        <div className={classes.section + " " + classes.touch_typing_section}>
            {!testFinished && <Status 
                timeRunning={timeRunning}
            />}

            {!testFinished && <div className={classes.typing_controls}>
                <Input
                    disabled={testFinished}
                    changeHandler={process}
                    ref={typingInputRef}
                    placeholder={timeRunning ? "" : 'Start On Key Press'}
                />
                <Button
                    content="Restart"
                    handleClick={restartHandler}
                />
            </div>}

            {!testFinished && <Screen
                userResults={userResults}
                currentIndex={currentIndex}
                wordsArray={wordsArray}
            />}

            {testFinished && <Results
            userResults={userResults}
            userWords={userWords}
            restartHandler={restartHandler}
            />}
        </div>
    )
}

export default TouchTyping;