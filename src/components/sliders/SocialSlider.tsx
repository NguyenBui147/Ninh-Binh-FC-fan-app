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
const CARD_HEIGHT = 1000;


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

const SocialSlider = () => {
  const [Cards, setCards] = useState<CardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const cardsRef = collection(db, 'social');
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
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
        <View style={styles.card}>
          <Image source={{ uri: item.imgUrl }} style={styles.image} />
           <View style={styles.titleContainer} >
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
    width: width*0.9,
    backgroundColor: Colors.white,
    justifyContent:'center',
    alignContent:'center'
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    flexDirection:'column',
    height: 500,
    marginRight: 12,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    borderWidth:2,
    borderColor:Colors.black,
    
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  titleContainer:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    alignItems: 'center',

  },
  titleText:{
    color: Colors.white,
    fontSize: 14,
    fontWeight: '400',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default SocialSlider;
