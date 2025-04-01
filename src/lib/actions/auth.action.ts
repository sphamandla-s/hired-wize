'use server'

import { auth, db } from "@/firebase/admin"
import { cookies } from "next/headers";

export async function signUp(params:SignUpParams) {
    const {uid, name, email} = params

    try {

        const userRecord = await db.collection('users').doc(uid).get();

        if (userRecord.exists) {
            return { success: false, message: 'User already exists. Please sign in instead.' }
        }
        await db.collection('users').doc(uid).set({
            name,
            email,
            createdAt: new Date(),
        });
        return { success: true, message: 'User created successfully!' }
        
    } catch (e : any) {
        console.error("Error signing up:", e)
        if (e.code === 'auth/email-already-in-use') {
            return { success : false, message: 'Email already in use' }
        } else if (e.code === 'auth/invalid-email') {
            return { success : false, message: 'Invalid email address' }
        }
        return { success : false, message: 'An error occurred during sign up' } 
        
    }
}

export async function setSessionCookie(idToken : string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn: 60 * 60 * 24 * 5 * 1000 });

    cookieStore.set('session', sessionCookie, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 5, 
        path: '/',
        sameSite : 'lax' 
    }
    )
}

export async function signIn(params:SignInParams) {
    const {email, idToken} = params

    try {

        const userRecord = await auth.getUserByEmail(email);
        if (!userRecord) {
            return { success: false, message: 'User not found' }
        }

        await setSessionCookie(idToken);
        return { success: true, message: 'User signed in successfully!' }

        
    } catch (e : any) {
        console.error("Error signing in:", e)
        if (e.code === 'auth/user-not-found') {
            return { success : false, message: 'User not found' }
        } else if (e.code === 'auth/wrong-password') {
            return { success : false, message: 'Wrong password' }
        }
        return { success : false, message: 'An error occurred during sign in' }
    }
}

export async function getCurrentUser() : Promise<User | null> {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
        const userRecord = await db.collection('users').doc(decodedClaims.uid).get();
        if (!userRecord.exists) {
            return null;
        }


        return {
          ...userRecord.data(),
          id : userRecord.id,
        } as User;
        
    } catch (e : any) {
        console.error("Error getting current user:", e)
        return null;
    }
}

export async function isAuthenticated(){
    const user = await getCurrentUser();
    return !!user;
}