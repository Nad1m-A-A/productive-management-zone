import { useRef, useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './api/firebase';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAppSelector } from '../redux/app-store/store';
import Link from 'next/link';

import classes from '../styles/Main.module.css';
import Input from '../components/layout/Input';
import Button from '../components/layout/Button';

function Login() {
    const { id: userId } = useAppSelector(state => state.user);
    const psRef = useRef();
    const emailRef = useRef();
    const [error, setError] = useState('');
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const router = useRouter();
    const logIn = async () => {
        setError('');
        try {
            if(loginEmail.trim().length === 0) {
                emailRef.current.focus();
                throw new Error("Please enter your email address...");
            }
            if(loginPassword.length === 0) {
                psRef.current.focus();
                throw new Error('Password is required!');
            }
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            router.replace('/home');
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        if(typeof window !== "undefined" && userId) {
            function preventBack() {
                window.history.forward(); 
            }
            setTimeout(preventBack(), 0);
            window.onunload = function () { null };
        }
    },[userId])

    return (
        <div className={classes.login}>
            <h2>Welcome To Your Productive Zone</h2>
            <div className={classes.login_form}>
                <h3>Login To Your Account</h3>
                <div className={classes.auth_inputs}>
                <Input ref={emailRef} type='email' placeholder='email' changeHandler={(e) => setLoginEmail(e.target.value)}/>
                <Input ref={psRef} type='password' placeholder='password' changeHandler={(e) => setLoginPassword(e.target.value)}/>
                </div>
                {error && <span className={classes.email_error}>{error}</span>}
                <Button handleClick={logIn}>Login</Button>
                <p>Not A Member? <Link href='/'>Register</Link></p>
            </div>

                <div className={classes.top_left}></div>
                <div className={classes.top_right}></div>
                <div className={classes.bottom_left}></div>
                <div className={classes.bottom_right}></div>
        </div>
    )
}

export default Login;