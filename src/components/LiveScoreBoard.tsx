import React, { useState, useEffect, use } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useLiveScore } from '../hooks/useLiveScore';
import Colors from '../assets/colors/colors';
const { width } = Dimensions.get('window');

// data firestore

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
            <View style={styles.statusRow}>
                {match.status === 'live' ? (
                <View style={styles.liveBadge}>
                    <View style={styles.dot} />
                    <Text style={styles.liveText}>TRỰC TIẾP {displayTime}</Text>
                </View>
                ) : (
                <Text style={styles.statusText}>{displayTime}</Text>
                )}
            </View>

            <View style={styles.scoreRowContainer}>
                <View style={styles.team}>
                    <Image source={{uri: match.homeTeamLogo}} style={styles.logo}/>
                    <Text style={styles.teamName}>{match.homeTeam}</Text>
                </View>
                <Text style={styles.scoreText}>{match.score}</Text>

                <View style={styles.team}>
                    <Image source={{uri: match.awayTeamLogo}} style={styles.logo}/>
                    <Text style={styles.teamName}>{match.awayTeam}</Text>
                </View>

            </View>
        </View>
        )
    }

    
}

const styles = StyleSheet.create({
  container: {
    height: 120, 
    width: '90%',
    textAlign: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.gray1,
    borderRadius: 10,
    overflow: 'hidden', 
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'space-between',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primaryRed ,
    marginRight: 6,
  },
  liveText: {
    color: Colors.primaryRed,
    fontSize: 10,
    fontWeight: 'bold',
  },
  notiText:{
    
    fontSize: 30,
    color: Colors.black,
    fontWeight: '600',
  },
  statusText: {
    fontSize: 10,
    color: Colors.black,
    fontWeight: '600',
  },
  scoreRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  team: {
    flex: 1, 
    alignItems: 'center',
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  teamName: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.black,
  },
  scoreText: {
    flex: 0.8, 
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.black,
  },
});

export default LiveScoreBoard;