'use client'

import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from "../firebaseconfig";
import styles from './SignUp.module.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('AI Developer');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Store additional user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email,
        role: role,
        createdAt: new Date()
      });

      console.log('User signed up successfully');
      // Redirect to dashboard or home page
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSignUp} className={styles.form}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className={styles.input}
        />
        <select 
          value={role} 
          onChange={(e) => setRole(e.target.value)}
          className={styles.select}
        >
          <option value="AI Developer">AI Developer</option>
          <option value="AI Business Admin">AI Business Admin</option>
        </select>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;