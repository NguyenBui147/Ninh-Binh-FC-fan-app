import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../app-redux/features/auth/authSlice'; 
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'; // Sửa import
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
  
  // State nội bộ để biết khi nào firebase khởi tạo xong (initializing)
  const [initializing, setInitializing] = useState(true);

  // Xử lý khi trạng thái thay đổi (Đăng nhập/Đăng xuất)
  function onAuthStateChanged(firebaseUser: FirebaseAuthTypes.User | null) {
    console.log('Auth state changed, user: ', firebaseUser?.uid || 'logged out');
    
    // Đẩy user vào Redux
    // Lưu ý: Redux không nên lưu object phức tạp, nhưng với Firebase User thì tạm chấp nhận
    // Tốt nhất là chỉ lưu { uid, email, displayName } vào Redux
    dispatch(setUser(firebaseUser));
    
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    // auth() là cách gọi đúng của thư viện @react-native-firebase
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    
    return subscriber; // unsubscribe on unmount
  }, []);

  return {
    user,
    isLoading: loading || initializing, // Loading khi Redux đang load HOẶC Firebase đang khởi tạo
  };
};