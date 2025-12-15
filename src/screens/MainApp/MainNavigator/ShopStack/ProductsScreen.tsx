import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCollection } from '../../../../hooks/useCollection';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../../../assets/colors/colors';
import { ShopStackParamList } from '../../../../navigation/NavigationTypes';

const { width } = Dimensions.get('window');

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description?: string;
  sizes?: string[];
  rating?: number;
}

const CATEGORY = ['Tất cả', 'Quần áo', 'Phụ kiện', 'Giày đá bóng'];

const ShopHomeScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ShopStackParamList>>();
  const { data: products, loading, error } = useCollection<Product>('products');
  const [selectedCategory, setSelectedCategory] = useState('Tất cả');
  const [searchText, setSearchText] = useState('');

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    return products.filter((item) => {
      const matchCategory = selectedCategory === 'Tất cả' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
      return matchCategory && matchSearch;
    });
    }, [products, selectedCategory, searchText]);

  const renderProduct = ({ item }: { item: Product }) => (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate('DetailedProducts', { products: item })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.likeButton}>
          <MaterialCommunityIcons name="heart-outline" size={20} color={Colors.black} />
        </View>
      </View>
      <View style={styles.productInfo}>
        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.productPrice}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
        </Text>
        <View style={styles.ratingContainer}>
          <MaterialCommunityIcons name="star" size={12} color={Colors.brightYellow} />
          <Text style={styles.ratingText}>{item.rating || 5.0}</Text>
        </View>
      </View>
    </Pressable>
  );

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primaryRed} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text>Có lỗi xảy ra khi tải sản phẩm!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.bigTitle}>Ninh Binh FC Official Store</Text>
        <View style={styles.searchContainer}>
          <MaterialCommunityIcons name="magnify" size={24} 
            color={Colors.black} style={{ marginRight: 10 }} />
          <TextInput
            placeholder="Tìm kiếm sản phẩm..."
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>
      <View style={{ height: 50, marginBottom: 10 }}>
        <FlatList
          data={CATEGORY}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          renderItem={({ item }) => {
            const isSelected = selectedCategory === item;
            return (
              <Pressable
                style={[styles.categoryPill, isSelected && styles.categoryPillActive]}
                onPress={() => setSelectedCategory(item)}
              >
                <Text style={[styles.categoryText, isSelected && styles.categoryTextActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.centerContainer}>
            <Text style={{ color: '#888', marginTop: 50 }}>Không tìm thấy sản phẩm nào</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 15 },
  bigTitle: { fontSize: 28, fontWeight: 'bold', color: '#000', marginBottom: 15, textAlign: 'center' },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 45,
  },
  searchInput: { flex: 1, fontSize: 15, color: '#333' },
  categoryPill: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    marginRight: 10,
    justifyContent: 'center',
    height: 36,
  },
  categoryPillActive: { backgroundColor: '#d32f2f' },
  categoryText: { fontSize: 13, color: '#666', fontWeight: '600' },
  categoryTextActive: { color: '#fff' },
  listContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  card: {
    width: (width - 50) / 2,
    marginBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3.84,
    elevation: 2,
    borderRadius: 12,
  },
  imageContainer: {
    height: 160,
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
    position: 'relative',
  },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productInfo: { paddingHorizontal: 5, paddingBottom: 10 },
  productName: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 4 },
  productPrice: { fontSize: 14, fontWeight: 'bold', color: Colors.primaryRed },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  ratingText: { fontSize: 10, color: '#888', marginLeft: 4 },
});

export default ShopHomeScreen;