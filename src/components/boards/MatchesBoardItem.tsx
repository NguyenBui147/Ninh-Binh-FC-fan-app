import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet,
  Pressable, 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Match } from '../../hooks/useMatches';
import Colors from '../../assets/colors/colors';

interface MatchProps {
    data: Match[]
}

const MatchItem = ({ item }: { item: Match }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.cardContainer}>
      <Pressable onPress={() => setExpanded(!expanded)}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {item.timeStr} | {item.league}
          </Text>
        </View>

        <View style={styles.contentContainer}>
          <View style={styles.teamContainer}>
            <Image source={{ uri: item.homeTeamLogo }} style={styles.logo} />
            <Text style={styles.teamName} numberOfLines={2}>{item.homeTeam}</Text>
          </View>

          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{item.score}</Text>
            <Text style={styles.statusText}>{item.status}{"\n"}{item.stadium}</Text>
          </View>

          <View style={styles.teamContainer}>
            <Image source={{ uri: item.awayTeamLogo }} style={styles.logo} />
            <Text style={styles.teamName} numberOfLines={2}>{item.awayTeam}</Text>
          </View>
        </View>

        {item.status === 'FINISHED' && expanded && (
          <View style={styles.footer}>
            <View style={styles.scorerColumn}>
                <Text style={styles.scorer}>{item.homeTeamScorer ? `${item.homeTeamScorer}` : ''}</Text>
            </View>
            <View style={styles.scorerColumn}>
                
            </View>
            <View style={styles.scorerColumn}>
                <Text style={styles.scorer}>{item.awayTeamScorer ? `${item.awayTeamScorer}` : ''}</Text>
            </View>
          </View>
        )}
      </Pressable>
    </View>
  );
};

const MatchesBoard: React.FC<MatchProps> = ({ data }) => {
  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MatchItem item={item} />}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  listContent: {
    paddingBottom: 20,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.maroon,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#555',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teamContainer: {
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  teamName: {
    color: Colors.black,
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
  },
  statusText: {
    textAlign:'center',
    fontSize: 10,
    color: Colors.orange,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: '#eee',
  },
  stadiumRow:{
    textAlign:'center',
    flex:1,
    height:12
  },
  scorerColumn: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  scorer: {
    fontSize: 11,
    color: Colors.black,
    textAlign: 'center',
    marginTop: 2,
  },
});

export default MatchesBoard;