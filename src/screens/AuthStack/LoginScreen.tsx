import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Alert, 
  Image, 
  KeyboardAvoidingView, 
  Platform, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, IconButton, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth'; 

import Colors from '../../assets/colors/colors';
import { images } from '../../assets/index';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import { Buttons } from '../../components';

const LoginScreen: React.FC<AuthStackScreensProps<'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      
      console.log('Đăng nhập thành công!');
    } catch (error: any) {
      console.error('Lỗi đăng nhập:', error);
      let errorMsg = 'Email hoặc mật khẩu không đúng.';
      if (error.code === 'auth/invalid-email') errorMsg = 'Định dạng email không hợp lệ.';
      else if (error.code === 'auth/user-not-found') errorMsg = 'Tài khoản không tồn tại.';
      else if (error.code === 'auth/wrong-password') errorMsg = 'Mật khẩu không chính xác.';
      else if (error.code === 'auth/too-many-requests') errorMsg = 'Đăng nhập thất bại quá nhiều lần. Vui lòng thử lại sau.';

      Alert.alert('Đăng nhập thất bại', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.container}>
            
            <View style={styles.header}>
              <Image source={images.nbfc} style={styles.headerLogo} resizeMode="contain" />
              <Text style={styles.title}>Chào mừng bạn đến với Ninh Bình FC</Text>
            </View>
            
            <View style={styles.inputContainer}>
              <TextInput
                label="Email" 
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                outlineColor={Colors.black}      
                activeOutlineColor={Colors.primaryRed} 
                theme={{ colors: { background: Colors.white } }}
              />
              <TextInput
                label="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
                style={styles.input}
                mode="outlined"
                outlineColor={Colors.black}      
                activeOutlineColor={Colors.primaryRed}
                theme={{ colors: { background: Colors.white } }}
                right={
                  <TextInput.Icon
                    icon={passwordVisible ? 'eye-off' : 'eye'}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                }
              />
            </View>

            {loading ? (
              <ActivityIndicator size="large" color={Colors.primaryRed} style={{ marginVertical: 20 }} />
            ) : (
              <View style={styles.buttonContainer}>
                <View style={{ flex: 1, marginRight: 10 }}>
                   <Buttons.Button2
                    text="Đăng nhập"
                    color={Colors.white}
                    backgroundColor={Colors.maroon}
                    onPress={handleLogin}
                  />
                </View>
                <View style={{  flex: 1, marginRight: 10}}>
                  <Buttons.Button2
                    text="Đăng ký"
                    color={Colors.white}
                    backgroundColor={Colors.black} 
                    onPress={handleRegister}
                  />
                </View>
              </View>
            )}

            <View style={styles.footer}>
              <Text style={styles.footerTitle}>Hoặc đăng nhập bằng</Text>
              <View style={styles.socialContainer}>
                <IconButton
                  icon="facebook"
                  iconColor="#1877F2" // Màu chuẩn Facebook
                  containerColor="#e7f3ff"
                  size={28}
                  onPress={() => console.log('Facebook login')}
                />
                <IconButton
                  icon="google"
                  iconColor="#DB4437" // Màu chuẩn Google
                  containerColor="#fce8e6"
                  size={28}
                  onPress={() => console.log('Google login')}
                />
                <IconButton
                  icon="phone"
                  iconColor="#34A853" 
                  containerColor="#e8f5e9"
                  size={28}
                  onPress={() => console.log('Phone login')}
                />
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center', 
  },
  header:{
    marginBottom: 30,
    alignItems: 'center',
  },
  headerLogo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28, 
    fontWeight: 'bold',
    color: Colors.black, 
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  buttonContainer:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 14,
    color: Colors.black,
    marginBottom: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});