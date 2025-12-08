import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 

} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { TeamStanding } from '../../hooks/useStanding';
import Colors from '../../assets/colors/colors';

interface StandingProps {
    data:TeamStanding[]
}

const LeaderBoard:React.FC<StandingProps> =({data}) => {
 
  const getFormColor = (result: string) => {

    switch (result) {
      case 'T': return Colors.green; 
      case 'H': return Colors.orange; 
      case 'B': return Colors.primaryRed; 
      default: return Colors.gray;  
    }
  };

  const renderFormItem = (result: string, index: number) => (
    <View key={index} style={[styles.FormItem, { backgroundColor: getFormColor(result) }]}>
      <Text style={styles.formText}>{result}</Text>
    </View>
  );
  const renderItem = ({ item }: { item: TeamStanding }) => {
    return (
      <View style={styles.row}>
        <View style={styles.colRank}>
          <View style={[
            styles.rankBadge, 
            item.rank <= 3 ? styles.topRank : null,
            item.rank > 12 ? styles.bottomRank : null 
          ]}>
            <Text style={[
              styles.rankText, 
              (item.rank <= 3 || item.rank > 12) ? { color: 'white' } : null
            ]}>
              {item.rank}
            </Text>
          </View>
        </View>
        <View style={styles.colTeam}>
          <Image 
            source={{ uri: item.logo || ' ' }} 
            style={styles.logo} 
            resizeMode="contain"
          />
          <Text style={styles.teamName} numberOfLines={1}>
            {item.name}
          </Text>
        </View>
        <View style={styles.colStats}>
          <Text style={styles.statText}>{item.stats.played}</Text>
        </View>
        <View style={styles.colStats}>
          <Text style={styles.statText}>{item.stats.gd}</Text>
        </View>
        <View style={styles.colStats}>
          <Text style={[styles.statText, styles.pointsText]}>{item.stats.points}</Text>
        </View>
        <View style={styles.colForm}>
          {item.form.slice(0, 5).map((res, index) => renderFormItem(res, index))}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={[styles.row, styles.headerContainer]}>
      <View style={styles.colRank}><Text style={styles.headerText}>TT</Text></View>
      <View style={styles.colTeam}><Text style={styles.headerText}>CLB</Text></View>
      <View style={styles.colStats}><Text style={styles.headerText}>Tr</Text></View>
      <View style={styles.colStats}><Text style={styles.headerText}>HS</Text></View>
      <View style={styles.colStats}><Text style={styles.headerText}>Đ</Text></View>
      <View style={styles.colForm}><Text style={styles.headerText}>Phong độ</Text></View>
    </View>
  );


  

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right']}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]} 
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: '#e9ecef',
    borderBottomWidth: 2,
    borderBottomColor: '#dee2e6',
  },
  colRank: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colTeam: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 5,
  },
  colStats: {
    width: 32, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  colForm: {
    width: 90, 
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#495057',
  },
  rankText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#495057',
  },
  statText: {
    fontSize: 13,
    color: '#212529',
  },
  pointsText: {
    fontWeight: 'bold',
    color: '#000',
  },
  teamName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#343a40',
    flex: 1, 
  },
  logo: {
    width: 24,
    height: 24,
    margin: 4,
  },
  rankBadge: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  topRank: {
    backgroundColor: Colors.green, 
  },
  bottomRank: {
    backgroundColor:Colors.primaryRed,
  },
  FormItem: {
    width: 14,
    height: 14,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default LeaderBoard;