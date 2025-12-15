
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import { useCollection } from '../../hooks/useCollection';
import Colors from '../../assets/colors/colors';
import { FlatList, Text } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 180;
const CARD_WIDTH  = width * 0.3;

interface CardItem {
  id:string;
  imgUrl: string;
  title:string;
}

const CardSlider = () => {
  const { data: Cards, loading: isLoading, error } = useCollection<CardItem>(
    'cards',
    {
      orderByField: 'id',
      orderDirection: 'asc',
    }
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (error) {
      console.log("Error loading slider:", error);
      return <View style={styles.container} />; 
    } 

  if (Cards.length === 0) {
    console.log("No slider available");
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={Cards}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
           <View style={styles.overlay} >
            <Text style={styles.titleText}>{item.title}</Text>
           </View>
        </View>
      )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: width,
    backgroundColor: Colors.white,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  
  card: {
    flexDirection:'column',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderWidth:2,
    borderColor:Colors.gray,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: '80%',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.25)', 
    alignItems:'center',
    justifyContent:'center'
  },
  titleText:{
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
  }
});

export default CardSlider;
