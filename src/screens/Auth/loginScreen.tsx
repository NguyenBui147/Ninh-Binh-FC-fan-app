import React, { useState, Fragment } from 'react';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ActivityIndicator, IconButton, TextInput } from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import RoundedButton from '../../components/buttons/roundedButton';
import LinkText from '../../components/texts/linkText';
import Colors from '../../assets/colors/colors';
import { images } from '../../assets/index';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';

const LoginScreen: React.FC<AuthStackScreensProps<'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ email và mật khẩu.');
      return;
    }

    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Đăng nhập thành công');
    } catch (error: any) {
      let errorMsg = 'Email hoặc mật khẩu không đúng.';
      console.error('Firebase login error:', error);

      if (error.code === 'auth/invalid-email') errorMsg = 'Định dạng email không hợp lệ.';
      else if (error.code === 'auth/user-not-found') errorMsg = 'Không tìm thấy người dùng với email này.';

      Alert.alert('Lỗi đăng nhập', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => navigation.navigate('Register');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Fragment>
          <Image source={images.nbfc} style={styles.logo} resizeMode="contain" />
        </Fragment>

        <Text style={styles.title}>Chào mừng bạn đến với Ninh Bình FC</Text>
        

        <View style={styles.inputContainer}>
          <TextInput
            
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            
          />
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!passwordVisible}
            style={styles.input}
            mode="outlined"
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} />
        ) : (
          <RoundedButton
            text="Đăng nhập"
            backgroundImageSource=""
            backgroundColor={Colors.black}
            onPress={handleLogin}
          />
        )}

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>Bạn chưa có tài khoản? </Text>
          <LinkText text="Đăng ký ngay" onPress={handleRegister} />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>Hoặc đăng nhập bằng</Text>
          <View style={styles.socialContainer}>
            <IconButton
              icon="facebook"
              iconColor={Colors.blue}
              containerColor={Colors.gray}
              size={28}
              onPress={() => console.log('Facebook login')}
            />
            <IconButton
              icon="google"
              iconColor={Colors.primaryRed}
              containerColor={Colors.gray}
              size={28}
              onPress={() => console.log('Google login')}
            />
            <IconButton
              icon="phone"
              iconColor={Colors.green}
              containerColor={Colors.gray}
              size={28}
              onPress={() => console.log('Phone login')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.gradient2,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    paddingBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor:Colors.white,
    padding:20,
    width: '100%',
    marginBottom: 24,
  },
  input: {
    borderColor:Colors.black,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  registerText: {
    color: Colors.black,
    fontSize: 14,
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerTitle: {
    fontSize: 14,
    color: Colors.gray,
    marginBottom: 12,
  },
  socialContainer: {
    flexDirection: 'row',
    gap: 12,
  },
});
