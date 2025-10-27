import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import React, { useState, Fragment } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
//paper
import { ActivityIndicator, IconButton, TextInput } from 'react-native-paper';

//custom
import RoundedButton from '../../components/buttons/roundedButton';
import Colors from '../../assets/colors/colors';


import { images, icons } from '../../assets/index';
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';
import auth from '@react-native-firebase/auth';

const LoginScreen: React.FC<AuthStackScreensProps<'Login'>> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); 

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Vui lòng nhập đầy đủ email và mật khẩu');
      return;
    }
    setLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);
      console.log('Đăng nhập thành công');
    } catch (error: any) {
      let errorMsg = 'Email hoặc mật khẩu không đúng.';
      console.error('Firebase login error:', error);
      if (error.code === 'auth/invalid-email') {
        errorMsg = 'Định dạng email không hợp lệ.';
      } else if (error.code === 'auth/user-not-found') {
        errorMsg = 'Không tìm thấy người dùng với email này.';
      }
      Alert.alert('Lỗi đăng nhập', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    // Bọc trong View để căn giữa tốt hơn
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Fragment>
          <Image source={images.nbfc} style={styles.logo} resizeMode="contain" />
        </Fragment>
        <Text style={styles.headlineText}>Chào mừng bạn đến với Ninh Bình FC</Text>
        <Text style={styles.subHeadlineText}>Đăng nhập để tiếp tục</Text>

        {/* Bọc Input trong View để set width 100% */}
        <View style={styles.inputContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            mode="outlined" // Thêm mode "outlined" cho đẹp
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!passwordVisible} // Dùng state
            style={styles.input}
            mode="outlined"
            // Logic để đổi icon
            right={
              <TextInput.Icon
                icon={passwordVisible ? 'eye-off' : 'eye'}
                onPress={() => setPasswordVisible(!passwordVisible)}
              />
            }
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color={Colors.black} style={{ marginTop: 20 }} />
        ) : (
          <RoundedButton
            text="Đăng nhập"
            // backgroundImageSource={""} // Xóa prop không cần thiết
            backgroundColor={Colors.black}
            onPress={handleLogin}
          />
        )}

        <View style={styles.footer}>
          {/* Lưu ý: Để `icon="facebook"` hoạt động, 
            bạn PHẢI cài đặt react-native-vector-icons cho react-native-paper 
          */}
          <IconButton
            icon="facebook" // Dùng tên icon chuẩn
            iconColor="#1877F2" // Màu xanh của FB
            containerColor="#f0f2f5" // Màu nền xám nhạt
            size={24}
            onPress={() => console.log('Pressed FB')}
          />
          <IconButton
            icon="google" // Dùng tên icon chuẩn
            iconColor="#DB4437" // Màu đỏ của Google
            containerColor="#f0f2f5"
            size={24}
            onPress={() => console.log('Pressed Google')}
          />
        </View>

        {/* Xóa Fragment text bị lặp ở đây */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  container: {
    flex: 1,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center', // Căn giữa nội dung theo chiều dọc
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20, // Thêm margin
  },
  headlineText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 5,
    textAlign: 'center',
  },
  subHeadlineText: {
    fontSize: 16,
    color: Colors.black,
    textAlign: 'center',
    marginBottom: 30, // Tăng margin
  },
  // Thêm style cho input
  inputContainer: {
    width: '100%',
  },
  input: {
    marginBottom: 15, // Khoảng cách giữa 2 input
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center', // Căn giữa 2 icon
    alignItems: 'center',
    marginTop: 30, // Đẩy phần footer xuống
    width: '100%',
    // Đã xóa các style cũ: flex, margin, padding, backgroundColor
  },
  // Xóa style "header" không dùng
});

export default LoginScreen;