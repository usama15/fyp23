import { View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Image, Input, Text, useToast } from 'native-base'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import RoutesKey from '../../navigation/RoutesKey';
import { saveDataInPhone } from '../../utils/localStore';

const StudentLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigation = useNavigation()
    const Toast = useToast()
    // useEffect(() => {
    //     const subscriber = firestore()
    //     .collection('Users')
    //     .doc(userId)
    //     .onSnapshot(documentSnapshot => {
    //       console.log('User data: ', documentSnapshot.data());
    //     });
    // }, [])


    const loginhandler = () => {
        if (email.length && password.length) {

            auth().signInWithEmailAndPassword(email, password).then(async (res) =>
                firestore()
                    .collection('Users')
                    .doc(res?.user?.uid)
                    .onSnapshot(async documentSnapshot => {
                        let userData = await documentSnapshot.data()
                        console.log('User data: ', userData);
                        if (userData.userType == 'student') {
                            saveDataInPhone('user', JSON.stringify(userData))
                            navigation.navigate(RoutesKey.STUDENTBOTTOM)
                        }
                    })
            //     await firestore()
            //         .collection('Users')
            //         .doc(res?.user?.uid)
            //         .set({
            //             email: email,
            //             password: password,
            //             userType: 'student',
            //             uid:res?.user?.uid
            //         })
            //         .then((res) => {
            //             console.log(res, 'User added!');
            //         })
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
                                Welcome to Student Login
                            </Text>
                        </View>
                        <Input onChangeText={(text) => setEmail(text)} mt='10' h='12' placeholder='Email' />
                        <Input onChangeText={(text) => setPassword(text)} mt='4' h='12' placeholder='Password' />
                        <Button onPress={() => loginhandler()} mb='10' alignSelf='center' w='40' mt='auto' bg='#2F469B'>
                            Login
                        </Button>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default StudentLogin
