import { Alert, Text, View } from 'react-native'
import React from 'react'
import RoundedButton from '../../../../components/buttons/roundedButton';
import { getAuth, signOut } from '@react-native-firebase/auth'



const auth = getAuth();


const ProfileScreen = () => {
  const handleLogout = async () =>{
    try{
      
      await signOut(auth);
      console.log('dang xuat thanh cong ')
    }catch(error){
      Alert.alert('Error' )
    }
    
  }
  return (
    <View>
      <Text>UserScreen</Text>
      <RoundedButton
        text={"logout"}
        backgroundColor='#000'
        backgroundImageSource={""}
        onPress={handleLogout}
      />
    </View>
  )
}

export default ProfileScreen

