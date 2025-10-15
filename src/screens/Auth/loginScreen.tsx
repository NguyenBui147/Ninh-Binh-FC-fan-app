import { StyleSheet,Text, View, ScrollView, Alert } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RoundedButton from '../../components/buttons/roundedButton';
import Colors from '../../assets/colors/colors'
import PhoneInput from '../../components/input/phoneInput';
import { icons } from '../../assets/icons';
import {images } from '../../assets/images';
 


// Đã loại bỏ import { icons } }
import { RootStackParamList } from '../../navigation/NavigationTypes';
import { auth , signInWithPhoneNumber } from '../../firebase/firebase';
import { SafeAreaView } from 'react-native-safe-area-context';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;



const LoginScreen: React.FC<LoginScreenProps> = () => {
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [confirmation, setConfirmation] = React.useState<any>(null);
    
    const navigation = useNavigation();

    const handleLogin = async () => {
        const formattedPhoneNumber = `+84${phoneNumber.startsWith('0') ? phoneNumber.substring(1) : phoneNumber}`;
        if (formattedPhoneNumber.length < 12) {
            Alert.alert('Vui lòng nhập số điện thoại hợp lệ.');
            return;
        }
        try {
            const confirmation = await signInWithPhoneNumber(auth, formattedPhoneNumber);
            setConfirmation(confirmation);
            navigation.navigate('Otp', { confirmation });
            
        } catch (error) {
            console.error('Error during phone auth:', error);
            Alert.alert('Đã xảy ra lỗi. Vui lòng thử lại.');
        }
    }

    return (
        <SafeAreaView>
        <View style={styles.container}>
            <View style={styles.header}>
                <images.nbfclogo style={{ width: 100, height: 100, resizeMode: 'contain', marginBottom: 20 }} />
                <Text style={styles.headlineText}>Chào mừng bạn đến với Ninh Bình FC</Text>
                <Text style={styles.subHeadlineText}>Đăng nhập để tiếp tục</Text>
            </View>
            
            <PhoneInput
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Nhập số điện thoại"
            />

            <RoundedButton
                text="Đăng nhập"
                backgroundColor={Colors.black}
                onPress={handleLogin}
            />

        </View>
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
    scrollContainer: {
        flexGrow: 1, 
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'space-between',
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
    },
    footer: {
        marginTop: 40,
        width: '100%',
        gap: 15, 
    }
});
export default LoginScreen;
