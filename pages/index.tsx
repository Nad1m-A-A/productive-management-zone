import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, db } from './api/firebase';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAppSelector } from '../redux/app-store/store';

import classes from '../styles/Main.module.css';
import Input from '../components/layout/Input';
import Button from '../components/layout/Button';

function Register() {
  const emailRef = useRef(null!);
  const psRef = useRef(null!);
  const [error, setError] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const router = useRouter();

  const { id: userId } = useAppSelector(state => state.user);

  useEffect(() => {
    if(typeof window !== "undefined" && userId) {
      function preventBack() {
        window.history.forward(); 
      }
      setTimeout(preventBack(), 0);
      window.onunload = function () { null };
  }
  },[registerPassword, userId])

  const register = async () => {
    setError('');
    try {
      if(registerEmail.trim().length === 0) {
        emailRef.current.focus();
        throw new Error("Email can't be empty!");
      }
      if(registerPassword.length === 0) {
        psRef.current.focus();
        throw new Error('Password is required!');
      }
      if(!registerEmail.endsWith('@pmz.com')) {
        emailRef.current.focus();
        throw new Error('Email should end with *@pmz.com*');
      }
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      setUserData();
      router.replace('/home');
    } catch (error) {
        setError(error.message);
    }
}

const setUserData = () => {
  onAuthStateChanged(auth, (currentUser) => {
      if(!currentUser) return;
      const reference = ref(db, 'usersData/' + currentUser?.uid);
      set(reference, {
          toDos: JSON.stringify([]),
          events: JSON.stringify([]),
          questions: JSON.stringify([]),
          touchSpeed: 0,
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
  });
}

  return (
      <div className={classes.register}>
        <div className={classes.pre_register}>
          <h2>What does this app offer?</h2>
          <ul>
            <li>A list for your tasks.</li>
            <li>A space to manage your events.</li>
            <li>A typing test to improve your speed.</li>
            <li>A quiz on multiple topics to expand your knowledge.</li>
          </ul>
        </div>

        <div className={classes.register_form}>
          <div className={classes.register_inputs}>
            <Input ref={emailRef} type='email' placeholder='example@pmz.com' changeHandler={(e) => setRegisterEmail(e.target.value)}/>
            <Input ref={psRef} type='password' placeholder='password (min *6*)' changeHandler={(e) => setRegisterPassword(e.target.value)}/>
          </div>
          {error && <span className={classes.email_error}>{error}</span>}
          <Button handleClick={register}>Register Now...</Button>
          <h3>Already a member? <Link href='/login'>Login</Link></h3>
        </div>

        <div className={classes.top_left}></div>
        <div className={classes.top_right}></div>
        <div className={classes.bottom_left}></div>
        <div className={classes.bottom_right}></div>
      </div>
  )
}

export default Register;