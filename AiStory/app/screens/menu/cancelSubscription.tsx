// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import { router, useLocalSearchParams } from 'expo-router';
import Header from '@/app/components/header';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { serverURL } from '@/app/Constants';
import axios from 'axios';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function CancelSubscription() {

    const { colorScheme } = useColorScheme();
    const { sub, method } = useLocalSearchParams();
    const [inputValue, setInputValue] = useState('');
    const [load, setLoad] = useState(false);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getLocal();
    });

    async function getLocal() {
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
            await AsyncStorage.setItem('lang', 'en');
        } else {
            setLocal(lang)
        }
    }

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function cancel() {
        if (inputValue.length > 0) {
            let pass = await AsyncStorage.getItem('password');
            if (pass === inputValue) {
                setLoad(true);
                const dataToSend = {
                    id: sub
                };
                try {
                    if (method === 'paypal') {
                        const postURL = serverURL + '/api/paypalcancel';
                        await axios.post(postURL, dataToSend).then(async res => {
                            await AsyncStorage.setItem('type', 'free');
                            router.replace('/');
                            setLoad(false);
                        });
                    } else {
                        const postURL = serverURL + '/api/razorpaycancel';
                        await axios.post(postURL, dataToSend).then(async res => {
                            await AsyncStorage.setItem('type', 'free');
                            router.replace('/');
                            setLoad(false);
                        });
                    }
                } catch (error) {
                    showToast('Internal Server Error');
                }
            } else {
                showToast('Enter Correct Password')
            }

        } else {
            showToast('Enter Your Password')
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('CancelSubscription')} />
            <Text className="text-start text-sm mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>
                {i18n.t('Head3')}
            </Text>

            <View className="mt-4">
                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Password')}</Text>
                <TextInput secureTextEntry={true} onChangeText={(text) => setInputValue(text)} value={inputValue} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
            </View>

            <Pressable onPress={cancel} disabled={load} className="flex-row w-11/12 h-14 mt-6 mb-4 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Cancel')}</Text>
            </Pressable>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View >
    );
}