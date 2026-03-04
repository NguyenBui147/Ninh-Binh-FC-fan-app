import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';

// Import Hook lấy user
import { useAuth } from '../../../hooks/useAuth';

const ProfileScreen = () => {
  // Chỉ lấy user, không cần lấy role nữa
  const { user } = useAuth();

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đồng ý", onPress: async () => await auth().signOut() }
    ]);
  };

  if (!user) return null;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        
        {/* --- HEADER ĐƠN GIẢN --- */}
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ 
                uri: user.photoURL || `https://ui-avatars.com/api/?background=random&name=${user.email}` 
              }} 
              style={styles.avatar} 
            />
          </View>
          <Text style={styles.userName}>{user.displayName || "Người hâm mộ"}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>

        {/* --- MENU --- */}
        <View style={styles.menuWrapper}>
          <MenuItem icon="account-edit-outline" text="Chỉnh sửa thông tin" onPress={() => {}} />
          <MenuItem icon="history" text="Lịch sử đơn hàng" onPress={() => {}} />
          <MenuItem icon="cog-outline" text="Cài đặt" onPress={() => {}} />
          
          <View style={styles.divider} />
          
          <MenuItem icon="logout" text="Đăng xuất" color="red" hideArrow onPress={handleLogout} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};


const MenuItem = ({ icon, text, onPress, color = '#333', hideArrow = false }) => (
  <Pressable style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuIconBg}>
        <MaterialCommunityIcons name={icon} size={22} color={color} />
    </View>
    <Text style={[styles.menuText, { color: color }]}>{text}</Text>
    {!hideArrow && <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />}
  </Pressable>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { alignItems: 'center', paddingVertical: 30, backgroundColor: '#fff', marginBottom: 15 },
  avatarContainer: { marginBottom: 15, elevation: 5, shadowColor: '#000', shadowOpacity: 0.1 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#eee' },
  userName: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 5 },
  userEmail: { fontSize: 14, color: '#666' },
  
  menuWrapper: { backgroundColor: '#fff', paddingHorizontal: 20 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, borderBottomWidth: 0.5, borderBottomColor: '#f0f0f0' },
  menuIconBg: { width: 36, height: 36, borderRadius: 8, backgroundColor: '#f5f5f5', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  menuText: { flex: 1, fontSize: 16, fontWeight: '500' },
  divider: { height: 20 },
});

export default ProfileScreen;