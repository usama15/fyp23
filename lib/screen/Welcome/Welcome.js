import { View, SafeAreaView } from 'react-native'
import React from 'react'
import { Box, Button, Center, Image, Text } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import RoutesKey from '../../navigation/RoutesKey'

const Welcome = () => {
    const navigation = useNavigation()
    return (
        <View bg='white' style={{ flex: 1 }}>
            <SafeAreaView >
                <Center px="1">
                    <Box w="100%" p="10px">
                        <Image alignSelf='center' mt='5' alt='' source={require('../../assets/index-removebg-preview.png')}/>
                        <View>
                            <Text textAlign={'center'} fontWeight='600' fontSize='18' mt='18%'>Welcome to UIT Student Support</Text>
                        </View>
                        <Box justifyItems={'center'} alignItems='center' mt='10%'>
                            <Button onPress={() => navigation.navigate(RoutesKey.LOGINSTUDENT)} w='40' bg='#2F469B' >
                                Continue as Student
                            </Button>
                            <Button onPress={() => navigation.navigate(RoutesKey.LOGINSTAFF)} w='40' mt='8' bg='#2F469B'>
                                Continue as Staff
                            </Button>
                        </Box>
                    </Box>
                </Center>
            </SafeAreaView>
        </View>
    )
}

export default Welcome