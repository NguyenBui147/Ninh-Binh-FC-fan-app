import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useMatches } from '../../hooks/useMatches';
import Colors from '../../assets/colors/colors';

const { width } = Dimensions.get('window');

const LiveScoreBoard = () => {
  const { match: matches, loading } = useMatches();

  // Tìm trận đấu ưu tiên hiển thị: Live trước, Upcoming sau
  const displayMatch = useMemo(() => {
    if (!matches || matches.length === 0) return null;

    // 1. Kiểm tra ưu tiên: Có trận nào đang diễn ra (live) không?
    const liveMatches = matches.filter(m => m.status === 'LIVE');
    if (liveMatches.length > 0) {
      liveMatches.sort((a, b) => a.timeStamp - b.timeStamp);
      return liveMatches[0];
    }

    // 2. Nếu không có trận live, lấy trận sắp diễn ra (upcoming) gần nhất
    const upcomingMatches = matches.filter(m => m.status === 'UPCOMING');
    if (upcomingMatches.length > 0) {
      upcomingMatches.sort((a, b) => a.timeStamp - b.timeStamp);
      return upcomingMatches[0];
    }

    return null;
  }, [matches]);

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (!displayMatch) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <MaterialCommunityIcons name="calendar-blank" size={32} color={Colors.gray} style={{ marginBottom: 10 }} />
        <Text style={styles.notiText}>Chưa có lịch thi đấu hoặc trận live</Text>
      </View>
    );
  }

  const match = displayMatch;
  const isLive = match.status === 'live';

  // Tuỳ thuộc vào API, đôi khi score là chuỗi "1 - 1" hoặc là số rời, tuỳ biến ở đây:
  const matchScore = match.score ? match.score : `${match.homeTeamScore ?? 0} - ${match.awayTeamScore ?? 0}`;

  return (
    <View style={styles.container}>
      {/* Thanh tiêu đề / Thời gian */}
      <View style={styles.header}>
        <View style={styles.upcomingBadge}>
          {isLive ? (
            <>
              <View style={styles.liveDot} />
              <Text style={styles.upcomingText}>TRỰC TIẾP</Text>
            </>
          ) : (
            <>
              <MaterialCommunityIcons name="clock-outline" size={14} color="#fff" style={{ marginRight: 4 }} />
              <Text style={styles.upcomingText}>SẮP DIỄN RA</Text>
            </>
          )}
        </View>
        <Text style={styles.timeText}>{match.timeStr}</Text>
      </View>

      {/* Thông tin đội bóng & Tỉ số/Tình trạng */}
      <View style={styles.contentRow}>
        {/* Đội nhà */}
        <View style={styles.teamSection}>
          <View style={styles.logoWrapper}>
            <Image source={{ uri: match.homeTeamLogo }} style={styles.logo} />
          </View>
          <Text style={styles.teamName} numberOfLines={2}>{match.homeTeam}</Text>
        </View>

        {/* Khu vực giữa (VS / Tỉ số / Sân vận động) */}
        <View style={styles.vsSection}>
          {isLive ? (
            <Text style={styles.scoreText}>{matchScore}</Text>
          ) : (
            <Text style={styles.vsText}>VS</Text>
          )}
          <View style={styles.stadiumBadge}>
            
            <Text style={styles.stadiumText} numberOfLines={1}> {match.stadium}</Text>
          </View>
        </View>

        {/* Đội khách */}
        <View style={styles.teamSection}>
          <View style={styles.logoWrapper}>
            <Image source={{ uri: match.awayTeamLogo }} style={styles.logo} />
          </View>
          <Text style={styles.teamName} numberOfLines={2}>{match.awayTeam}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 160,
    width: width * 0.9,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    marginVertical: 10,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.darkNavy || '#1a237e',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  upcomingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.maroon || '#721c24',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#fff',
    marginRight: 6,
  },
  upcomingText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  timeText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  notiText: {
    fontSize: 16,
    color: Colors.darkNavy || '#333',
    fontWeight: '600',
  },
  contentRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  teamSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  teamName: {
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 18,
  },
  vsSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  vsText: {
    fontSize: 24,
    fontWeight: '900',
    fontStyle: 'italic',
    color: Colors.gray || '#9e9e9e',
    marginBottom: 5,
  },
  scoreText: {
    fontSize: 26,
    fontWeight: '900',
    color: Colors.maroon || '#721c24',
    marginBottom: 5,
  },
  stadiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    maxWidth: '100%',
  },
  stadiumText: {
    fontSize: 10,
    color: Colors.darkNavy || '#1a237e',
    fontWeight: '600',
    flexShrink: 1,
  }
});

export default LiveScoreBoard;