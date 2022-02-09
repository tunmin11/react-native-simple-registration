import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import { Center, Flex, Heading, Image, Spacer, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { Button, View, SafeAreaView, StyleSheet, Pressable } from 'react-native'
import headingImage from '../assets/images/welcome.png'


const Splash = ({navigation}) => {

    const [ hasUser, setHasUser ] = useState(false);

    
  useEffect( () => {
    setTimeout( async () => { 

        let storedUser = await AsyncStorageLib.getItem('user');
        if(storedUser != null)
        {
          setHasUser(true);
          navigation.navigate('Home');
        }

     }, 0)

} , [])

    const styles = StyleSheet.create({
        button : {
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            paddingHorizontal: 40,
            borderRadius: 14,
        },
        primary_button : {
            backgroundColor: '#FFB067',
        },
        primary_outline_button : {
            borderColor: '#FFB067',
            borderWidth: 2,
            color : '#FFB067',
        },
        text: {
            fontSize: 18,
            lineHeight: 21,
            fontWeight: 'bold',
            letterSpacing: 0.25,
            color: 'white',
        },
        outline_text : {
            color: '#FFB067'
        }

        
    })

    return (
       <Center>
            <View style={{ marginTop : '25%'}}>
                <Image source={ headingImage } alt="header" width={ '80' } height={ '300' }></Image>
            </View>
            
            <Heading size="lg" style={{ marginTop: 20, letterSpacing: 4 }}>Be A Part Of Us!</Heading>
            
            <Text width={'75%'} style={{ textAlign : 'center', lineHeight : 33, fontSize: 15, letterSpacing : 1, marginTop: 20, color: '#695E5E'}}>Register now for Start Smart conference to meet the winners of Startup Competition</Text>
            <Text width={'50%'} style={{ textAlign: 'center', lineHeight : 33, fontSize: 14, letterSpacing: 1, color: '#231414' }}>#startup #competition #2022 #winner #beReal</Text>

            <Center width={'80%'}>
                <Flex direction='row' mt='30%'>
                    <Pressable style={ { ...styles.button, ...styles.primary_button } } title="" >
                        <Text style={ styles.text }>Sign In</Text>
                    </Pressable>
                    <Spacer/>
                    <Pressable style={{ ...styles.button, ...styles.primary_outline_button }} title="" onPress={ () => navigation.navigate('Register')} >
                        <Text style={{ ...styles.text, ...styles.outline_text }}>Sign Up</Text>
                    </Pressable>
                </Flex>
            </Center>

       </Center>
    )
}

export default Splash

