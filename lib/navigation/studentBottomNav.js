import { View, Text } from 'react-native'
import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import SubmitApplication from '../screen/SubmitApplication/SubmitApplication';
import ViewApplication from '../screen/SubmitApplication/ViewApplication';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createMaterialBottomTabNavigator();

const StudentBottomNav = () => {
    return (
        <Tab.Navigator screenOptions={{
            tabBarLabel:false
        }}>
            <Tab.Screen name="Submit" component={SubmitApplication}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="email-edit-outline" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen name="View" component={ViewApplication}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="email-open-multiple" color={color} size={26} />
                    ),
                }} />
        </Tab.Navigator>
    );
}

export default StudentBottomNav