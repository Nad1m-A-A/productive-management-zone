import EventItem from './EventItem';
import classes from '../../styles/Main.module.css';
import { useAppSelector } from '../../redux/app-store/store';

type EventType = {
    id: string;
    title: string;
    date: string;
}

    type EventsProps = {
    eventsList: EventType[];
}

function EventsList({eventsList}: EventsProps) {
    const eventsLoading = useAppSelector(state => state.events.eventsLoading);
    const userId = useAppSelector(state => state.user.id);

    return (
        <ul>
            {eventsLoading && userId &&  <span className={classes.loader}></span>}
            {eventsList.length !== 0 && eventsList?.map((item : {id : string, title : string, date : string}, index : number) => 
                <EventItem event={item} key={index}/>)}
            {eventsList.length === 0 && !eventsLoading && <span className={classes.no_data}>You have 0 events</span>}
        </ul>
    )
}

export default EventsList;