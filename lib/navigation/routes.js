import React, { useEffect } from 'react';

import {
    createStackNavigator,
} from '@react-navigation/stack';
import 'react-native-gesture-handler';
import Routeskey from './RoutesKey';
import Welcome from '../screen/Welcome/Welcome';
import { useState } from 'react';
import { Box, Icon, IconButton, Text } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import StudentLogin from '../screen/SignIn/StudentLogin';
import StaffLogin from '../screen/SignIn/StaffLogin';
import StudentBottomNav from './studentBottomNav';
import AcademicBottomNav from './academicBottomNav';
import ApplicationDetail from '../screen/ApplicationDetails/ApplicationDetail';
import FinanceBottomNav from './financeBottomNav';
import FinanceApplicationDetail from '../screen/Finance/FinanceApplicationDetails';
import AdmissionBottomNav from './admissionBottomNav';


const Stack = createStackNavigator();

const Routes = () => {
    const [isloading, setIsloading] = useState(true);
    const [firstScreen, setFirstScreen] = useState('');
    const navigation = useNavigation()
    // useEffect(() => {
    //     getDataFromPhone('loginKey').then(token => {
    //         if (token !== null) {
    //             console.log(token, 'token');
    //             setFirstScreen(Routeskey.BOTTOMTAB);
    //             setIsloading(false);
    //             // props.navigation.navigate(Routeskey.BOTTOMNAV);
    //         } else {
    //             setFirstScreen(Routeskey.SPLASH);
    //             setIsloading(false);
    //             // props.navigation.navigate(Routeskey.WELCOME);
    //         }
    //     });
    // }, []);


    return (
        <>
            {!isloading == false ? (
                <Stack.Navigator
                    initialRouteName={firstScreen}
                    // {...this.props}
                    screenOptions={{
                        gestureEnabled: true,
                        gestureDirection: 'horizontal',
                        // cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                        headerTitleAlign: 'center',
                    }}>
                    <Stack.Screen
                        name={Routeskey.WELCOME}
                        component={Welcome}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.LOGINSTUDENT}
                        component={StudentLogin}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.LOGINSTAFF}
                        component={StaffLogin}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.STUDENTBOTTOM}
                        component={StudentBottomNav}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.ACADEMICBOTTOM}
                        component={AcademicBottomNav}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.ADMISSIONBOTTOM}
                        component={AdmissionBottomNav}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.FINANCEBOTTOM}
                        component={FinanceBottomNav}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.APPLICATIONDETAIL}
                        component={ApplicationDetail}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name={Routeskey.FINANCAPPLICATIONDETAIL}
                        component={FinanceApplicationDetail}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            ) :
                <Box>
                    <ActivityIndicator />
                </Box>
            }
        </>
    );
};

export default Routes;
