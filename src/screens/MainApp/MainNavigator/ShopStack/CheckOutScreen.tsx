import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Colors from '../../../../assets/colors/colors';
import { useCart } from '../../../../context/CartContext';
import { ProductsStackParamList } from '../../../../navigation/NavigationTypes';
import { generateVNPayUrl } from '../../../../utils/vnpay';

type NavigationProp = NativeStackNavigationProp<ProductsStackParamList>;

const CheckOutScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const { totalCartValue } = useCart();
  const [vnpUrl, setVnpUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const handleVNPayCheckout = () => {
    setIsProcessing(true);
    // Generate VNPay URL
    const amount = totalCartValue > 0 ? totalCartValue : 10000; // minimum amount for vnpay is 10k but fallback
    const orderInfo = "Thanh toan don hang NinhBinh FC";

    try {
      const url = generateVNPayUrl(amount, orderInfo);
      setVnpUrl(url);
    } catch (error) {
      console.error("Error generating VNPay URL:", error);
      // Handle error, maybe show an alert
    } finally {
      setIsProcessing(false);
    }
  };

  const onNavigationStateChange = (navState: any) => {
    // Check if the URL matches your return URL
    if (navState.url.includes('vnpay_return')) {
      setVnpUrl(null); // Close WebView

      // Here you would typically parse the URL parameters to check if payment was successful
      // Example: const isSuccess = navState.url.includes('vnp_ResponseCode=00');
      // if (isSuccess) clearCart(), navigate to Success screen, etc.

      console.log("Returned from VNPay:", navState.url);
      // For now, let's just go back to cart or products
      navigation.navigate('Products');
    }
  };

  // If we have a URL, render the WebView
  if (vnpUrl) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.webviewHeader}>
          <TouchableOpacity onPress={() => setVnpUrl(null)} style={styles.closeButton}>
            <MaterialCommunityIcons name="close" size={24} color="#000" />
            <Text style={styles.closeText}>Hủy thanh toán</Text>
          </TouchableOpacity>
        </View>
        <WebView
          source={{ uri: vnpUrl }}
          style={{ flex: 1 }}
          onNavigationStateChange={onNavigationStateChange}
          startInLoadingState={true}
          renderLoading={() => (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primaryRed || '#d32f2f'} />
              <Text style={{ marginTop: 10 }}>Đang kết nối cổng thanh toán...</Text>
            </View>
          )}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thanh toán</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.summaryCard}>
          <Text style={styles.sectionTitle}>Tóm tắt đơn hàng</Text>

          <View style={styles.row}>
            <Text style={styles.label}>Tổng tiền hàng:</Text>
            <Text style={styles.value}>{formatCurrency(totalCartValue)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Phí vận chuyển:</Text>
            <Text style={styles.value}>Tùy chọn</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
            <Text style={styles.totalValue}>{formatCurrency(totalCartValue)}</Text>
          </View>
        </View>

        <Text style={styles.methodTitle}>Phương thức thanh toán</Text>

        <TouchableOpacity
          style={styles.payButton}
          onPress={handleVNPayCheckout}
          disabled={isProcessing || totalCartValue === 0}
        >
          <MaterialCommunityIcons name="credit-card-outline" size={24} color="#fff" />
          <Text style={styles.payButtonText}>Thanh toán qua VNPay</Text>
        </TouchableOpacity>

        {totalCartValue === 0 && (
          <Text style={styles.emptyCartWarning}>Giỏ hàng trống, không thể thanh toán.</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CheckOutScreen;

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
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  totalRow: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primaryRed || '#d32f2f',
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  payButton: {
    backgroundColor: '#005baa', // VNPay brand color
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#005baa',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  emptyCartWarning: {
    color: Colors.primaryRed || 'red',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  webviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  closeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  closeText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    zIndex: 10,
  }
});