import AsyncStorageLib from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'
import { Box, Modal, Center, Divider, Flex, HStack, Heading, NativeBaseProvider, Text, VStack, Button, Spacer } from 'native-base'
import React, { useEffect, useState } from 'react'
import { BackHandler } from 'react-native'
import QRCode from 'react-native-qrcode-svg'
import { Icon } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faCalendar, faQrcode } from '@fortawesome/free-solid-svg-icons';


const Home = ({navigation}) => {

    const [ user , SetUser ] = useState({});
    const [ QRID , setQRID ] = useState();
    const [modalVisible, setModalVisible] = React.useState(false);

    const getUser = async () => {
        let user = await AsyncStorageLib.getItem('user');
        user = JSON.parse(user);
        await SetUser(user);
        await setQRID(user.name+"#"+user.id)
    }

    const FormatDate = (date) => {
        let f_date = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
        return f_date;
    }

    useEffect( () => {
        setTimeout( () => {
            getUser();
            console.log({QRID})
        },500)
    }, [])


    BackHandler.addEventListener('hardwareBackPress', function() {return true});
    return (
        
        <NativeBaseProvider>
            <Box backgroundColor={'orange.400'} w={'100%'}>
                <Heading py={7} px={2} pb={6} mt={"10%"} color={'white'} size="md" letterSpacing={2}> Good Morning, {user.name}  <Heading color={'white'} size={'sm'}>  </Heading> </Heading>
            </Box>
            <Center mt={'10%'} >
                <VStack w={'90%'}  space={7} p={6} borderRadius={11}>
                    <HStack space={1}>
                        <Heading w={'2/6'} fontSize={17}>User Name</Heading>
                        <Heading w={'1/6'}> - </Heading>
                        <Heading w={'3/6'} fontSize={17}>{ user.name }</Heading>
                    </HStack>
                    <Divider borderColor={'gray.300'} borderWidth='0.6'/>
                    <HStack space={1}>
                        <Heading w={'2/6'} fontSize={17}>Phone</Heading>
                        <Heading w={'1/6'}> - </Heading>
                        <Heading w={'3/6'} fontSize={17}>{ user.phone }</Heading>
                    </HStack>
                    <Divider borderColor={'gray.300'} borderWidth='0.6'/>
                    <HStack space={1}>
                        <Heading w={'2/6'} fontSize={17}>Date Of Birth</Heading>
                        <Heading w={'1/6'}> - </Heading>
                        <Heading w={'3/6'} fontSize={17}>{ FormatDate(new Date(user.date)) }</Heading>
                    </HStack>
                    <Divider borderColor={'gray.300'} borderWidth='0.6'/>
                    <HStack space={1}>
                        <Heading w={'2/6'} fontSize={17}>NRC Number</Heading>
                        <Heading w={'1/6'}> - </Heading>
                        <Heading w={'3/6'} fontSize={17}>{ user.nrc }</Heading>
                    </HStack>
                    
                </VStack>
                <Center>
                    <Button backgroundColor={'orange.400'} w="40" py={4} mt={10} px={5} onPress={() => { setModalVisible(!modalVisible); }}>
                        <Flex direction='row' >
                            <Text color={'white'} fontSize={16} mb={1}>Share QR Code</Text>  <Spacer></Spacer><FontAwesomeIcon style={{marginTop : 4}} color={'white'} icon={ faQrcode }></FontAwesomeIcon>
                        </Flex>
                    </Button>
                </Center>
            </Center>

            <Modal  isOpen={modalVisible} onClose={() => setModalVisible(false)} avoidKeyboard justifyContent="flex-end" size="xl">
                <Modal.Content bottom={'40%'}>
                    <Modal.CloseButton />
                    <Modal.Header>Share QR Code</Modal.Header>
                    <Modal.Body>
                        <Center p={10}>
                            <QRCode value={QRID} color="#eab308" size={150} ></QRCode>
                        </Center>
                    </Modal.Body>
                    <Modal.Footer justifyContent={'center'}>
                        <Heading size={'md'} color={'gray.400'}>{ user.name }#{user.id}</Heading>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
   

        </NativeBaseProvider>
    )
}

export default Home

