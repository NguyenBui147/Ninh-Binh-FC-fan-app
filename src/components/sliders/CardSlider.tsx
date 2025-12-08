import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';


import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';

import Colors from '../../assets/colors/colors';
import { FlatList, Text } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');
const CARD_HEIGHT = 180;
const CARD_WIDTH  = width * 0.3;

interface CardDocumentData {
  id: number;
  imgUrl: string;
  title:string;
}
interface CardItem {
  id:string;
  imgUrl: string;
  title:string;
}

const CardSlider = () => {
  const [Cards, setCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const cardsRef = collection(db, 'cards');
    const q = query(cardsRef, orderBy('id', 'asc'));

    const subscriber = onSnapshot(
      q,
      (
        querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<CardDocumentData>
      ) => {
        const CardsData = querySnapshot.docs.map(
          (documentSnapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot<CardDocumentData>) => ({
            id: documentSnapshot.id,
            imgUrl: documentSnapshot.data().imgUrl,
            title: documentSnapshot.data().title,
            
          })
        );
        setCards(CardsData);
        setIsLoading(false);
      },
      (error: Error) => {
        console.error("Lỗi tải Cards: ", error);
        setIsLoading(false);
      }
    );

    return () => subscriber();
  }, []);


  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (Cards.length === 0) {
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
