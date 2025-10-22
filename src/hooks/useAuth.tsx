import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app-redux/features/auth/authSlice'; // Đảm bảo đường dẫn đúng
import { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Import kiểu User


import auth from '@react-native-firebase/auth';


type RootState = {
  auth: {
    user: FirebaseAuthTypes.User | null;
    isAuthReady: boolean; 
    loading: boolean;
  };
};

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    
    const subscriber = auth().onAuthStateChanged((firebaseUser) => {
      
      dispatch(setUser(firebaseUser));
    });
    return subscriber;
  }, [dispatch]); 
  return {
    user: user, 
    isLoading: loading 
  };
};