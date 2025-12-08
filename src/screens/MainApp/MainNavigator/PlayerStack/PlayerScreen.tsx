import React from 'react';
import { 
  View, Text, SectionList, Image, 
  StyleSheet, ActivityIndicator,
  Pressable
} from 'react-native';
import { usePlayers, Player } from '../../../../hooks/usePlayers';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { images } from '../../../../assets';
import Colors from '../../../../assets/colors/colors';

type RootStackParamList = {
  DetailedPlayer: { player: Player };
};

const PlayerListScreen = () => {
  const { sections, loading } = usePlayers();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = (player: Player) => {
    navigation.navigate('DetailedPlayer', { player });
  };

  const renderItem = ({ item }: { item: Player }) => (
    <Pressable 
      style={styles.card} 
      onPress={() => handlePress(item)}
    >
      <Image 
        source={{ uri: item.image || images.nbfc }} 
        style={styles.avatar} 
        resizeMode="cover"
      />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subInfo}>
           {item.nationality} • {item.dob}
        </Text>
      </View>
      <View style={styles.numberBadge}>
        <Text style={styles.numberText}>{item.number}</Text>
      </View>
    </Pressable>
  );


  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left','right']}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickySectionHeadersEnabled={true} 
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white 
  },
  center: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center' 
  },
  headerContainer: {
    backgroundColor: Colors.white, 
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderLeftWidth: 4,
    borderLeftColor: Colors.maroon, 
    marginBottom: 5,
    marginTop: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#343a40',
    textTransform: 'uppercase',
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 15,
    marginBottom: 10,
    padding: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.gray,
  },
  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subInfo: {
    fontSize: 13,
    color: '#868e96',
  },
  numberBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.tertiaryOrange,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlayerListScreen;