import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import MatchesScreen from '../../screens/MainApp/MainNavigator/ScheduleStack/MatchesScreen';
import LeaderBoardScreen from '../../screens/MainApp/MainNavigator/ScheduleStack/LeaderBoardScreen';
import Colors from '../../assets/colors/colors';

export default function ScheduleStack({ navigation }) {

    const [activeTab, setActiveTab] = useState('Matches');

    return (
        <View style={styles.container} >
            <View style={styles.tabContainer}>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'Matches' && styles.activeTabButton
                    ]}
                    onPress={() => setActiveTab('Matches')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'Matches' && styles.activeTabText
                    ]}>
                        Lịch thi đấu
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tabButton,
                        activeTab === 'LeaderBoard' && styles.activeTabButton
                    ]}
                    onPress={() => setActiveTab('LeaderBoard')}
                >
                    <Text style={[
                        styles.tabText,
                        activeTab === 'LeaderBoard' && styles.activeTabText
                    ]}>
                        BXH
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentContainer}>
                {activeTab === 'Matches' ? (
                    <MatchesScreen navigation={navigation} />
                ) : (
                    <LeaderBoardScreen navigation={navigation} />
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
        paddingVertical: 18,
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