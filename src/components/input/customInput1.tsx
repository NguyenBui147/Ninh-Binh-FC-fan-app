import React from 'react';
import { StyleSheet, Text, View, TextInput, Image } from 'react-native';
import colors from '../../assets/colors/colors';

export default function CustomInput1({
  label = "",
  placeholder = "",
  secureTextEntry = false,
  icon = null,
  value = "",
  onChangeText = () => {String}
}) {
  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputTextsContainer}>
        <Text style={styles.loginText}>{label}</Text>
        <TextInput
          style={styles.loginTextInput}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {icon && <Image source={icon} style={styles.inputLogo} />}
    </View>
  );
}

const styles = StyleSheet.create({
    inputContainer: {
        width: '100%',
        marginVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.white,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: colors.gray,
        paddingHorizontal: 14,
        paddingVertical: 4,
      },
    
      inputTextsContainer: {
        flex: 1,
      },
      loginText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#7f7d7dff',
    
      },
    
      loginTextInput: {
    
        color: '#000000ff',
    
      },
    
      inputLogo: {
        width: 20,
        height: 20,
        marginLeft: 12,
      }
})