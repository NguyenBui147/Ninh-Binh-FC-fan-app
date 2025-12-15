import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
  ActivityIndicator,
 
} from 'react-native';

import Carousel from 'react-native-banner-carousel-updated';
import { useCollection } from '../../hooks/useCollection';
import Colors from '../../assets/colors/colors';

const { width } = Dimensions.get('window');
const BANNER_HEIGHT = 400;

interface BannerItem {
  id: string;
  url: string; 
  order?: number;
}
const ShopSlider = () => {
  const { data: banners, loading: isLoading, error } = useCollection<BannerItem>(
    'banner',
    {
      orderByField: 'order',
      orderDirection: 'desc',
      limit: 3,
    }
  );

  const renderPage = (item: BannerItem) => (
    <Pressable key={item.id} style={styles.slide}>
      <Image 
        style={styles.image} 
        source={{ uri: item.url }} 

        defaultSource={require('../../assets/images/placeholder.png')} 
      />
    </Pressable>
  );

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }
  if (error) {
    console.log("Error loading banner:", error);
    return <View style={styles.container} />; 
  }

  if (!banners || banners.length === 0) {
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
    position:'absolute' 
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

export default ShopSlider;