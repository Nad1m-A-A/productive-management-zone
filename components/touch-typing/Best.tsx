import { db } from '../../pages/api/firebase';
import { ref, onValue } from 'firebase/database';

import { useEffect } from "react";

import { useAppSelector } from "../../redux/app-store/store";
import { typingActions } from '../../redux/features/touch-typing/TouchTypingSlice';
import { useDispatch } from 'react-redux';
import classes from '../../styles/Main.module.css';

function Best() {
    const dispatch = useDispatch();
    const userId = useAppSelector((state) => state.user.id);
    const cloudSpeed = useAppSelector(state => state.typing.cloudSpeed);
    const bestLoading = useAppSelector(state => state.typing.bestLoading);
    const show = cloudSpeed > 0;

    // GET THE BEST SPEED
    useEffect(() => {
        dispatch(typingActions.setBestLoading(true));
        const typingRefrence = ref(db, 'usersData/' + userId + '/touchSpeed');
        onValue(typingRefrence,  (snapshot) => {
            const best = snapshot.val();
            if(best === null) {
                return;
            };
            dispatch(typingActions.setCloudSpeed(best));
            dispatch(typingActions.setBestLoading(false));
        });
    },[userId, dispatch]);

    return (
        <span>
            { show && <p className={classes.best}>Your Best: <span className={classes.data}>{cloudSpeed}WPM</span></p>}
            {bestLoading && userId &&  <span className={classes.loader}></span>}
        </span>
    )
}

export default Best;