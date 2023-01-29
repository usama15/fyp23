import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Box, Center, View, Text, Pressable, Button, Input, TextArea, Select, CheckIcon, useToast } from 'native-base';
import { useNavigation, useRoute } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore';

const ApplicationDetail = () => {
    const navigation = useNavigation()
    const [email, setEmail] = useState('')
    let [service, setService] = React.useState("");
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
                remakes: email
            })
            .then((res) => {
                deleteData()
                Toast.show({
                    description: 'Application Approve'
                })
            })
    }
    const forwardApplication = async () => {
        if (service !== "") {
            await firestore()
                .collection(`${service}Application`)
                .doc()
                .set({
                    applicationStatus: 'approved',
                    details: data?.details,
                    title: data?.title,
                    userEmail: data?.userEmail,
                    userUid: data?.userUid,
                    remakes: email
                })
                .then((res) => {
                    deleteData()
                    Toast.show({
                        description: 'Application Approve'
                    })
                })
        } else {
            Toast.show({
                description: 'Select Department'
            })
        }
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
                            <Select mt='6' shadow={2} selectedValue={service} minWidth="200" accessibilityLabel="Choose Service" placeholder="Choose Department" _selectedItem={{
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
                                <Select.Item shadow={2} label="Finance" value="Finance" />
                                <Select.Item shadow={2} label="Admission" value="admission" />
                            </Select>
                            <TextArea h='40' onChangeText={(text) => setEmail(text)} mt='10' placeholder='Remarks' />
                        </View>
                        <Button mt='auto' onPress={() => forwardApplication()}>Forward</Button>
                        <Button mt='8' onPress={() => approveApplication()}>Approve</Button>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default ApplicationDetail