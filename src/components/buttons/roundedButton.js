import React from 'react';
import { Pressable, Text, StyleSheet, ImageBackground, View } from 'react-native';

export default function RoundedButton({ 
  text, 
  color,
  backgroundColor = '#e3e5e8ff', 
  onPress 
}) {

  
  return (
    <Pressable style={[styles.button, { backgroundColor, color }]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  
  button: {
    height:40,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});