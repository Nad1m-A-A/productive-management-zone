import classes from '../../styles/Main.module.css';

import React from 'react';

type WordProps = {
    text: string;
    correct: boolean;
    active: boolean;
}

function Word({text, correct, active} : WordProps) {
    if(correct) {
        return <span className={classes.correct}>{text} </span>
    }

    if(correct === false) {
        return <span className={classes.incorrect}>{text} </span>
    }

    if(active) {
        return <span className={classes.active}>{text} </span>
    }

    return <span>{text} </span>
}


export default React.memo(Word);