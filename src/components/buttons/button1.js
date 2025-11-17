import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import Colors from '../../assets/colors/colors';
export default function button1({ 
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
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 3,
  },
  buttonText: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: 'bold',
    }
  
});