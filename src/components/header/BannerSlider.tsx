import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
} from 'react-native';

import Carousel from 'react-native-banner-carousel-updated';
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  FirebaseFirestoreTypes
} from '@react-native-firebase/firestore';

import Colors from '../../assets/colors/colors';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 200;

interface BannerDocumentData {
  url: string;
  order: number;
}
interface BannerItem {
  id: string;
  imageUrl: string;
}

const BannerSlider = () => {
  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getFirestore();
    const bannersRef = collection(db, 'banner');
    const q = query(bannersRef, orderBy('order', 'asc'));

    const subscriber = onSnapshot(
      q,
      (
        querySnapshot: FirebaseFirestoreTypes.QuerySnapshot<BannerDocumentData>
      ) => {
        const bannersData = querySnapshot.docs.map(
          (documentSnapshot: FirebaseFirestoreTypes.QueryDocumentSnapshot<BannerDocumentData>) => ({
            id: documentSnapshot.id,
            imageUrl: documentSnapshot.data().url,
          })
        );

        setBanners(bannersData);
        setIsLoading(false);
      },
      (error: Error) => {
        console.error("Lỗi tải Banners: ", error);
        setIsLoading(false);
      }
    );

    return () => subscriber();
  }, []);

  const renderPage = (item: BannerItem) => (
    <Pressable key={item.id} style={styles.slide}>
      <Image style={styles.image} source={{ uri: item.imageUrl }} />
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (banners.length === 0) {
    return <View style={styles.container} />;
  }

  return (
    <View style={styles.container}>
      <Carousel
        autoplay
        autoplayTimeout={3000}
        loop
        index={0}
        pageSize={width}
        pageIndicatorStyle={styles.dot}
        activePageIndicatorStyle={styles.dotActive}
      >
        {banners.map(renderPage)}
      </Carousel>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: BANNER_HEIGHT,
    width,
    backgroundColor: Colors.gray1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    width,
    height: BANNER_HEIGHT,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dot: {
    backgroundColor: Colors.gray,
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
  },
  dotActive: {
    backgroundColor: Colors.primaryRed,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default BannerSlider;
