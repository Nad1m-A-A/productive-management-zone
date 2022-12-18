import { onValue, ref, set } from 'firebase/database';
import { db } from '../../pages/api/firebase';

import { useEffect, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { evetnsActions } from '../../redux/features/events/eventsSlice';
import { useAppSelector } from '../../redux/app-store/store';

import EventsList from './EventsList';
import Input from '../layout/Input';
import Button from '../layout/Button';
import classes from '../../styles/Main.module.css';

function Calender() {
    const dateInputRef = useRef<HTMLInputElement>(null!);
    const titleInputRef = useRef<HTMLInputElement>(null!);
    const minDate = new Date().toISOString().split('T')[0];

    const dispatch = useDispatch();
    const {eventsList} = useAppSelector(state => state.events);
    const userId = useAppSelector(state => state.user.id);
    const eventsReference = ref(db, 'usersData/' + userId + '/events');

    // GET THE EVENTS
    useEffect(() => {
        const eventsReference = ref(db, 'usersData/' + userId + '/events');
        dispatch(evetnsActions.setLoading(true));
        onValue(eventsReference,  (snapshot) => {
            const data = snapshot.val();
            if(data === null){
                dispatch(evetnsActions.setLoading(false));
                return;
            }
            const parsedData = JSON.parse(data);
            dispatch(evetnsActions.initializeEvents(parsedData));
            dispatch(evetnsActions.setLoading(false));
        });
    },[dispatch, userId])

    // ADD AN EVENT
    const changeHandler = () => {
        const dateValue = dateInputRef.current.value;
        const titleValue = titleInputRef.current.value;
        if(dateValue.trim().length === 0 || titleValue.trim().length === 0) return;

        const event = {
            id: Math.random().toString(16).slice(2),
            date: dateValue,
            title: titleValue,
        };
        set(eventsReference, JSON.stringify([...eventsList,event]));

        dateInputRef.current.value = '';
        titleInputRef.current.value = '';
    }


    return (
        <div className={classes.section + ' ' + classes.calender_section}>
            <EventsList eventsList={eventsList}/>
            <div className={classes.controls}>
                    <div>
                        <span className={classes.input_title}>Event: </span>
                        <Input
                        ref={titleInputRef}
                        type='text'
                        />
                    </div>
                    <div>
                        <span className={classes.input_title}>Date: </span>
                        <Input
                        ref={dateInputRef}
                        type='date'
                        min={minDate}
                        />
                    </div>
                    <Button handleClick={changeHandler} content="Add"/>
            </div>
        </div>
    )
}

export default Calender;
