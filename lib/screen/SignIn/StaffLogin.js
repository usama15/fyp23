import { View, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Box, Button, Center, Image, Input, Text, useToast } from 'native-base'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { saveDataInPhone } from '../../utils/localStore';
import { useNavigation } from '@react-navigation/native';
import RoutesKey from '../../navigation/RoutesKey';

const StaffLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const Toast = useToast()
    const navigation = useNavigation()

    const loginhandler = async () => {
        if (email.length && password.length) {

            auth().signInWithEmailAndPassword(email, password).then(async (res) =>
                firestore()
                    .collection('Users')
                    .doc(res?.user?.uid)
                    .onSnapshot(async documentSnapshot => {
                        let userData = await documentSnapshot.data()
                        console.log('User data: ', userData);
                        if (userData.userType == 'academic') {
                            saveDataInPhone('user', JSON.stringify(userData))
                            navigation.navigate(RoutesKey.ACADEMICBOTTOM)
                        } else if (userData.userType == 'finance') {
                            saveDataInPhone('user', JSON.stringify(userData))
                            navigation.navigate(RoutesKey.FINANCEBOTTOM)
                        }
                        else if (userData.userType == 'admission') {
                            saveDataInPhone('user', JSON.stringify(userData))
                            navigation.navigate(RoutesKey.ADMISSIONBOTTOM)
                        }
                    })
                // await firestore()
                //     .collection('Users')
                //     .doc(res?.user?.uid)
                //     .set({
                //         email: email,
                //         password: password,
                //         userType: 'academic',
                //         uid: res?.user?.uid
                //     })
                //     .then((res) => {
                //         console.log(res, 'User added!');
                //     })
            )
        } else {
            Toast.show({
                description: 'Enter Email Address and Password'
            })
        }
    }
    return (
        <View bg='white' style={{ flex: 0, }}>
            <SafeAreaView >
                <Center px="1">
                    <Box h='100%' w="100%" p="10px">
                        <View>
                            <Text textAlign={'center'} fontWeight='600' fontSize='18' mt='10'>
                                WelCome to Staff Login
                            </Text>
                        </View>
                        <Input onChangeText={(text) => setEmail(text)} mt='10' h='12' placeholder='Email' />
                        <Input onChangeText={(text) => setPassword(text)} mt='4' h='12' placeholder='Password' />
                        <Button onPress={loginhandler} mb='10' alignSelf='center' w='40' mt='auto' bg='#2F469B'>
                            Login
                        </Button>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default StaffLogin
