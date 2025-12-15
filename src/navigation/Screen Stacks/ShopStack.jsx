import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TicketsStack from './TicketsStack';
import ProductsStack from './ProductsStack';

import CheckOutScreen from '../../screens/MainApp/MainNavigator/ShopStack/CheckOutScreen';

import Colors from '../../assets/colors/colors';

export default function ShopStack({ navigation }) {

    const [activeTab, setActiveTab] = useState('Products');

    return (
        <View style={styles.container} >
            <View style={styles.tabContainer}>
                <Pressable
                    style={[
                        styles.tabButton,
                        activeTab === 'Products' && styles.activeTabButton
                    ]}
                    onPress={() => setActiveTab('Products')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Products' && styles.activeTabText
                    ]}>
                        Sản phẩm
                    </Text>
                </Pressable>
                <Pressable
                    style={[
                        styles.tabButton,
                        activeTab === 'Tickets' && styles.activeTabButton
                    ]}
                    onPress={() => setActiveTab('Tickets')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Tickets' && styles.activeTabText
                    ]}>
                        Vé trận đấu
                    </Text>
                </Pressable>
            </View>
            <View style={styles.contentContainer}>
                {activeTab === 'Products' ? (
                    <ProductsStack navigation={navigation} />
                ) : (
                    <TicketsStack navigation={navigation} />
                )}
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        overflow:'hidden'
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: Colors.maroon, 
        overflow:'hidden'
    },
    tabButton: {
        flex: 1, 
        paddingVertical: 12,
        alignItems: 'center',

    },
    activeTabButton: {
        backgroundColor: '#fff', 
        
    },
    tabText: {
        fontSize: 16,
        fontWeight: '800',
        color: Colors.white, 
    },
    activeTabText: {
        color: Colors.maroon, 
        fontWeight: 'bold',
    },
    contentContainer: {
        flex: 1,
    }
});