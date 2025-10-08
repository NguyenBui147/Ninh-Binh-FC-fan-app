import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

export default function RoundedButton({ text, backgroundColor = '#e3e5e8ff', onPress }) {
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
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});