import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app-redux/features/auth/authSlice'; 
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; 

type RootState = {
  auth: {
    user: any; // Hoặc định nghĩa type chi tiết hơn nếu cần
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
    
    // ĐÂY LÀ CHÌA KHÓA: Bóc tách thành Plain Object ngay tại đây
    if (firebaseUser) {
      const userPayload = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.displayName,
        photoURL: firebaseUser.photoURL,
      };
      dispatch(setUser(userPayload));
    } else {
      dispatch(setUser(null));
    }

    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    user,
    isLoading: loading || initializing, 
  };
};