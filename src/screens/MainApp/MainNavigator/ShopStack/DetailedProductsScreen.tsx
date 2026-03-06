import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { ProductsStackParamList } from '../../../../navigation/NavigationTypes';
import Colors from '../../../../assets/colors/colors';
import { useCart } from '../../../../context/CartContext';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type DetailedProductsRouteProp = RouteProp<ProductsStackParamList, 'DetailedProducts'>;
type NavigationProp = NativeStackNavigationProp<ProductsStackParamList>;

const DetailedProductsScreen = () => {
  const route = useRoute<DetailedProductsRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const insets = useSafeAreaInsets();
  const { products } = route.params;
  const productData = {
    name: products?.name || 'Sản phẩm chưa có tên',
    price: products?.price || 0,
    image: products?.image || 'https://via.placeholder.com/400',
    description: products?.description || 'Chưa có mô tả cho sản phẩm này.',
    category: products?.category || 'Khác',
    rating: products?.rating || 5.0,
    sizes: products?.sizes || [],
  };

  const [selectedSize, setSelectedSize] = useState(productData.sizes[0] || null);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, totalItems } = useCart();

  const handleAddToCart = () => {
    // Vì firebase có thể không trả về id trực tiếp trong object mà trả trong doc.id (nếu dùng useCollection)
    // Nên nếu object ở đây không có id, ta cứ xem như đã xử lý trong CartContext
    const cartProduct = {
      id: products?.id, // Có thể undefined
      name: productData.name,
      price: productData.price,
      image: productData.image,
      category: productData.category
    };

    addToCart(cartProduct, selectedSize, 1);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const renderRating = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialCommunityIcons
          key={i}
          name={i <= rating ? "star" : "star-outline"}
          size={16}
          color={Colors.yellow}
        />
      );
    }
    return <View style={styles.ratingContainer}>{stars}<Text style={styles.ratingText}>({rating})</Text></View>;
  };


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: productData.image }} style={styles.image} resizeMode="cover" />
          <View style={[styles.headerFloatingButtons, { top: insets.top + 10 }]}>
            <TouchableOpacity style={styles.iconButtonBg} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={[styles.iconButtonBg, { marginRight: 10 }]} onPress={() => setIsFavorite(!isFavorite)}>
                <MaterialCommunityIcons name={isFavorite ? "heart" : "heart-outline"} size={24} color={isFavorite ? Colors.primaryRed : "#000"} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButtonBg} onPress={() => navigation.navigate('Cart' as never)}>
                <MaterialCommunityIcons name="cart-outline" size={24} color="#000" />
                {totalItems > 0 && (
                  <View style={styles.cartBadge}>
                    <Text style={styles.cartBadgeText}>{totalItems > 99 ? '99+' : totalItems}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.dragHandle} />
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{productData.name}</Text>
            <Text style={styles.priceText}>{formatCurrency(productData.price)}</Text>
          </View>
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{productData.category}</Text>
            </View>
            {renderRating(productData.rating)}
          </View>
          {productData.sizes.length > 0 && (
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Chọn kích thước</Text>
              <View style={styles.sizesRow}>
                {productData.sizes.map((size: string) => {
                  const isSelected = selectedSize === size;
                  return (
                    <TouchableOpacity
                      key={size}
                      style={[styles.sizeBox, isSelected && styles.sizeBoxSelected]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text style={[styles.sizeText, isSelected && styles.sizeTextSelected]}>{size}</Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
          )}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Mô tả</Text>
            <Text style={styles.descriptionText}>{productData.description}</Text>
          </View>
        </View>
      </ScrollView>
      <SafeAreaView edges={['bottom']} style={styles.stickyFooter}>
        <TouchableOpacity
          style={styles.addToCartButton}
          activeOpacity={0.8}
          onPress={handleAddToCart}
        >
          <MaterialCommunityIcons name="cart-plus" size={24} color="white" style={{ marginRight: 10 }} />
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>
      </SafeAreaView>

    </View >
  );
};

export default DetailedProductsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray1 || Colors.white,
  },
  imageContainer: {
    height: screenHeight * 0.45, // Chiếm 45% chiều cao màn hình
    width: screenWidth,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  headerFloatingButtons: {
    position: 'absolute',
    left: 20,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButtonBg: {
    width: 40, height: 40,
    backgroundColor: 'rgba(255,255,255, 0.8)', // Màu trắng bán trong suốt
    borderRadius: 20,
    justifyContent: 'center', alignItems: 'center',
    shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.15, shadowRadius: 3.84, elevation: 3,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: Colors.primaryRed || '#d32f2f',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  cartBadgeText: { color: 'white', fontSize: 10, fontWeight: 'bold' },

  // --- Info Card ---
  infoContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -30, // Trượt lên trên ảnh một chút
    paddingHorizontal: 20,
    paddingBottom: 30,
    minHeight: screenHeight * 0.6, // Đảm bảo đủ cao
  },
  dragHandle: {
    width: 50, height: 5, backgroundColor: '#ddd', borderRadius: 5, alignSelf: 'center', marginTop: 10, marginBottom: 20
  },
  titleRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10,
  },
  titleText: {
    fontSize: 24, fontWeight: 'bold', color: '#333', flex: 1, marginRight: 10
  },
  priceText: {
    fontSize: 22, fontWeight: 'bold', color: Colors.primaryRed || '#d32f2f'
  },
  metaRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 25,
  },
  categoryBadge: {
    paddingHorizontal: 10, paddingVertical: 4, backgroundColor: Colors.gray1 || '#eee', borderRadius: 10, marginRight: 15
  },
  categoryText: { color: '#666', fontSize: 12, fontWeight: '600' },
  ratingContainer: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 5, color: '#888', fontSize: 12 },

  // --- Sections (Size, Desc) ---
  sectionContainer: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 12 },
  descriptionText: { fontSize: 15, color: '#555', lineHeight: 22, textAlign: 'justify' },

  // --- Size Selector ---
  sizesRow: { flexDirection: 'row', flexWrap: 'wrap' },
  sizeBox: {
    width: 50, height: 50, borderRadius: 12,
    borderWidth: 1.5, borderColor: '#ddd',
    justifyContent: 'center', alignItems: 'center',
    marginRight: 15, marginBottom: 10, backgroundColor: '#fff'
  },
  sizeBoxSelected: {
    borderColor: Colors.primaryRed || '#d32f2f', backgroundColor: Colors.primaryRed || '#d32f2f',
  },
  sizeText: { fontSize: 16, fontWeight: '600', color: '#333' },
  sizeTextSelected: { color: 'white' },

  // --- Sticky Footer ---
  stickyFooter: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'white',
    paddingHorizontal: 20, paddingVertical: 15,
    borderTopWidth: 1, borderTopColor: '#eee',
    shadowColor: "#000", shadowOffset: { width: 0, height: -3 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 10,
  },
  addToCartButton: {
    backgroundColor: Colors.primaryRed || '#d32f2f',
    flexDirection: 'row',
    height: 55, borderRadius: 15,
    justifyContent: 'center', alignItems: 'center',
  },
  addToCartText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
});