import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { useLiveScore } from '../../hooks/useLiveScore';
import Colors from '../../assets/colors/colors';
const { width } = Dimensions.get('window');

const LiveScoreBoard = () => {
    const {match,isLoading,displayTime} = useLiveScore();

    if(isLoading){
        return(
            <View style={styles.container}>
                <ActivityIndicator size="small" color={Colors.primaryRed}/>
            </View>
        )
    }
    if (!match) {
    return (
      <View style={styles.container}>
        <Text style={styles.notiText}>Hiện không có trận đấu</Text>
      </View>
    );
  }
    else{
        return (
        <View style={styles.container}>
            <View style={styles.header}/>
            <View style={styles.statusRow}>
                {match.status === 'live' ? (
                <View style={styles.liveBadge}>
                    <View style={styles.dot} />
                    <Text style={styles.liveText}>TRỰC TIẾP {displayTime}</Text>
                </View>
                ) : (
                  <View style={styles.liveBadge}>
                    <Text style={styles.statusText}>{displayTime}</Text>
                  </View>
                )}
            </View>

            <View style={styles.scoreRowContainer}>
                <View style={styles.team}>
                    <Image source={{uri: match.homeTeamLogo}} style={styles.logo}/>
                    <Text style={styles.teamName} numberOfLines={2}>{match.homeTeam}</Text>
                </View>
                
                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreText}>{match.score}</Text>
                    <Text style={styles.teamName} numberOfLines={2}>{match.stadium}</Text>
                </View>

                <View style={styles.team}>
                    <Image source={{uri: match.awayTeamLogo}} style={styles.logo}/>
                    <Text style={styles.teamName} numberOfLines={2}>{match.awayTeam}</Text>
                </View>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    height: 140, 
    width: width*0.9,
    alignContent: 'center',
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    justifyContent: 'center',
  },
  header:{
    width: '100%',
    height:10,
    backgroundColor:Colors.primaryRed,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryRed,
    marginRight: 6,
  },
  liveText: {
    color: Colors.primaryRed,
    fontSize: 10,
    fontWeight: 'bold',
  },
  notiText:{
    textAlign:'center',
    fontSize: 20,
    color: Colors.black,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 10,
    color: Colors.black,
    fontWeight: '600',
  },
  scoreRowContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  logo: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  
  teamName: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
    color: Colors.black,
    width: '100%',
    marginTop:10
  },

  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  scoreText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.darkNavy,
  },
});

export default LiveScoreBoard;