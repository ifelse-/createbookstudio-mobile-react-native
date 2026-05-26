// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from "expo-router";
import BackIcon from "@/app/icons/BackIcon";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";
import auth from "@react-native-firebase/auth";

export default function SignInPhone() {

    const params = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [inputValue, setInputValue] = useState('');
    const [load, setLoad] = useState(false);
    const [confirm, setConfirm] = useState(null);
    const [request, setRequest] = useState(true);
    const [seconds, setSeconds] = useState(60);
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    useEffect(() => {

        let timer: string | number | NodeJS.Timeout | undefined;

        if (isTimerRunning) {
            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 1) {
                        clearInterval(timer);
                        setIsTimerRunning(false);
                        setRequest(true);
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);

    }, [isTimerRunning]);

    const formattedTime = `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function requestOTP() {
        try {
            let phone = params.mPhone;
            let validPhone = phone.replace(/\s/g, '');
            const confirmation = await auth().signInWithPhoneNumber(validPhone);
            setConfirm(confirmation);
            setRequest(false);
            setSeconds(60);
            setIsTimerRunning(true);
        } catch (error) {
            console.log(error);
            console.log(params.mPhone);
            showToast('Enter Valid Phone No. With + & Country Code')
        }
    }

    const handleSubmit = async () => {
        if (inputValue.length > 0) {
            setLoad(true);
            confirmCode();
        } else {
            setLoad(false);
            showToast('Enter 6 Digit OTP')
        }
    };

    const confirmCode = async () => {
        try {
            await confirm.confirm(inputValue);
            let newUser = params.new;
            if (newUser === 'yes') {
                let validPhone = params.mPhone;
                let phone = validPhone.replace(/\s/g, '');
                router.navigate({ pathname: '/screens/auth/signUpPhone', params: { mPhone: phone } });
            } else {
                await AsyncStorage.setItem('auth', 'true');
                setLoad(false);
                router.replace('/');
            }
        } catch (error) {
            showToast('Invalid 6 Digit OTP')
        }
    }


    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            {request ?
                <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Click Generate OTP To Get{'\n'}6 Digit OTP</Text>
                :
                <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter 6 Digit OTP Sent On Your Phone no.</Text>
            }
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>OTP</Text>
                <TextInput selectionColor="lightgrey" keyboardType="number-pad" onChangeText={(text) => setInputValue(text)} value={inputValue} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <Pressable disabled={load} onPress={request ? requestOTP : handleSubmit} className="w-11/12 h-14 mt-6 justify-center self-center flex-row items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                {request ?
                    <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Generate OTP</Text>
                    :
                    <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Sign In</Text>
                }
            </Pressable>
            {isTimerRunning ?
                <Text className="text-center text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Request OTP again in {formattedTime} seconds</Text>
                :
                <></>
            }
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
