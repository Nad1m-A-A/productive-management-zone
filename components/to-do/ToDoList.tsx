import ToDoItem from './ToDoItem';
import classes from '../../styles/Main.module.css';
import { useAppSelector } from '../../redux/app-store/store';


type todoType = {
    id: string;
    active: boolean;
    content: string;
}

    type ToDoProps = {
    todoList: todoType[];
}

function TodoList({todoList}: ToDoProps) {
    const tasksLoading = useAppSelector(state => state.todo.tasksLoading);
    const userId = useAppSelector(state => state.user.id);
    
    return (
        <ul>
            {tasksLoading && userId && <span className={classes.loader}></span>}
            {todoList.length !== 0 && todoList?.map((item : {id:string, active : boolean, content : string,}, index : number) => 
                <ToDoItem task={item} key={index} index={index}/>)} 
            {todoList.length === 0 && !tasksLoading && <span className={classes.no_data}>You have 0 tasks</span>}
        </ul>
    )
}

export default TodoList;