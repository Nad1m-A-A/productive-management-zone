import Timer from './Timer';
import Best from './Best';
import classes from '../../styles/Main.module.css';

type StatusProps = {
    timeRunning: boolean;
}

function Status({timeRunning} : StatusProps) {
    return (
        <div className={classes.status}>
            <Timer timeRunning={timeRunning}/>
            <Best/>
        </div>
    )
}

export default Status;