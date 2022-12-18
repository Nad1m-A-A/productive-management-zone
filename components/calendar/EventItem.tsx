import { db } from '../../pages/api/firebase';
import { ref, set } from 'firebase/database';
import { useAppSelector } from '../../redux/app-store/store';
import Button from "../layout/Button";
import { CiCircleRemove } from 'react-icons/ci';

import classes from '../../styles/Main.module.css';

type EventProps = {
  event: {
      id: string;
      title: string;
      date: string;
  }
}

function EventItem({event} : EventProps) {
  const userId  = useAppSelector(store => store.user.id);
  const {eventsList} = useAppSelector(store => store.events);
  const listReference = ref(db, 'usersData/' + userId + '/events');

    // DELETE AN EVENT
    const deleteHandler = (e: React.MouseEvent) => {
      e.stopPropagation();
      const eventIndex = eventsList.findIndex(item => item.id === event.id);
      const newList = [...eventsList];
      newList.splice(eventIndex, 1);
      set(listReference, JSON.stringify([...newList]));
  }

  return (
    <li>
        <span className={classes.event}>Event: <span className={classes.data}> {event.title} </span></span>
        <span className={classes.due}>Due: <span className={classes.data}> {event.date} </span></span>
        <Button handleClick={deleteHandler}>
            <CiCircleRemove></CiCircleRemove>
        </Button>
    </li>
  )
}

export default EventItem;