// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import BackIcon from "@/app/icons/BackIcon";
import { useEffect, useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import { company, logo, name, serverURL } from "@/app/Constants";
import axios from "axios";
import { router } from "expo-router";

export default function ForgotPassword() {

    const { colorScheme } = useColorScheme();
    const [email, setEmail] = useState('');
    const [otpGenerated, setOtpGenerated] = useState('');
    const [entered, setEntered] = useState('');
    const [load, setLoad] = useState(false);
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

    const handleSubmit = async () => {
        if (email.length > 0) {
            let generatedOtp = '';
            const characters =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

            for (let i = 0; i < 6; i++) {
                generatedOtp += characters
                    .charAt(Math
                        .floor(Math.random() * characters.length));
            }
            setOtpGenerated(generatedOtp)
            setLoad(true);
            const url = serverURL + '/api/forgot';
            const response = await axios.post(url, {
                email, name, company, logo, generatedOtp
            });
            if (response.data.success) {
                setLoad(false);
                setSeconds(60);
                setIsTimerRunning(true);
                showToast(response.data.message);
            } else {
                showToast(response.data.message)
                setLoad(false);
            }
        } else {
            showToast('Enter Your Email');
        }
    };

    async function verifyOTP() {
        if (entered !== '') {
            if (entered === otpGenerated) {
                router.navigate({ pathname: '/screens/auth/resetPassword', params: { email: email } });
            } else {
                showToast('Invalid OTP');
            }
        } else {
            showToast('Enter Your OTP');
        }
    }


    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter your Email to Send Reset{'\n'}OTP</Text>
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Email</Text>
                <TextInput selectionColor="lightgrey" keyboardType="email-address" onChangeText={(text) => setEmail(text)} value={email} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            {otpGenerated === '' ? <></>
                :
                <>
                    <View className="mt-4">
                        <Text className="text-start text-xs mt-2 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>OTP</Text>
                        <TextInput selectionColor="lightgrey" keyboardType="default" onChangeText={(text) => setEntered(text)} value={entered} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
                    </View>
                    <Pressable onPress={verifyOTP} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Verify OTP</Text>
                    </Pressable>
                </>}
            <Pressable disabled={isTimerRunning} onPress={handleSubmit} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Send OTP</Text>
            </Pressable>
            {isTimerRunning ?
                <Text className="text-center text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Resend OTP again in {formattedTime} seconds</Text>
                :
                <></>
            }
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
