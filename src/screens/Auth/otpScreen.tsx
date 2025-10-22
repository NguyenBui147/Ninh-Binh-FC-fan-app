import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import { useDispatch } from 'react-redux';
import {setUser} from '../../app-redux/features/auth/authSlice'
import OTPInputField from '../../components/input/otpInput';
import RoundedButton from '../../components/buttons/roundedButton';
import Colors from '../../assets/colors/colors';
import auth from '@react-native-firebase/auth';
import { OtpInput } from "react-native-otp-entry";
type OtpScreenRouteProp = AuthStackScreensProps<'Otp'>['route'];

const OtpScreen: React.FC<AuthStackScreensProps<'Otp'>> = ({ navigation }) => {
  const route = useRoute<OtpScreenRouteProp>();
  const dispatch = useDispatch();
  

  const { confirmationResult } = route.params;

  const [code, setCode] = useState(''); 
  const [timer, setTimer] = useState(60); 
  const [isResendDisabled, setResendDisabled] = useState(true);


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer > 1) {
          return prevTimer - 1;
        } else {
          clearInterval(interval);
          setResendDisabled(false); 
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval); 
  }, [isResendDisabled]);

  // Hàm xác thực mã OTP
  const handleVerifyCode = async () => {
    if (code.length < 6) {
      Alert.alert("Lỗi", "Vui lòng nhập đủ 6 chữ số.");
      return;
    }
    try {
      const result = await confirmationResult.confirm(code);
      if (result) {
        const user = result.user;
        // Dispatch action để lưu thông tin user vào Redux
        dispatch(setUser({ uid: user.uid, phoneNumber: user.phoneNumber }));
        // App.tsx sẽ tự động chuyển sang màn hình Main
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Mã OTP không đúng hoặc đã hết hạn.");
    }
  };

  const handleResendCode = async () => {
    setResendDisabled(true); // Vô hiệu hóa nút gửi lại
    try {
       
        const userPhoneNumber = auth().currentUser?.phoneNumber;
        if(userPhoneNumber){
             // Gửi lại mã OTP
            const newConfirmation = await auth().signInWithPhoneNumber(userPhoneNumber);
            // Cập nhật lại confirmationResult để dùng cho lần xác thực sau
            navigation.setParams({ confirmationResult: newConfirmation });
            setTimer(60); // Reset lại timer
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Lỗi", "Không thể gửi lại mã. Vui lòng thử lại sau.");
        setResendDisabled(false);
    }
  };

  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.headlineText}>Chào mừng bạn đến với Ninh Bình FC</Text>
      <Text style={styles.subHeadlineText}>Nhập otp để tiếp tục</Text>
      <OtpInput numberOfDigits={6} onTextChange={(text) => console.log(text)} />
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
   
    container: {
        flex: 1,
        margin: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    header: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 40,
    },
    headlineText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.black,
        marginBottom: 5,
    },
    subHeadlineText: {
        fontSize: 16,
        color: Colors.gray,
        textAlign: 'center',
        marginBottom: 20,
    },
    resendContainer: {
        marginVertical: 30,
    },
    timerText: {
        fontSize: 16,
        color: Colors.gray,
    },
    resendText: {
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default OtpScreen;