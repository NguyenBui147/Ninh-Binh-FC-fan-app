
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  PhoneAuthProvider,
  GoogleAuthProvider,
  signInWithCredential, 
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { RecaptchaVerifier } from 'firebase/auth/web-extension';
import { useEffect, useState } from 'react';
import { OtpInput } from 'react-native-otp-entry';
import { Alert } from 'react-native';


export const sendPhoneOtp = async (phoneNumber, recaptchaVerifier) => {
    try {
        const phoneProvider = new PhoneAuthProvider(auth);
        const verificationId = await phoneProvider.verifyPhoneNumber(
            phoneNumber,
            recaptchaVerifier
        );
        return verificationId;
    }
    catch (error) {
        return { error: error.message };
    }
}
//vertificationId= id nhan dc tu OTP, verificationCode= otp nhap vao
export const confirmPhoneOTP = async (verificationId, verificationCode) => {
    try{
        const credential = PhoneAuthProvider.credential(
            verificationId,
            verificationCode
        );
        const userCredential = await signInWithCredential(auth, credential);
        return userCredential;

    }
    catch (error) {
        return { error: error.message };
    }
}


//logout
export const logoutUser= async () => {
    try {
        await signOut(auth);
        return { success: true };
    }
    catch (error) {
        return { error: error.message };
    }
}


//higher credential 
export const signUpWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return userCredential;
    }
    catch (error) {
        return { error: error.message };
    }
}


export const signInWithEmailPassword = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    }
    catch (error) {
        return { error: error.message };
    }
}

//reset password
export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true };
    }
    catch (error) {
        return { error: error.message };
    }
}

export const resetPasswordOtp = async (OtpInput)=>{
    try {
        await sendPhoneOtp(auth , OtpInput);
        return {success:true}


    }catch(error){
        Alert.alert(error)
    }
}