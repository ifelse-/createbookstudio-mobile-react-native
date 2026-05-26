import { ActivityIndicator, Pressable, Text, TextInput, TouchableOpacity, View } from "react-native";
import Constants from 'expo-constants';
import { router } from "expo-router";
import BackIcon from "@/app/icons/BackIcon";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInEmail() {

    const { colorScheme } = useColorScheme();
    const [inputValue, setInputValue] = useState('');
    const [load, setLoad] = useState(false);

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const handleSubmit = async () => {
        if (inputValue.length > 0) {
            setLoad(true);
            const pass = await AsyncStorage.getItem('password');
            if (pass === inputValue) {
                await AsyncStorage.setItem('auth', 'true');
                setLoad(false);
                router.replace('/');
            } else {
                setLoad(false);
                showToast('Incorrect Password');
            }
        } else {
            setLoad(false);
            showToast('Enter Your Password')
        }
    };

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter your Password To Sign In</Text>
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Password</Text>
                <TextInput selectionColor="lightgrey" secureTextEntry={true} onChangeText={(text) => setInputValue(text)} value={inputValue} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <TouchableOpacity onPress={() => router.navigate('/screens/auth/forgotPassword')} className="mt-6 mx-4" activeOpacity={1}>
                <Text className="text-start text-xs" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Forgot Password ?</Text>
            </TouchableOpacity>
            <Pressable disabled={load} onPress={handleSubmit} className="w-11/12 h-14 mt-6 justify-center self-center flex-row items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Sign In</Text>
            </Pressable>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
