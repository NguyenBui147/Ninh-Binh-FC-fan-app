import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  Pressable, 
  Alert, 
  ScrollView, 
  Dimensions, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

// Import hệ thống định danh và style của dự án
import Colors from '../../../assets/colors/colors';
import { resetRoot } from '../../../navigation/NavigationService';
import { useAuth } from '../../../hooks/useAuth';
import { images } from '../../../assets';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng Ninh Bình FC?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: 'destructive',
          onPress: async () => {
            try {
              await auth().signOut();           
            } catch (error) {
              console.error("Lỗi đăng xuất:", error);
              Alert.alert("Lỗi", "Không thể đăng xuất lúc này. Vui lòng thử lại!");
            }
          }
        }
      ]
    );
  };
  // Trạng thái chờ khi Firebase đang lấy dữ liệu User
  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
        <Text style={{ marginTop: 10, color: '#666' }}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 40 }} 
        showsVerticalScrollIndicator={false}
      >

        {/* --- DYNAMIC HEADER --- */}
        <View style={styles.header}>
          <SafeAreaView style={styles.safeHeaderArea}>
            <TouchableOpacity 
              onPress={() => navigation.goBack()} 
              style={styles.backButton}
            >
            <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>HỒ SƠ CỦA TÔI</Text>
            <View style={{ width: 40 }} /> 
          </SafeAreaView>
        </View>

        {/* --- PROFILE INFO SECTION --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={ 
                user.photoURL ? { uri: user.photoURL } : images.nbfc
              }
              style={styles.avatar}
              resizeMode="cover"
            />
            <View style={styles.onlineBadge} />
          </View>

          <Text style={styles.userName}>{user.displayName || "Cổ động viên NBFC"}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>

          <View style={styles.personalInfoRow}>
            <View style={styles.infoBadge}>
              <MaterialCommunityIcons name="cake-variant-outline" size={16} color="#666" />
              <Text style={styles.infoText}>24 tuổi</Text>
            </View>
            <View style={styles.infoBadge}>
              <MaterialCommunityIcons name="map-marker-outline" size={16} color="#666" />
              <Text style={styles.infoText}>Ninh Bình, VN</Text>
            </View>
          </View>
        </View>

        {/* --- USER STATISTICS (Dữ liệu mẫu cho đồ án) --- */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Trận đã xem</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>340</Text>
            <Text style={styles.statLabel}>Điểm FC</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>Bạc</Text>
            <Text style={styles.statLabel}>Hạng thẻ</Text>
          </View>
        </View>

        {/* --- INTERACTIVE MENU --- */}
        <View style={styles.menuWrapper}>
          <Text style={styles.sectionTitle}>Tài khoản</Text>
          <View style={styles.cardSection}>
            <MenuItem
              icon="account-edit-outline"
              text="Cập nhật thông tin cá nhân"
              onPress={() => navigation.navigate('EditProfileScreen' as never)}
            />
            <MenuItem
              icon="ticket-confirmation-outline"
              text="Vé của tôi"
              onPress={() => navigation.navigate('MyTicketsScreen' as never)}
            />
            <MenuItem
              icon="clipboard-list-outline"
              text="Lịch sử mua sắm"
              onPress={() => navigation.navigate('OrderHistoryScreen' as never)}
            />
          </View>

          <Text style={styles.sectionTitle}>Cài đặt & Hỗ trợ</Text>
          <View style={styles.cardSection}>
            <MenuItem
              icon="bell-ring-outline"
              text="Cài đặt thông báo"
              onPress={() => Alert.alert("Thông báo", "Tính năng đang được phát triển...")}
            />
            <MenuItem
              icon="shield-check-outline"
              text="Bảo mật tài khoản"
              onPress={() => navigation.navigate('SecurityScreen' as never)}
            />
            <MenuItem
              icon="help-circle-outline"
              text="Trung tâm trợ giúp"
              hideBorder
              onPress={() => Alert.alert("Trợ giúp", "Đang kết nối tới tổng đài hỗ trợ...")}
            />
          </View>
        </View>

        {/* --- LOGOUT BUTTON --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

// --- SUB-COMPONENT: MENU ITEM ---
interface MenuItemProps {
  icon: string;
  text: string;
  onPress: () => void;
  color?: string;
  hideArrow?: boolean;
  hideBorder?: boolean;
}

const MenuItem = ({ icon, text, onPress, color = '#333', hideArrow = false, hideBorder = false }: MenuItemProps) => (
  <Pressable 
    style={({ pressed }) => [
      styles.menuItem, 
      !hideBorder && styles.menuItemBorder,
      { backgroundColor: pressed ? '#f9f9f9' : 'transparent' }
    ]} 
    onPress={onPress}
  >
    <View style={styles.menuIconBg}>
      <MaterialCommunityIcons name={icon} size={22} color={Colors.maroon || '#721c24'} />
    </View>
    <Text style={[styles.menuText, { color }]}>{text}</Text>
    {!hideArrow && <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />}
  </Pressable>
);

// --- STYLES ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA'
  },
  header: {
  backgroundColor: Colors.primaryRed || '#d32f2f', // Màu đỏ chủ đạo
  height: 180, // Giảm chiều cao xuống một chút cho cân đối
  width: width,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  safeHeaderArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 10,
  },

  headerTitle: {
   color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  letterSpacing: 1,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -55,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 60,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    marginBottom: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0'
  },
  onlineBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#4CD964',
    borderWidth: 3,
    borderColor: '#fff',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15
  },
  personalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee'
  },
  infoText: {
    marginLeft: 6,
    fontSize: 12,
    color: '#666',
    fontWeight: '500'
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 16,
    paddingVertical: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.maroon || '#721c24',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },
  statDivider: {
    width: 1,
    height: 35,
    backgroundColor: '#f0f0f0'
  },
  menuWrapper: {
    marginTop: 20,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    marginLeft: 5,
  },
  cardSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5'
  },
  menuIconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(114, 28, 36, 0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500'
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryRed || '#d32f2f',
    marginHorizontal: 20,
    marginTop: 20,
    paddingVertical: 16,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  logoutText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 10,
  }
});

export default ProfileScreen;