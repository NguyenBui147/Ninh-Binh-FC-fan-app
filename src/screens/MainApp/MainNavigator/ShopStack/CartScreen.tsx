import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../../../assets/colors/colors';
import { ProductsStackParamList } from '../../../../navigation/NavigationTypes';
import { useCart } from '../../../../context/CartContext';

type NavigationProp = NativeStackNavigationProp<ProductsStackParamList>;

const CartScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const { cartItems, removeFromCart, updateQuantity, totalCartValue } = useCart();

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
    };

    const renderEmptyCart = () => (
        <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="cart-off" size={80} color={Colors.gray} />
            <Text style={styles.emptyText}>Giỏ hàng của bạn đang trống</Text>
            <TouchableOpacity
                style={styles.shopButton}
                onPress={() => navigation.navigate('Products')}
            >
                <Text style={styles.shopButtonText}>TIẾP TỤC MUA SẮM</Text>
            </TouchableOpacity>
        </View>
    );

    const renderCartItem = ({ item }: { item: any }) => {
        return (
            <View style={styles.cartItem}>
                <Image source={{ uri: item.product.image }} style={styles.itemImage} />

                <View style={styles.itemInfo}>
                    <Text style={styles.itemName} numberOfLines={2}>{item.product.name}</Text>
                    <Text style={styles.itemSize}>Size: {item.size}</Text>
                    <Text style={styles.itemPrice}>{formatCurrency(item.product.price)}</Text>

                    <View style={styles.quantityRow}>
                        <View style={styles.quantityControl}>
                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                                <MaterialCommunityIcons name="minus" size={16} color="#333" />
                            </TouchableOpacity>
                            <Text style={styles.qtyText}>{item.quantity}</Text>
                            <TouchableOpacity
                                style={styles.qtyButton}
                                onPress={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                                <MaterialCommunityIcons name="plus" size={16} color="#333" />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => removeFromCart(item.id)}
                        >
                            <MaterialCommunityIcons name="trash-can-outline" size={20} color={Colors.primaryRed} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Giỏ hàng</Text>
                <View style={{ width: 24 }} />
            </View>

            {cartItems.length === 0 ? (
                renderEmptyCart()
            ) : (
                <>
                    <FlatList
                        data={cartItems}
                        keyExtractor={(item) => item.id}
                        renderItem={renderCartItem}
                        contentContainerStyle={styles.listContainer}
                        showsVerticalScrollIndicator={false}
                    />

                    <View style={styles.footer}>
                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tổng cộng:</Text>
                            <Text style={styles.totalValue}>{formatCurrency(totalCartValue)}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={() => navigation.navigate('CheckOut')}
                        >
                            <Text style={styles.checkoutText}>TIẾN HÀNH THANH TOÁN</Text>
                        </TouchableOpacity>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default CartScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.gray1 || '#f5f5f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#666',
        marginTop: 20,
        marginBottom: 30,
    },
    shopButton: {
        backgroundColor: Colors.primaryRed || '#d32f2f',
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 8,
    },
    shopButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    listContainer: {
        padding: 15,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 10,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    itemImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    itemSize: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    itemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: Colors.primaryRed || '#d32f2f',
        marginTop: 4,
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    quantityControl: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 6,
    },
    qtyButton: {
        padding: 6,
        backgroundColor: '#f9f9f9',
    },
    qtyText: {
        paddingHorizontal: 12,
        fontSize: 14,
        fontWeight: '600',
        color: '#333',
    },
    deleteButton: {
        padding: 5,
    },
    footer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 10,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 16,
        color: '#666',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.primaryRed || '#d32f2f',
    },
    checkoutButton: {
        backgroundColor: Colors.primaryRed || '#d32f2f',
        borderRadius: 12,
        paddingVertical: 15,
        alignItems: 'center',
    },
    checkoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
