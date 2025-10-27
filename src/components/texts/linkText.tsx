import React from "react";
import { Pressable, StyleSheet, Text, ViewStyle, TextStyle } from "react-native";

type LinkProps = {
  text: string;
  onPress: () => void;
  style?: ViewStyle | TextStyle;
  underline?: boolean; 
};

const LinkText: React.FC<LinkProps> = ({ text, onPress, style, underline = true }) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }]}>
      <Text style={[styles.linkText, underline && { textDecorationLine: "underline" }, style]}>
        {text}
      </Text>
    </Pressable>
  );
};

export default LinkText;



const styles = StyleSheet.create({
  linkText: {
    color: "#007AFF",
    fontSize: 16,
  },
});
