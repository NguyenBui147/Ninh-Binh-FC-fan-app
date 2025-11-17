import React from 'react';
import { Pressable, Text, StyleSheet, ImageBackground, View } from 'react-native';

export default function RoundedButton({ 
  text, 
  backgroundColor = '#e3e5e8ff', 
  onPress 
}) {

  
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
    width:'40%', 
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