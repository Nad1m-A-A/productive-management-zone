import { ref, set } from 'firebase/database';
import { db } from '../../pages/api/firebase';

import React, { useRef, useState } from 'react';

import { useAppSelector } from '../../redux/app-store/store';

import classes from '../../styles/Main.module.css';

import Button from '../layout/Button';
import Input from '../layout/Input';
import {CiEdit, CiEraser} from 'react-icons/ci';


type ToDoProps = {
    task: {
        id: string;
        active: boolean;
        content: string;
    };
    index: number;
}

function ToDo({task, index} : ToDoProps) {
    const {todoList} = useAppSelector(state => state.todo);
    const userId = useAppSelector(state => state.user.id);
    const listReference = ref(db, 'usersData/' + userId + '/toDos');

    const [updatingState, setUpdatingState] = useState<boolean>(false);
    const [updatingId, setUpdatingId] = useState<string>('');
    const updatingRef = useRef<HTMLInputElement>(null!);

    // MARK A TO DO AS FINISHED/UNFINISHED
    const toggleComplete = () => {
        const targetTaskIndex = todoList.findIndex(item => item.id === task.id);
        const targetTask = {...todoList[targetTaskIndex]};
        targetTask.active = !task.active;
        const newList = [...todoList];
        newList.splice(targetTaskIndex, 1, targetTask);
        set(listReference, JSON.stringify([...newList]));
    }

    // DELETE A TO DO
    const deleteHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        const taskIndex = todoList.findIndex(item => item.id === task.id);
        const newList = [...todoList];
        newList.splice(taskIndex, 1);
        set(listReference, JSON.stringify([...newList]));
    }

    // SET UPDATING A TO DO
    const updateHandler = (e: React.MouseEvent) => {
        e.stopPropagation();
        setUpdatingId(task.id);
        setUpdatingState(prev => !prev);
    }

    // SUBMIT UPDATED TO DO
    const submitUpdateHandler = () => {
        const taskToUpdateIndex = todoList.findIndex(task => task.id === updatingId)
        const task = {...todoList[taskToUpdateIndex]};
        task.content = updatingRef.current.value;
        const newList = [...todoList];
        newList.splice(taskToUpdateIndex, 1, task);
        set(listReference, JSON.stringify([...newList]));
        setUpdatingState(prev => !prev);
    }

    const order = index + 1 + ' - '

    return (
        !updatingState ? <li onClick={toggleComplete} id={task.id} className={task.active? '' : classes.finished}>
            {order + task.content}
            <span>
                <Button handleClick={deleteHandler}><CiEraser></CiEraser></Button>
                <Button handleClick={updateHandler}><CiEdit></CiEdit></Button>
            </span>
        </li> :
            <li className={classes.update_item}>
                <Input autoFocus={true} ref={updatingRef} placeholder={'updating (' + todoList.filter(item => item.id === updatingId)[0].content + ')'} defaultValue={todoList.filter(item => item.id === updatingId)[0].content}/>
                <Button handleClick={submitUpdateHandler} content='Submit'/>
            </li>
    )
}
export default ToDo;