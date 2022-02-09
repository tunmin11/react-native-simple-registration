import React, { useEffect, useState } from 'react'
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home'
import Register from './Screen/Register'
import Splash from './Screen/splash.screen';
import { SafeAreaView, Text } from 'react-native';
import { LogBox } from 'react-native';
import { NativeBaseProvider } from 'native-base';
import AsyncStorageLib from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const Stack = createStackNavigator();


const App = () => {



  return (
    <NativeBaseProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown : false }}>
          <Stack.Screen name='Splash' component={Splash} />
          <Stack.Screen name="Home" component={Home} options={{headerLeft: (props) => null, headerRight: (props) => null }} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </NavigationContainer>    
    </NativeBaseProvider>
  );
}

export default App