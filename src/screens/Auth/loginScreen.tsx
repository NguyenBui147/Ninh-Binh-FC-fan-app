import { StyleSheet, Text, View, Alert } from 'react-native';
import React ,{useState}from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator } from 'react-native-paper';
import RoundedButton from '../../components/buttons/roundedButton';
import PhoneInput from '../../components/input/phoneInput';
import Colors from '../../assets/colors/colors';
import { images } from '../../assets/images';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import auth from '@react-native-firebase/auth';
import { Image } from 'react-native';





const LoginScreen: React.FC<AuthStackScreensProps<'Login'>> = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading , setLoading] = useState(false);

  const handleLogin = async () => {
    
    const formattedPhoneNumber = `+84${phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber}`;
    if (formattedPhoneNumber.length < 9 || formattedPhoneNumber.length >12) {
      Alert.alert('Vui lòng nhập số điện thoại hợp lệ.');
      return;
    }

    setLoading(true);

    try {
      const confirmation = await auth().signInWithPhoneNumber(formattedPhoneNumber);
      navigation.navigate('Otp', { confirmationResult: confirmation });
    } catch (error) {
      
      console.error('Firebase login error:', error);
      Alert.alert('Lỗi đăng nhập', error.message || 'Vui lòng thử lại.');
    }finally{
      setLoading(false);
    }
  };

return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={images.nbfclogo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.headlineText}>Chào mừng bạn đến với Ninh Bình FC</Text>
        <Text style={styles.subHeadlineText}>Đăng nhập để tiếp tục</Text>
      </View>

      <PhoneInput
        placeholder="Nhập số điện thoại"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors.black} style={{ marginTop: 20 }} />
      ) : (
        <RoundedButton
          text="Đăng nhập"
          backgroundColor={Colors.black}
          onPress={handleLogin}
        />
      )}
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
    margin: 20,
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
  },
  logo: {
    width:50,
    height:50,
    resizeMode:"contain"
  }
});

export default LoginScreen;
