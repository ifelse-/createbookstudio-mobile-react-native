import { ActivityIndicator, Pressable, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import BackIcon from "@/app/icons/BackIcon";
import { useState } from "react";
import { useColorScheme } from "nativewind";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import { serverURL } from "@/app/Constants";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";

export default function ResetPassword() {

    const params = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [password, setPassword] = useState('');
    const [load, setLoad] = useState(false);

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const handleSubmit = async () => {
        if (password.length > 0) {
            setLoad(true);
            let email = params.email;
            const url = serverURL + '/api/reset-password';
            const response = await axios.post(url, {
                email, password
            });
            if (response.data.success) {
                setLoad(false);
                showToast(response.data.message);
                router.navigate('/screens/auth/signIn')
            } else {
                showToast(response.data.message)
                setLoad(false);
            }
        } else {
            showToast('Enter Your Password');
        }
    };


    return (
        <View className="flex-1 bg-white" style={{ paddingTop: Constants.statusBarHeight + 10 }}>
            <BackIcon />
            <Text className="text-start text-base mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: '#01020A' }}>Enter your new password</Text>
            <View className="mt-4">
                <Text className="text-start text-xs mt-6 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: '#01020A' }}>Password</Text>
                <TextInput selectionColor="lightgrey" secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: '#F9F9F9', borderRadius: 5, fontFamily: 'Montserrat_500Medium', paddingHorizontal: 8 }} />
            </View>
            <Pressable disabled={load} onPress={handleSubmit} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: '#01020A', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color='white' /> : <></>}
                <Text className="text-center text-base text-white" style={{ fontFamily: 'Montserrat_700Bold' }}>Change Password</Text>
            </Pressable>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}
