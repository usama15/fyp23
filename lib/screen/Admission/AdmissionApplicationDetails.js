import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Center, View, Text, Pressable, Button, Input, TextArea, Select, CheckIcon, useToast } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const AdmissionApplicationDetail = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    const Toast = useToast()
    const route = useRoute()
    const { data } = route.params
    const approveApplication = async () => {
        await firestore()
            .collection('ApproveApplication')
            .doc()
            .set({
                applicationStatus: 'approved',
                details: data?.details,
                title: data?.title,
                userEmail: data?.userEmail,
                userUid: data?.userUid,
                remakesAcademic: data?.remakes,
                remakes: email
            })
            .then((res) => {
                deleteData()
                Toast.show({
                    description: 'Application Approve'
                })
            })
    }
    const deleteData = async () => {
        await firestore()
            .collection('StudentApplication')
            .doc(data?.id)
            .delete()
            .then(() => {
                navigation.goBack()
                console.log('data deleted!');
            });
    }
    return (
        <View bg='white' style={{ flex: 0, }}>
            <SafeAreaView >
                <Center px="1">
                    <Box h='100%' w="100%" p="10px">
                        <Text mt='3' fontSize='22' textAlign='center'>Application Detail</Text>
                        <View p='4'>
                            <Text fontSize='18'>Title: {data?.title}</Text>
                            <Text fontSize='18' mt='4'>Student Email: {data?.userEmail}</Text>
                            <Text fontSize='18' mt='4'>Detail: {data?.details}</Text>
                            <TextArea h='40' onChangeText={(text) => setEmail(text)} mt='10' placeholder='Remarks' />
                        </View>
                        <Button mt='8' onPress={() => approveApplication()}>Approve</Button>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default AdmissionApplicationDetail