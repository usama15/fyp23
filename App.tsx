import { View, Text } from 'react-native'
import React from 'react'
import Routes from './lib/navigation/routes'
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';


const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  )
}

export default App