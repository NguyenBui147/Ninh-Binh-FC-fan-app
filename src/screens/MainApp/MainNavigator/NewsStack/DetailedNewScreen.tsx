import { StyleSheet, Text, View, ActivityIndicator, ScrollView, Image,Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import RenderHTML from 'react-native-render-html';
import { NewsStackParamList } from '../../../../navigation/NavigationTypes';
import { NewsItem } from '../../../../hooks/useNews';
import Colors from '../../../../assets/colors/colors';

const screenWidth = Dimensions.get('window').width;

const DetailedNewsScreen = () => {
  const route = useRoute<RouteProp<NewsStackParamList, 'DetailedNews'>>();
  const { id } = route.params; 
  const [newsDetail, setNewsDetail] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const doc = await firestore().collection('news').doc(id).get() ;
        
        if (doc.exists) {
          setNewsDetail({ id: doc.id, ...doc.data() } as NewsItem);
        } else {
          console.log('Bài viết không tồn tại!');
        }
      } catch (error) {
        console.error('Lỗi tải chi tiết tin:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNewsDetail();
  }, [id]);
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (!newsDetail) {
    return (
      <View style={styles.center}>
        <Text>Không tìm thấy bài viết.</Text>
      </View>
    );
  }


  const date = newsDetail.publishedAt?.toDate 
    ? newsDetail.publishedAt.toDate().toLocaleDateString('vi-VN') 
    : '';

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: newsDetail.imageUrl }} style={styles.image} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{newsDetail.title}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.source}>{newsDetail.source || 'CLB Ninh Bình'}</Text>
        </View>
        <RenderHTML
          contentWidth={screenWidth - 40} 
          source={{ html: newsDetail.content || '<p>Nội dung đang cập nhật...</p>' }}
          tagsStyles={{
            body: { 
              whiteSpace: 'normal', 
              color: Colors.black 
            },
            p: { 
              color: Colors.black,
              fontSize: 16,
              lineHeight: 24,
              marginBottom: 10
            },
            h1: { color: Colors.black },
            h2: { color: Colors.black },
            span: { color: Colors.black },
            div: { color: Colors.black },
          }}
          enableExperimentalBRCollapsing={true}
          enableExperimentalMarginCollapsing={true}
        />
      </View>
    </ScrollView>
  );
};

export default DetailedNewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.black,
    marginBottom: 10,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  date: {
    color: 'gray',
    fontSize: 14,
  },
  source: {
    color: Colors.primaryRed,
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
});