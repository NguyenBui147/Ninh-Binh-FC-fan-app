import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app-redux/features/auth/authSlice'; 
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; 
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
  const [initializing, setInitializing] = useState(true);
  function onAuthStateChanged(firebaseUser: FirebaseAuthTypes.User | null) {
    console.log('Auth state changed, user: ', firebaseUser?.uid || 'logged out');
    dispatch(setUser(firebaseUser));
    
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    user,
    isLoading: loading || initializing, // Loading khi Redux đang load HOẶC Firebase đang khởi tạo
  };
};