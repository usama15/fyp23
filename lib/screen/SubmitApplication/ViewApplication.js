import { SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Box, Center, View, Text, Pressable, ScrollView } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import RoutesKey from '../../navigation/RoutesKey';
import { getDataFromPhone } from '../../utils/localStore';

const ViewApplication = () => {
  const [reqData, setReqData] = useState([])
  const [userData, setUserData] = useState([])
  const navigation = useNavigation()
  useEffect(() => {
    getUserData()
    firestore()
      .collection('ApproveApplication')
      .onSnapshot(snapshot => {
        const newPost = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(newPost)
        setReqData(newPost);
      });
  }, [])
  const getUserData = async () => {
    getDataFromPhone('user').then((data) => {
      setUserData(JSON.parse(data))
    })
  }
  return (
    <View bg='white' style={{ flex: 0, }}>
      <ScrollView>
        <Center px="1">
          <Box h='100%' w="100%" p="10px">
            <View>
              {
                reqData.filter(doc => doc.userUid == userData?.uid).map((item, index) => {
                  return (
                    <Pressable >
                      <Box p='6' borderRadius={10} bg='gray.200' mt='10'>
                        <Text>Title: {item?.title}</Text>
                        <Text>Student Mail: {item?.userEmail}</Text>
                        <Text>Application Status: {item?.applicationStatus}</Text>
                        <Text>Details: {item?.details}</Text>
                        <Text>Remarks: {item?.remakes}</Text>
                      </Box>
                    </Pressable>
                  )
                })
              }
            </View>
          </Box>
        </Center>
      </ScrollView>
    </View>
  )
}

export default ViewApplication