import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RoundedButton from '../../components/buttons/roundedButton';
import Colors from '../../assets/colors/colors'
// Đã loại bỏ import { icons } }
import { RootStackParamList } from '../../navigation/NavigationTypes';

// Khai báo kiểu props cho màn hình Login
type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'AuthStack'>;



const LoginScreen: React.FC<LoginScreenProps> = () => {
    // Không cần state cho username/password
    const navigation = useNavigation();

    // Hàm chuyển sang luồng chính (MainTabs)
    const handleLoginTest = () => {
        // Sử dụng 'as never' để báo cho TypeScript bỏ qua lỗi kiểu cho việc chuyển luồng
        navigation.navigate('Main' as never);
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer} style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headlineText}>KIỂM TRA ĐIỀU HƯỚNG</Text>
                <Text style={styles.subHeadlineText}>Chuyển sang luồng chính để test Tabs.</Text>
            </View>

            {/* Đã loại bỏ View inputGroup và CustomInput1 */}

            <View style={styles.footer}>
                <RoundedButton
                    text="Chuyển sang luồng chính"
                    backgroundColor={Colors.black}
                    onPress={handleLoginTest}
                />
            </View>
        </ScrollView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContainer: {
        flexGrow: 1, // Đảm bảo nội dung có thể phát triển
        paddingHorizontal: 20,
        paddingVertical: 40,
        justifyContent: 'space-between',
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
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
        gap: 15, // Tạo khoảng cách giữa các nút
    }
});
export default LoginScreen;
