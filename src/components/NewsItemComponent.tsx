import {  Dimensions, StyleSheet, Text, View ,Pressable,Image} from 'react-native'
import React from 'react'
import { NewsItem } from '../hooks/useNews'
import { useNavigation } from '@react-navigation/native';

import Colors from '../assets/colors/colors';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.8;

interface Props {
  item :NewsItem;
};

const NewsItemComponent:React.FC<Props> = ({item}) => {
  const navigation = useNavigation<any>();
  const date = item.publishedAt?.toDate ? item.publishedAt.toDate().toLocaleDateString('vi-VN'): '';

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate ('DetailedNews', { id: item.id}) }
    >
      <View style={styles.contentContainer}>  
        <Image style={styles.contentImage} source={{uri: item.imageUrl} }/>
        <Text style={styles.titleText}>{item.title}</Text>
        <View style={styles.bottomCotainer}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
      </View>
    </Pressable>
  )
}
export default NewsItemComponent

const styles = StyleSheet.create({
  container:{
    flexDirection:'row',
  },
  
  contentContainer:{
    flex:1,
    justifyContent:'space-between'
  },
  contentImage:{
    width:'100%',
    height:200,
    resizeMode:'cover'
  },
  titleText:{
    fontWeight:600,
    color:Colors.black,
    padding:10
  },
  bottomCotainer:{
    margin:10,
    flexDirection:'row',
  
  },
  dateText:{
    fontWeight:400,
    fontSize: 14,
    color: Colors.darkNavy,
  },
})