import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 

} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Match } from '../../hooks/useMatches';
import Colors from '../../assets/colors/colors';

interface MatchProps {
    data:Match[]
}

const MatchesBoard:React.FC<MatchProps> =({data}) => {
 
  const renderItem = ({ item }: { item: Match }) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {item.timeStr} - {item.league} </Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.teamContainer}>
            <Image source={{uri: item.homeTeamLogo}} style={styles.logo}/>
            <Text style={styles.teamName}>{item.homeTeam}</Text>
          </View>
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreText}>{item.score}</Text>
          </View>
          <View style={styles.teamContainer}>
            <Image source={{uri: item.awayTeamLogo}} style={styles.logo}/>
            <Text style={styles.teamName}>{item.awayTeam}</Text>
          </View>

        </View>
          {/* {item.status === 'FINISHED' && (
              <Text style={styles.scorer}>⚽ {item.homeTeamScorer || '...'}</Text>
            <View style={styles.footer}>
              <Text style={styles.scorer}>⚽ {item.awayTeamScorer || '...'}</Text>
            </View>
          )}
           */}
          
      </View>
    );
  };



  return (
    <SafeAreaView style={styles.container} edges={['left','right']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    backgroundColor: Colors.white,
    flex: 1,
    height:120,
    rowGap:5,
    flexDirection:'column',
    marginTop:5,
    borderBottomWidth:1,
    borderBottomColor:Colors.maroon,
   },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  contentContainer:{
    flex: 1,
    flexDirection:'row',
    alignContent:"center",
    justifyContent:'center'
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
    color: '#555' },
  date: { 
    fontSize: 12, 
    color: '#888' },
  matchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  teamContainer: { 
    alignItems: 'center', 
    flex: 1 
  },
  logo: { 
    width: 50, 
    height: 50, 
    resizeMode: 'contain' 
  },
  
  teamName: { 
    color:Colors.black,
    marginTop: 5, 
    fontSize: 13, 
    fontWeight: '600',
    textAlign: 'center' },
  scoreContainer: {
    alignItems: 'center',
    width: 80 },
  scoreText: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    color: '#d32f2f' },
  statusText: { 
    fontSize: 10, 
    color: '#888', 
    marginTop: 2 },
  footer: { 
    flex:1,
    marginTop: 10, 
    paddingTop: 5, 
    borderTopWidth: 0.5, 
    borderTopColor: '#eee'},
  scorer: { 
    fontSize: 11, 
    color: Colors.black }
});

export default MatchesBoard;