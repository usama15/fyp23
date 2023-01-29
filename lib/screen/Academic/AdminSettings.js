import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Box, Center, View, Text, Pressable, Input, Button, Select, CheckIcon, useToast } from 'native-base';
import auth from '@react-native-firebase/auth';

const AdminSettings = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [service, setService] = React.useState("");
    const Toast = useToast()

    const loginhandler = async () => {
        if (email.length && password.length) {
            auth().createUserWithEmailAndPassword(email, password).then(async (res) =>
                await firestore()
                    .collection('Users')
                    .doc(res?.user?.uid)
                    .set({
                        email: email,
                        password: password,
                        userType: service,
                        uid: res?.user?.uid
                    })
                    .then((res) => {
                        console.log(res, 'User added!');
                    })
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
                            <Pressable >
                                <Box p='6' borderRadius={10} bg='gray.200' mt='10'>
                                    <Text>Add Users</Text>
                                    <Input onChangeText={(text) => setEmail(text)} mt='10' h='12' placeholder='Email' />
                                    <Input onChangeText={(text) => setPassword(text)} mt='4' h='12' placeholder='Password' />
                                    <Select mt='6' shadow={2} selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose user" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} _light={{
                                        bg: "coolGray.100",
                                        _hover: {
                                            bg: "coolGray.200"
                                        },
                                        _focus: {
                                            bg: "coolGray.200:alpha.70"
                                        }
                                    }} _dark={{
                                        bg: "coolGray.800",
                                        _hover: {
                                            bg: "coolGray.900"
                                        },
                                        _focus: {
                                            bg: "coolGray.900:alpha.70"
                                        }
                                    }} onValueChange={itemValue => setService(itemValue)}>
                                        <Select.Item shadow={2} label="Student" value="student" />
                                        <Select.Item shadow={2} label="Academic" value="academic" />
                                        <Select.Item shadow={2} label="Admission" value="admission" />
                                    </Select>
                                    <Button onPress={loginhandler} mb='10' alignSelf='center' w='40' mt='10' bg='#2F469B'>
                                        Add User
                                    </Button>
                                </Box>
                            </Pressable>
                        </View>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default AdminSettings