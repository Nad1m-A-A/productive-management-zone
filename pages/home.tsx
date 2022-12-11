import { auth } from './api/firebase';
import { onAuthStateChanged, signOut} from 'firebase/auth';

import { useEffect, useState } from 'react';
import { useRouter } from "next/router";
import Head from 'next/head';

import classes from '../styles/Main.module.css';
import { BsDoorClosed, BsDoorOpen } from 'react-icons/bs';
import { RiSunLine } from 'react-icons/ri';
import { RxMoon } from 'react-icons/rx';

import Main from '../components/Main';

import { userActions } from '../redux/features/user/userSlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../redux/app-store/store';
import Button from '../components/layout/Button';

function Home() {
    const [logoutIcon, setLogoutIcon] = useState(<BsDoorClosed></BsDoorClosed>);
    const [themeIcon, setThemeIcon] = useState(<RxMoon></RxMoon>);
    const [theme, setTheme] = useState('');

    const router = useRouter();
    const dispatch = useDispatch();
    // const userEmail = useAppSelector(state => state.user.email);

    // TOGGLE LOGOUT ICON
    const logoutHoverOn = () => {
        setLogoutIcon(<BsDoorOpen></BsDoorOpen>);
    }
    const logoutHoverOff = () => {
        setLogoutIcon(<BsDoorClosed></BsDoorClosed>);
    }

    // TOGGLE THEME
    const toggleTheme = () => {
        if(theme === ''){
            setTheme('dark');
            setThemeIcon(<RiSunLine></RiSunLine>)
        }
        else {
            setTheme('');
            setThemeIcon(<RxMoon></RxMoon>)
        }
    }

    // AQUAINT USER
    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            dispatch(userActions.acquaint({id: currentUser?.uid, email: currentUser?.email}));
            if(currentUser === null) router.replace('/login');
            
        })
    },[dispatch, router])

    // LOGOUT
    const logOut = async () => {
        setTimeout(() => {
            router.replace('/login');
            signOut(auth);
        },500)
    }

    return (
        <div className={classes.home} data-theme={theme}>
            <Main/>
            <Head>
                <title>Productivity Managment Zone</title>
            </Head>
            <Button handleClick={logOut} handleMouseEnter={logoutHoverOn} handleMouseLeave={logoutHoverOff} className={classes.logout_btn}>
                {logoutIcon}
            </Button>
            <Button handleClick={toggleTheme}className={classes.theme_btn}>
                {themeIcon}
            </Button>
        </div>
    )
};

export default Home;