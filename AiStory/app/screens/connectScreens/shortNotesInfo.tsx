// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Header from '@/app/components/header';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, Image, Pressable, Text, View } from 'react-native';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import { useEffect, useState } from 'react';
import { serverURL } from '@/app/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function ShortNotesInfo() {

    const { colorScheme } = useColorScheme();
    const { main, prompt } = useLocalSearchParams();
    const [load, setLoad] = useState(false);
    const welcome = require('../../../assets/short.png');
    const [processing, setProcessing] = useState(false);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        checkNotes();
        getLocal();
    }, []);

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

    async function checkNotes() {
        let storageName = 'short' + main;
        let notesCheck = await AsyncStorage.getItem(storageName);
        if (notesCheck !== null) {
            router.replace({ pathname: '/screens/connectScreens/shortNotes', params: { main: main, text: notesCheck } });
        } else {
            getNotes();
        }
    }

    async function getNotes() {
        setProcessing(true);
        const url = serverURL + '/api/getshort';
        let user = await AsyncStorage.getItem('uid');
        let course = main;
        const response = await axios.post(url, {
            user, course
        });
        if (response.data.success) {
            let storageName = 'short' + main;
            await AsyncStorage.setItem(storageName, '' + response.data.message.short);
            setProcessing(false);
            router.replace({ pathname: '/screens/connectScreens/shortNotes', params: { main: main, text: '' + response.data.message.short } });
        } else {
            setProcessing(false);
        }
    }

    async function generate() {
        setLoad(true);
        try {
            const postURL = serverURL + '/api/generateshort';
            let user = await AsyncStorage.getItem('uid');
            let course = main;
            const res = await axios.post(postURL, { user, course, prompt });
            if (res.data.success) {
                const generatedText = res.data.message;
                await AsyncStorage.setItem('short' + main, '' + generatedText);
                setLoad(false);
                router.replace({ pathname: '/screens/connectScreens/shortNotes', params: { main: main, text: '' + generatedText } });
            } else {
                setLoad(false);
            }
        } catch (error) {
            setLoad(false);
            showToast("Try Again because something went wrong");
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('GenerateShortNotes')} />
            <View className="flex-1">
                {processing ?
                    <View className="flex-1 justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <>
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-4 mt-6">{i18n.t('Head6')}</Text>
                        <View className="flex-1">
                            <Image className="w-full h-2/4 mt-4" resizeMode='contain' source={welcome} />
                            <Pressable onPress={generate} disabled={load} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                                {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                                <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Generate')}</Text>
                            </Pressable>
                        </View>
                    </>
                }
            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View>
    );
}