import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native'
import React from 'react'
import NewsItemComponent from '../../../../components/NewsItemComponent'
import { useNews } from '../../../../hooks/useNews'
import { NewsStackScreensProps } from '../../../../navigation/NavigationTypes'
import Colors from '../../../../assets/colors/colors'

const NewsScreen: React.FC<NewsStackScreensProps<'News'>> = () => {

  const { 
    news, 
    loading, 
    isRefreshing, 
    isLoadingMore, 
    onRefresh, 
    loadMore   
  } = useNews();

  if (loading && !isRefreshing) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size={'large'} color={Colors.primaryRed} />
      </View>
    )
  }
  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator size={'small'} color={Colors.primaryRed} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <NewsItemComponent item={item} />}
        contentContainerStyle={styles.flatlistContainer}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5} 
        ListFooterComponent={renderFooter} 
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Không có tin tức nào</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatlistContainer: {
    
    paddingBottom: 30,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    color: 'gray',
    fontSize: 16,
  }
})

export default NewsScreen