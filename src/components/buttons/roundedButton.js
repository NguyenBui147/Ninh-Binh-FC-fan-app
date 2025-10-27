import React from 'react';
import { Pressable, Text, StyleSheet, ImageBackground, View } from 'react-native';

export default function RoundedButton({ 
  text, 
  backgroundColor = '#e3e5e8ff', 
  backgroundImageSource, // Prop mới để truyền ảnh
  onPress 
}) {

  // 1. NẾU CÓ ẢNH NỀN
  if (backgroundImageSource) {
    return (
      // Dùng View làm container để bo góc và ẩn phần ảnh thừa
      <View style={[styles.button, styles.imageButtonContainer]}>
        <ImageBackground 
          source={backgroundImageSource} 
          style={styles.imageBackground} // Style để lấp đầy View
          resizeMode="contain" // Đảm bảo ảnh che phủ hết nút
        >
          {/* Pressable trong suốt, lấp đầy để bắt sự kiện click */}
          <Pressable 
            onPress={onPress} 
            style={styles.pressableOverlay}
            android_ripple={{ color: 'rgba(255, 255, 255, 0.3)' }} // Hiệu ứng gợn sóng khi bấm
          >
            <Text style={styles.text}>{text}</Text>
          </Pressable>
        </ImageBackground>
      </View>
    );
  }

  // 2. NẾU KHÔNG CÓ ẢNH NỀN (như cũ)
  return (
    <Pressable style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%', 
    marginVertical: 10,
  },

  // Style riêng cho nút ảnh
  imageButtonContainer: {
    paddingVertical: 0,   // Reset padding vì View này chỉ để bo góc
    paddingHorizontal: 0,
    overflow: 'hidden',   // Rất quan trọng: Ẩn phần ảnh thừa
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressableOverlay: {
    // Pressable này sẽ nhận padding để tạo kích thước bên trong ảnh
    paddingVertical: 12,
    paddingHorizontal: 24,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Thêm một lớp phủ tối nhẹ (tùy chọn)
  },

  // Style cho chữ (dùng chung)
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});