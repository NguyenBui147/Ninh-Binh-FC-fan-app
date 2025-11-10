

import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app-redux/features/auth/authSlice'; 
import { FirebaseAuthTypes } from '@react-native-firebase/auth'; 


import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';

type RootState = {
  auth: {
    user: FirebaseAuthTypes.User | null;
    isAuthReady: boolean;
    loading: boolean;
  };
};


const auth = getAuth();

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    
    // 3. Dùng hàm onAuthStateChanged(auth, ...) (cú pháp mới)
    const subscriber = onAuthStateChanged(auth, (firebaseUser) => {
      
      console.log('Auth state changed, user: ', firebaseUser?.uid || 'logged out');
      dispatch(setUser(firebaseUser));
    });

    return subscriber; // cleanup on unmount
  }, [dispatch]);

  return {
    user: user,
    isLoading: loading,
  };
};