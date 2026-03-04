import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  Pressable,
  StatusBar,
} from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PlayerStackParamList } from '../../../../navigation/NavigationTypes';
import Colors from '../../../../assets/colors/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface PlayerData {
  id: string;
  name: string;
  number: number | string;
  position: string;
  image: string;
  height?: string;
  weight?: string;
  dob?: string;
  nationality?: string;
  matches?: number;
  goals?: number;
  minutes?: number;
}

const DetailedPlayerScreen = () => {
  const route = useRoute<RouteProp<PlayerStackParamList, 'DetailedPlayer'>>();
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  
  const { player } = route.params;

  const playerData: PlayerData = {
    ...player,
    matches: player.matches || 0,
    goals: player.goals || 0,
    minutes: player.minutes || 0,
    height: player.height || '___',
    weight: player.weight || '___',
    nationality: player.nationality || '___',
    dob: player.dob || '___'
  };

  const InfoCard = ({ icon, label, value }: { icon: string, label: string, value: string }) => (
    <View style={styles.infoCard}>
      <View style={styles.infoIconContainer}>
        <MaterialCommunityIcons name={icon} size={24} color={Colors.primary} />
      </View>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );

  const StatCard = ({ value, label, icon }: { value: number | string, label: string, icon: string }) => (
    <View style={styles.statCard}>
      <MaterialCommunityIcons name={icon} size={28} color={Colors.primary} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      <View style={styles.headerGradient}>
        <Image 
          source={{ uri: playerData.image }} 
          style={styles.headerBlurBg} 
          blurRadius={20} 
        />
        <View style={styles.headerOverlay} />
        <Image 
          source={{ uri: playerData.image }} 
          style={styles.playerMainImage} 
          resizeMode="contain"
        />
        <View style={styles.floatingNumberBadge}>
          <Text style={styles.floatingNumber}>{playerData.number}</Text>
        </View>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.nameCard}>
          <View style={styles.nameContent}>
            <Text style={styles.playerName}>{playerData.name.toUpperCase()}</Text>
            <View style={styles.positionRow}>
              <View style={styles.positionBadge}>
                <Text style={styles.positionText}>{playerData.position}</Text>
              </View>
              <Text style={styles.nationalityText}>• {playerData.nationality}</Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thống kê mùa giải</Text>
          <View style={styles.statsGrid}>
            <StatCard value={playerData.matches || 0} label="Trận đấu" icon="shield-account" />
            <StatCard value={playerData.goals || 0} label="Bàn thắng" icon="soccer" />
            <StatCard value={playerData.minutes || 0} label="Phút chơi" icon="clock-outline" />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Thông tin cá nhân</Text>
          <View style={styles.infoGrid}>
            <InfoCard icon="human-male-height" label="Chiều cao" value={playerData.height || '___'} />
            <InfoCard icon="weight-kilogram" label="Cân nặng" value={playerData.weight || '___'} />
            <InfoCard icon="calendar-month" label="Ngày sinh" value={playerData.dob || '___'} />
            <InfoCard icon="shoe-cleat" label="Chân thuận" value="___" />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Giới thiệu</Text>
          <View style={styles.bioCard}>
            <Text style={styles.bioText}>___</Text>
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default DetailedPlayerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    height: screenHeight * 0.3,
    width: screenWidth,
    position: 'relative',
    backgroundColor: '#1A1A2E',
    overflow: 'hidden',
  },
  headerBlurBg: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.3,
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(230, 57, 70, 0.85)',
  },
  playerMainImage: {
    width: screenWidth * 0.9,
    height: '85%',
    alignSelf: 'center',
    position: 'absolute',
    marginTop: 'auto',
    zIndex: 1,
  },
  backButton: {
    position: 'absolute',
    left: 16,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingNumberBadge: {
    position: 'absolute',
    top: 80,
    right: 20,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  floatingNumber: {
    fontSize: 32,
    fontWeight: '900',
    color: 'white',
  },

  // Scroll Content
  scrollContent: {
    paddingBottom: 30,
    zIndex: 10,
  },

  // Name Card
  nameCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: -50,           
    borderRadius: 20,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    zIndex: 20,              
    position: 'relative',
  },
  nameContent: {
    alignItems: 'center',
  },
  playerName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A2E',
    letterSpacing: 1,
    textAlign: 'center',
  },
  positionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  positionBadge: {
    backgroundColor: '#E63946',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  positionText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  nationalityText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },

  // Section
  section: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A2E',
    marginBottom: 16,
  },

  // Stats Grid
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 4,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1A1A2E',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },

  // Info Grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -6,
  },
  infoCard: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  infoIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  infoLabel: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A2E',
  },

  // Bio Card
  bioCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
});