import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Box, Center, View, Text, Pressable } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import RoutesKey from '../../navigation/RoutesKey';

const AcademicHome = () => {
    const [reqData, setReqData] = useState([])
    const navigation = useNavigation()
    useEffect(() => {
        firestore()
            .collection('StudentApplication')
            .onSnapshot(snapshot => {
                const newPost = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setReqData(newPost);
            });
    }, [])
    console.log(reqData)
    return (
        <View bg='white' style={{ flex: 0, }}>
            <SafeAreaView >
                <Center px="1">
                    <Box h='100%' w="100%" p="10px">
                        <View>
                            {
                                reqData.map((item, index) => {
                                    return (
                                        <Pressable onPress={() => navigation.navigate(RoutesKey.APPLICATIONDETAIL, { 'data': item })}>
                                            <Box p='6' borderRadius={10} bg='gray.200' mt='10'>
                                                <Text>Title: {item?.title}</Text>
                                                <Text>Student Mail: {item?.userEmail}</Text>
                                            </Box>
                                        </Pressable>
                                    )
                                })
                            }
                        </View>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default AcademicHome