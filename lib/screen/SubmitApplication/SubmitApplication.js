import { View, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Button, Center, Image, Input, Text, useToast, TextArea } from 'native-base'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import RoutesKey from '../../navigation/RoutesKey';
import { getDataFromPhone } from '../../utils/localStore';
const SubmitApplication = () => {
    const [title, setTitle] = useState('')
    const [details, setDetails] = useState('')
    const Toast = useToast()
    console.log(title, details)
    const handleSubmit = async () => {
        let userData = await getDataFromPhone('user')
        let newData = JSON.parse(userData)
        if (title.length && details.length) {
            await firestore()
                .collection('StudentApplication')
                .doc()
                .set({
                    details: details,
                    title: title,
                    userEmail: newData?.email,
                    userUid: newData?.uid
                })
                .then((res) => {
                    setTitle('')
                    setDetails('')
                    Toast.show({
                        description: 'Application Submit'
                    })
                })
        } else {
            Toast.show({
                description: 'Enter Title and Details'
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
                                Submit Application for Any Problem
                            </Text>
                        </View>
                        <Input value={title} onChangeText={(text) => setTitle(text)} mt='10' h='12' placeholder='Title' />
                        <TextArea value={details} onChangeText={(text) => setDetails(text)} mt='4' h='40' placeholder='Details' />
                        <Button onPress={handleSubmit} mb='10' alignSelf='center' w='40' mt='auto' bg='#2F469B'>
                            Submit
                        </Button>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default SubmitApplication