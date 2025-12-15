import { Dimensions, Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ProductsStackParamList } from '../../../../navigation/NavigationTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Buttons } from '../../../../components';
import Colors from '../../../../assets/colors/colors';

const screenWidth = Dimensions.get('window').width;
type DetailedProductsRouteProp = RouteProp<ProductsStackParamList, 'DetailedProducts'>;
type NavigationProp = NativeStackNavigationProp<ProductsStackParamList>;

const DetailedProductsScreen = () => {
  const route = useRoute<DetailedProductsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { products } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Image source={{uri: products.image}} style={styles.image} />
      <Text>DetailedProductsScreen</Text>
      <Buttons.Button1
        text={'Back'}
        onPress={()=> navigation.goBack()}
        backgroundColor={Colors.gray}
      />
    </SafeAreaView>
  )
}

export default DetailedProductsScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'white'
  },
  image:{
    width:screenWidth,
    height:300
  }
})