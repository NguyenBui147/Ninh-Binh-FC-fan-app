import { Alert, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React, { useState } from 'react'


import { getAuth } from '@react-native-firebase/auth';
import Colors from '../../assets/colors/colors'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import RoundedButton from '../../components/buttons/roundedButton'
import { AuthStackScreensProps } from '../../navigation/NavigationTypes';


const RegisterScreen:React.FC<AuthStackScreensProps<'Register'>> = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [password2,setPassword2] = useState('');
  const [loading,setLoading]=useState(false)
  
  const handleRegister = async () =>{
    if ( !email || !password || !password2) return 'Vui lòng nhập thông tin đầy đủ';
    if(password != password2) return 'Vui lòng nhập đúng mật khẩu ';
    setLoading(true)
    try{
      await getAuth().createUserWithEmailAndPassword(email,password);
      Alert.alert(
        'Tạo tài khoản thành công!'
      );
    }catch(error: any){
      console.error('Firebase register error:', error);
      let errorMsg = 'Đã có lỗi xảy ra, vui lòng thử lại.';
      if (error.code === 'auth/email-already-in-use') {
        errorMsg = 'Email này đã được sử dụng.';
      } else if (error.code === 'auth/invalid-email') {
        errorMsg = 'Định dạng email không hợp lệ.';
      } else if (error.code === 'auth/weak-password') {
        errorMsg = 'Mật khẩu quá yếu (cần ít nhất 6 ký tự).';
      }
      Alert.alert('Lỗi đăng ký', errorMsg);
    } finally {
      setLoading(false); 
    }
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>      
        <Text style={styles.title}>Đăng ký </Text>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            mode="outlined"
            keyboardType="email-address"
            autoCapitalize="none"
            outlineColor={Colors.gray}      
            activeOutlineColor={Colors.gray}  
          />
          <TextInput
            placeholder="Mật khẩu"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={true}
            outlineColor={Colors.gray}      
            activeOutlineColor={Colors.gray}  
          />
          <TextInput
            placeholder="Nhập lại mật khẩu"
            value={password2}
            onChangeText={setPassword2}
            style={styles.input}
            mode="outlined"
            outlineColor={Colors.gray}      
            activeOutlineColor={Colors.gray}  
          />
        </View>
        
        {loading?(
          <ActivityIndicator size={'large'} color={Colors.black}/>
        ):(
          <RoundedButton
            text="Đăng ký"
            backgroundColor={Colors.black}
            onPress={handleRegister}
          />
        )}
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
    
  },
  container: {
    flex: 1,
    margin: 20,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center', 
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20, 
  },
  inputContainer: {
    backgroundColor:Colors.darkNavy,
    borderRadius: 8,
    padding:20,
    width: '100%',
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontFamily: 'sans-serif-condensed',
    fontWeight: '700',
    color: Colors.black,
    textAlign: 'center',
    paddingBottom: 20,
  },
  input: {
    borderColor:Colors.black,
    marginBottom: 16,
    backgroundColor: Colors.white,
  },
})