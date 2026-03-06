import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    ActivityIndicator
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../app-redux/features/auth/authSlice';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/colors/colors';
import { useAuth } from '../../../hooks/useAuth';


const EditProfileScreen = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    // Load existing values into state, or empty if null
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        if (!displayName.trim()) {
            Alert.alert('Lỗi', 'Tên hiển thị không được để trống.');
            return;
        }

        setIsSaving(true);
        try {
            const currentUser = auth().currentUser;
            if (currentUser) {
                await currentUser.updateProfile({
                    displayName: displayName.trim(),
                    photoURL: photoURL.trim() || null,
                });
                const userPayload = {
                    uid: currentUser.uid,
                    email: currentUser.email,
                    displayName: displayName.trim(),
                    photoURL: photoURL.trim() || null, 
                };
                dispatch(setUser(userPayload));

                Alert.alert('Thành công', 'Cập nhật thông tin thành công!', [
                    { text: 'OK', onPress: () => navigation.goBack() }
                ]);
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật hồ sơ:', error);
            Alert.alert('Lỗi', 'Không thể cập nhật hồ sơ. Vui lòng thử lại.');
        } finally {
            setIsSaving(false);
        }
    };
    return (
        <SafeAreaView style={styles.safeArea}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#1a1a1a" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Chỉnh sửa Hồ sơ</Text>
                <View style={{ width: 40 }} />

            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={styles.scrollContainer}>

                    {/* Info Banner */}
                    <View style={styles.infoBanner}>
                        <MaterialCommunityIcons name="information-outline" size={20} color={Colors.maroon || '#721c24'} />
                        <Text style={styles.infoText}>Cập nhật tên và ảnh đại diện để mọi người dễ dàng nhận ra bạn.</Text>
                    </View>

                    {/* Form Fields */}
                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Tên hiển thị</Text>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="account-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={displayName}
                                onChangeText={setDisplayName}
                                placeholder="Nhập tên của bạn"
                                placeholderTextColor="#999"
                                autoCapitalize="words"
                            />
                        </View>
                    </View>

                    <View style={styles.formGroup}>
                        <Text style={styles.label}>Đường dẫn Ảnh đại diện (URL)</Text>
                        <View style={styles.inputContainer}>
                            <MaterialCommunityIcons name="image-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={photoURL}
                                onChangeText={setPhotoURL}
                                placeholder="https://example.com/photo.jpg"
                                placeholderTextColor="#999"
                                keyboardType="url"
                                autoCapitalize="none"
                            />
                        </View>
                    </View>

                    {/* Read-only email field for context */}
                    <View style={[styles.formGroup, { opacity: 0.6 }]}>
                        <Text style={styles.label}>Email (Không thể thay đổi)</Text>
                        <View style={[styles.inputContainer, { backgroundColor: '#f0f0f0' }]}>
                            <MaterialCommunityIcons name="email-outline" size={20} color="#666" style={styles.inputIcon} />
                            <TextInput
                                style={styles.input}
                                value={user?.email || ''}
                                editable={false}
                            />
                        </View>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>

            {/* Footer / Save Button */}
            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                    onPress={handleSave}
                    disabled={isSaving}
                >
                    {isSaving ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <>
                            <MaterialCommunityIcons name="content-save-outline" size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>LƯU THAY ĐỔI</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1a1a1a',
    },
    scrollContainer: {
        padding: 20,
    },
    infoBanner: {
        flexDirection: 'row',
        backgroundColor: 'rgba(114, 28, 36, 0.05)',
        padding: 15,
        borderRadius: 8,
        marginBottom: 25,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 10,
        fontSize: 13,
        color: Colors.maroon || '#721c24',
        lineHeight: 20,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fafafa',
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        height: 50,
        fontSize: 15,
        color: '#333',
    },
    footer: {
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    saveButton: {
        backgroundColor: Colors.maroon || '#721c24',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 52,
        borderRadius: 12,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    saveButtonDisabled: {
        opacity: 0.7,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: 8,
    },
});

export default EditProfileScreen;
