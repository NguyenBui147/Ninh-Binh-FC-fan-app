import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FlatList } from 'react-native-gesture-handler';
import Colors from '../assets/colors/colors';
import { useCollection } from '../hooks/useCollection';

const categorySections =['Tất cả','Áo thi đấu','Phụ kiện', 'Giày đá banh'];

const Category = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { data: Categories, loading, error } = useCollection<{ id:string; name: string }>(
        'categories',
        {
            orderByField: 'name',
            orderDirection: 'asc',
        }
    );
  return (
    <View>

      <Text>Category</Text>
      <FlatList
        data={categorySections}
        renderItem={({item}) => (
          <Category
            item={item}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:10, paddingHorizontal:10, gap:10}}
      ></FlatList>
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
    container:{
    flex:1,
    padding:18,

    },
    categoryText:{
        fontSize:16,
        fontWeight:600,
        color:Colors.white,
        padding:20,
        backgroundColor:Colors.darkNavy,
        textAlign:'center',
        borderRadius:20
    }
})