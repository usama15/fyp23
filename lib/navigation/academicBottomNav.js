import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import ViewApplication from '../screen/SubmitApplication/ViewApplication';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AcademicHome from '../screen/Academic/AcademicHome';
import AdminSettings from '../screen/Academic/AdminSettings';

const Tab = createMaterialBottomTabNavigator();

const AcademicBottomNav = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabel:false
        }}>
            <Tab.Screen name="Submit" component={AcademicHome}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="email-open-multiple" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="View" component={AdminSettings}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="settings" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default AcademicBottomNav