import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth'; // Sẽ dùng cho Firebase Auth thực tế


export const useAuth = () => {
  // Trạng thái: True nếu người dùng đã đăng nhập
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  // Trạng thái: True khi đang kiểm tra token/phiên đăng nhập
  const [isLoading, setIsLoading] = useState(true);

  // Hàm lắng nghe trạng thái Firebase
  useEffect(() => {
    // Đăng ký listener lắng nghe sự thay đổi trạng thái xác thực
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
      
      
      if (isLoading) {
        setIsLoading(false);
      }
    });

    // Dọn dẹp listener khi component bị unmount
    return subscriber; 
  });

 

  return { isAuthenticated, isLoading };
};
