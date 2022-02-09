import React, { useEffect, useState } from 'react'
import { Text, Flex, Button, Box, Center, Heading, Input, InputGroup, InputLeftAddon, NativeBaseProvider, Stack, Select, CheckIcon, Spacer, FormControl } from 'native-base'
import { View, Pressable, Alert } from 'react-native'   
import DateTimePicker from '@react-native-community/datetimepicker';
import { Icon } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCoffee, faCalendar } from '@fortawesome/free-solid-svg-icons';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

const Register = ({navigation}) => {

    const nrc_api = require('../nrc.json');

    


    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [selected_nrc_code, setNRCCode] = useState("12");
    const [ nrc_codes , SetNrcCode ] = useState(["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14"]);
    const [ name , setName ] = useState('');
    const [ phone, SetPhone ] = useState('');
    const [ nrc_state_code, SetNrcStateCode ] = useState();
    const [ nrc_number , SetNrcNumber ] = useState();
    const [ possible_NRC_State_code, SetPNRCStateCode ] = useState(nrc_api.data.filter( nrc => nrc.nrc_code == 12 ));
    const [ isValidStateCode , SetIsValidStateCode ] = useState(true);
    const [ isvalidNrcNumber, SetIsValidNrcNumber ] = useState(true);
    const [ nrc, setNrc ] = useState();


    const handleNameChange = text => setName(text);
    const handlePhoneChange = value => SetPhone(value);
    const handleNrcNumberChange = value => {
        SetIsValidNrcNumber( value.length == 6 ? true : false );
        SetNrcNumber(value)
        console.log({ nrc_number_changed : value })
    };
    const handleSelectedNrcCode = value => { 
        setNRCCode(value) 
        let p_nrc = nrc_api.data.filter( nrc => nrc.nrc_code == value );
        console.log(p_nrc);
        SetPNRCStateCode(p_nrc);
    };
    const handleNrcStateCodeChange = value => { 
        let isPossiable = possible_NRC_State_code.filter( nrc => nrc.name_en.toLowerCase() == value.toLowerCase() ).length;
        console.log({value});
        console.log({isPossiable});

        SetNrcStateCode(value) 
        if( !isPossiable )
        {
            console.log('is not possiable')
            console.log(isPossiable);
            SetIsValidStateCode(false);
        }
        else{
            SetIsValidStateCode(true);
        }


    };

    const formatNRCNumber = () => {
        if(nrc_number.length == 6)
        {
            let NRC_format = `${selected_nrc_code}/${nrc_state_code}(N)${nrc_number}`;
            setNrc(NRC_format);
        }
    }

    const storeData =  async() => {
        const id = Math.floor(1000 + Math.random() * 9000);
        f_phone = '+95'+phone;
        let user = { id, name, phone : f_phone, date, nrc }
        user = JSON.stringify(user);
        console.log(user)
        await AsyncStorageLib.setItem( "user" , user );
    }



    const formSubmit = () => {
        let NRC_format = `${selected_nrc_code}/${nrc_state_code}(N)${nrc_number}`;
        setNrc(NRC_format);

        if(isFormDataValid())
        {
            console.log({NRC_format, nrc})
            storeData()
            navigation.navigate('Home')
        }
        else{
            Alert.alert('Invalid Form Date')
        }
    }

    const isFormDataValid = () => {
        if( name.length != 0 && phone.length > 3 && isvalidNrcNumber && isValidStateCode )
        {
           
            return true;
        }

        return false;
    }


    

    const getNrcCodes = async () => {
        let codes = await nrc_api.data.map( nrc => nrc.nrc_code );
        codes =  [ ...new Set(codes) ];
        SetNrcCode(codes);
    }   

    // Date Picker Process 
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        console.log(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const FormatDate = (date) => {
        let f_date = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`
        return f_date;
    }

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <NativeBaseProvider>
            <View style={{ paddingVertical: '9%', paddingHorizontal: '13%'}}>
                <Heading size={'xl'} style={{ letterSpacing: 4 }}>Register Here.</Heading>
            </View>
            <Center mt={'3%'}>
                <Stack space={5} w="85%" maxW="330px">
                    <Heading size={"xs"} pb={0} color="#333">Name</Heading >
                    <Input value={name} onChangeText={ handleNameChange } size="lg" variant="outline" placeholder="Enter your Name" fontSize={18} borderColor="orange.500" />
                    <Heading size={"xs"} pb={0} color="#333">Phone Number</Heading>
                    <InputGroup w={{ base: "96%", md: "285" }} >
                        <InputLeftAddon children={"+95"} borderColor="orange.500"/>
                        <Input value={phone} onChangeText={ handlePhoneChange } w={{ base: "90%", md: "100%" }} fontSize={18} keyboardType='number-pad' placeholder="Mobile Phone Number" borderColor="orange.500" />
                    </InputGroup>
                    <Heading size={"xs"} pb={0} color="#333">Date Of Birth</Heading>
                    <Box w="100%" pt={1} ml={0}>
                        <Input isReadOnly={true} fontSize={18} p="2" px={3} value={ FormatDate(date) } InputRightElement={<Button mr={2} bgColor="orange.500" onPress={ showDatepicker }><Icon  as={ <FontAwesomeIcon color='#fff' icon={ faCalendar } />} size={5} mr={4} py='4' px={3} /></Button>} borderColor="orange.500" />
                    </Box>
                    <Heading size={"xs"} pb={0} color="#333">NRC Number</Heading>
                    <Flex direction='row'>
                        <Box w="2/5" maxW="20">
                            <Select borderColor={'orange.500'} fontSize={18} selectedValue={selected_nrc_code} minWidth="16" accessibilityLabel="Choose Service" placeholder={selected_nrc_code} _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon />
                        }} mt={1} onValueChange={itemValue => handleSelectedNrcCode(itemValue)}>
                            {
                                nrc_codes.map( code => (<Select.Item  label={code+" /"} key={code} value={code} />))
                            }
                            </Select>
                        </Box>
                        <Box w="1/4" pt={1} ml={3}>
                            <FormControl isInvalid={!isValidStateCode}>
                                <Input fontSize={18} value={ nrc_state_code } onChangeText={ handleNrcStateCodeChange } borderColor={"orange.500"} ></Input>
                                <FormControl.ErrorMessage>Invalid State!</FormControl.ErrorMessage>
                            </FormControl>
                        </Box>
                        <Box w="10" pt={1} ml={2}>
                                <Input isReadOnly={true} value="(N)" color={"#adadad"} fontSize={18} borderColor={"gray.300"} ></Input>
                        </Box>
                        <Box w="30%" pt={1} ml={2}>
                            <FormControl isInvalid={!isvalidNrcNumber}>
                                <Input onEndEditing={formatNRCNumber} fontSize={18} value={ nrc_number } keyboardType="number-pad" onChangeText={ handleNrcNumberChange } borderColor={"orange.500"} ></Input>
                                <FormControl.ErrorMessage>Invalid Number!</FormControl.ErrorMessage>
                            </FormControl>
                        </Box>
                    </Flex>


                    
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            display="default"
                            onChange={onChange}
                            maximumDate= {new Date()}
                        />
                    )}
                </Stack>
                <Box w={"100%"} mt={'20%'}>
                <Center>
                    <Button onPress={ formSubmit } w={"2/3"} p={4} backgroundColor={'orange.500'} borderRadius={20}><Heading size={'sm'} color={'white'}>Register Account</Heading></Button>
                </Center>
                </Box>
            </Center>
            <Box w={'100%'} backgroundColor={'orange.400'} h={'1/3'} mt={'18%'}>
            </Box>
        </NativeBaseProvider>
    )
}

export default Register

