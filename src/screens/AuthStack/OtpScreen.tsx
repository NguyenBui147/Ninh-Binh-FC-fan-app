import { StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native';
import React, { useState, useEffect,FC } from 'react';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import Colors from '../../assets/colors/colors';
import { OtpInput } from "react-native-otp-entry";
import { useOtpVerification } from '../../hooks/useOtpVerification';


type OtpScreenRouteProp = AuthStackScreensProps<'Otp'>['route'];

const OtpScreen: FC<AuthStackScreensProps<'Otp'>> = ({ navigation }) => {
  const route = useRoute<OtpScreenRouteProp>();
  const { confirmationResult } = route.params || { confirmationResult: null };

  const {
    code,setCode,
    timer,setTimer,
    sResendDisabled, setResendDisabled,
    isLoading, setIsLoading
  } = useOtpVerification({confirmation: confirmationResult})
  return (
    
    <SafeAreaView style={styles.container}>
      <Text style={styles.headlineText}>Chào mừng bạn đến với Ninh Bình FC</Text>
      <Text style={styles.subHeadlineText}>Nhập otp để tiếp tục</Text>
      <OtpInput numberOfDigits={6} onTextChange={setCode} />
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