import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../../assets/colors/colors';
import { resetRoot } from '../../../navigation/NavigationService';

// Import Hook lấy user
import { useAuth } from '../../../hooks/useAuth';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const { user } = useAuth();
  const navigation = useNavigation();

  const handleLogout = () => {
    Alert.alert(
      "Đăng xuất",
      "Bạn có chắc chắn muốn đăng xuất khỏi ứng dụng?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Đăng xuất",
          style: 'destructive',
          onPress: async () => {
            try {
              await auth().signOut();
              resetRoot('AuthStack');
            } catch (error) {
              console.error("Lỗi đăng xuất:", error);
              Alert.alert("Lỗi", "Không thể đăng xuất lúc này. Vui lòng thử lại!");
            }
          }
        }
      ]
    );
  };

  if (!user) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
        <Text style={{ marginTop: 10 }}>Đang tải thông tin...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} showsVerticalScrollIndicator={false}>

        {/* --- DYNAMIC HEADER --- */}
        <View style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1518605368461-1e1296223280?q=80&w=2070&auto=format&fit=crop' }}
            style={styles.coverImage}
          />
          <View style={styles.overlay} />
          <SafeAreaView style={styles.safeHeaderArea}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Hồ sơ của tôi</Text>
            <View style={{ width: 40 }} />
          </SafeAreaView>
        </View>

        {/* --- PROFILE INFO --- */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: user.photoURL || `https://ui-avatars.com/api/?background=random&name=${user.email}` }}
              style={styles.avatar}
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
              <Text style={styles.infoText}>Hà Nội, VN</Text>
            </View>
          </View>
        </View>

        {/* --- KÝ SỐ / STATS --- */}
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

        {/* --- MENU TƯƠNG TÁC ĐƯỢC --- */}
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

        {/* --- LOGOUT BUTTON AT BOTTOM --- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialCommunityIcons name="logout" size={22} color="#fff" />
          <Text style={styles.logoutText}>ĐĂNG XUẤT</Text>
        </TouchableOpacity>

      </ScrollView>
    </View>
  );
};

// --- COMPONENT MENU CON ---
interface MenuItemProps {
  icon: string;
  text: string;
  onPress: () => void;
  color?: string;
  hideArrow?: boolean;
  hideBorder?: boolean;
}

const MenuItem = ({ icon, text, onPress, color = '#333', hideArrow = false, hideBorder = false }: MenuItemProps) => (
  <Pressable style={[styles.menuItem, !hideBorder && styles.menuItemBorder]} onPress={onPress}>
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
    height: 220,
    width: width,
    position: 'relative'
  },
  coverImage: {
    width: '100%',
    height: '100%',
    position: 'absolute'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.35)',
  },
  safeHeaderArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -60,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 60,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#eee'
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
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    marginBottom: 4
  },
  userEmail: {
    fontSize: 15,
    color: '#666',
    fontWeight: '500',
    marginBottom: 12
  },
  personalInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  infoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EAECEF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 13,
    color: '#444',
    fontWeight: '600'
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 25,
    borderRadius: 16,
    paddingVertical: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.maroon || '#721c24',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500'
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: '#E5E5E5'
  },
  menuWrapper: {
    marginTop: 25,
    paddingHorizontal: 20
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 10,
  },
  cardSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 15,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  menuItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0'
  },
  menuIconBg: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: 'rgba(114, 28, 36, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600'
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryRed || '#d32f2f',
    marginHorizontal: 20,
    marginTop: 35,
    marginBottom: 20,
    paddingVertical: 16,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.primaryRed || '#d32f2f',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    letterSpacing: 0.5,
  }
});

export default ProfileScreen;