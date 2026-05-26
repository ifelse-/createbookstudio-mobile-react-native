// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import { ActivityIndicator, Pressable, Text, TextInput, View } from 'react-native';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import { useEffect, useState } from 'react';
import Header from '@/app/components/header';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { serverURL } from '@/app/Constants';
import { router } from 'expo-router';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function Delete() {

    const { colorScheme, setColorScheme } = useColorScheme();
    const [inputValue, setInputValue] = useState('');
    const [load, setLoad] = useState(false);

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

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

    async function deleteAccount() {
        if (inputValue.length > 0) {
            let pass = await AsyncStorage.getItem('password');
            if (pass === inputValue) {
                setLoad(true);
                let userId = await AsyncStorage.getItem('uid');
                try {
                    const postURL = serverURL + `/api/deleteuser?userId=${userId}`;
                    const response = await axios.get(postURL);
                    if (response.data.success) {
                        logout();
                        setLoad(false);
                    } else {
                        setLoad(false);
                        showToast('Internal Server Error');
                    }
                } catch (error) {
                    setLoad(false);
                    showToast('Internal Server Error');
                }
            } else {
                showToast('Enter Correct Password')
            }

        } else {
            showToast('Enter Your Password')
        }
    }

    async function logout() {
        await AsyncStorage.clear();
        await AsyncStorage.setItem('first', 'false');
        await AsyncStorage.setItem('dark', 'false');
        setColorScheme('light');
        router.replace('/');
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('DeleteAccount')} />

            <Text className="text-start text-sm mt-6 mx-4" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>
                {i18n.t('Head4')}<Text onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('DeletionPolicy'), type: 'delete' } })} className="text-start text-sm mt-6 mx-4 underline" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('AccountDeletePolicy')}</Text>
            </Text>

            <View className="mt-4">
                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Password')}</Text>
                <TextInput secureTextEntry={true} onChangeText={(text) => setInputValue(text)} value={inputValue} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
            </View>

            <Pressable onPress={deleteAccount} disabled={load} className="flex-row w-11/12 h-14 mt-6 mb-4 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('DeleteAccount')}</Text>
            </Pressable>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View >
    );
}