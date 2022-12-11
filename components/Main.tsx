import Main_ToDo from "./to-do/Main_ToDo";
import Main_Events from "./calendar/Main_Events";
import Main_TouchTyping from "./touch-typing/Main_TouchTyping";
import Main_Quiz from "./quiz/Main_Quiz";
import classes from '../styles/Main.module.css';


function Main() {
    return (
        <div className={classes.main}>
            <div className={classes.upper}>
            <Main_ToDo/>
            <Main_Events/>
            </div>
            <div className={classes.lower}>
            <Main_TouchTyping/>
            <Main_Quiz/>
            </div>
        </div>
    )
}

export default Main;