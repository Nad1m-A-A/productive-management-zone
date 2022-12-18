import { onValue, ref, set } from 'firebase/database';
import { db } from '../../pages/api/firebase';

import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../redux/app-store/store';
import { todoActions } from '../../redux/features/todo/todoSlice';

import ToDoList from './ToDoList';
import Button from '../layout/Button';
import Input from '../layout/Input';

import classes from '../../styles/Main.module.css';


function ToDos() {
    const taskInputRef = useRef<HTMLInputElement>(null!);

    const dispatch = useDispatch();
    const {todoList} = useAppSelector(state => state.todo);
    const userId = useAppSelector(state => state.user.id);
    const todosReference = ref(db, 'usersData/' + userId + '/toDos');

    // GET THE TO DO LIST
    useEffect(() => {
        dispatch(todoActions.setLoading(true));
        const todosReference = ref(db, 'usersData/' + userId + '/toDos'); // I add this again because if it was a dependency it will cause infinite rendering
        onValue(todosReference,  (snapshot) => {
            const data = snapshot.val();
            if(data === null) {
                dispatch(todoActions.setLoading(false));
                return;
            }
            const parsedData = JSON.parse(data);
            dispatch(todoActions.setLoading(false));
            dispatch(todoActions.initializeTasks(parsedData)); // this will run when the store updated
        });

    },[dispatch, userId]);

    // ADD A TO DO
    const addTaskHandler = () => {
        const value = taskInputRef.current.value;
        if(value.trim().length === 0) return;

        const task = {
            id: Math.random().toString(16).slice(2),
            active: true,
            content: value,
        };
        set(todosReference, JSON.stringify([...todoList,task]));

        taskInputRef.current.value = '';
    }

    return (
        <div className={classes.section + " " + classes.to_do_section}>
            <ToDoList todoList={todoList}/>
            <div className={classes.controls}>
                <Input ref={taskInputRef} placeholder='Add A Task'/>
                <Button  handleClick={addTaskHandler} content='Add'/>
            </div>
        </div>
    )
}

export default ToDos;