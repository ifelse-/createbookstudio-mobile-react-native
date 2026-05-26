// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import Header from '@/app/components/header';
import StatusBarComp from '@/app/components/statusBar';
import { useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { ADSON, serverURL } from '@/app/Constants';
import axios from 'axios';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import BannerAds from '@/app/components/bannerAds';

export default function Profile() {

    const { colorScheme } = useColorScheme();
    const { username } = useLocalSearchParams();
    const [mName, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [visible, setVisible] = useState(true);
    const [load, setProcessing] = useState(false);
    const [type, setType] = useState('');
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getUserData();
        getLocal();
    }, []);

    async function getLocal() {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
            await AsyncStorage.setItem('lang', 'en');
        } else {
            setLocal(lang)
        }
    }

    async function getUserData() {
        setName(await AsyncStorage.getItem('mName'));
        const phoneNo = await AsyncStorage.getItem('phone');
        if (phoneNo === null || phoneNo === undefined || phoneNo === '' || phoneNo === 'undefined') {
            setPhone('');
        } else {
            setPhone(phoneNo);
        }
        const pass = await AsyncStorage.getItem('password');
        if (pass === null || pass === undefined || pass === '' || pass === 'undefined') {
            setVisible(false);
        } else {
            setVisible(true);
        }
        setEmail(await AsyncStorage.getItem('email'));
    }

    const showToast = (msg) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function submit() {
        if (!email || !mName || !phone) {
            showToast('Please fill in all required fields');
            return;
        }
        setProcessing(true);
        const uid = await AsyncStorage.getItem('uid');
        const postURL = serverURL + '/api/profile';
        try {
            const response = await axios.post(postURL, { email, mName, password, uid, phone });
            if (response.data.success) {
                showToast(response.data.message);
                await AsyncStorage.setItem('email', email);
                await AsyncStorage.setItem('mName', mName);
                await AsyncStorage.setItem('phone', phone);
                setProcessing(false)
            } else {
                setProcessing(false)
                showToast(response.data.message);
            }
        } catch (error) {
            setProcessing(false)
            showToast('Internal Server Error');
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
            className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={username} />
            <ScrollView showsVerticalScrollIndicator={false} className='mt-8'>
                <View>
                    <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Name')}</Text>
                    <TextInput onChangeText={(text) => setName(text)} value={mName} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2 " style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                </View>
                <View>
                    <Text className="text-start text-xs mt-4 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Email')}</Text>
                    <TextInput selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType='email-address' onChangeText={(text) => setEmail(text)} value={email} className="w-11/12 h-14 self-center mt-2 " style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                </View>
                <View>
                    <Text className="text-start text-xs mt-4 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('PhoneNo')}</Text>
                    <TextInput selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType='phone-pad' onChangeText={(text) => setPhone(text)} value={phone} className="w-11/12 h-14 self-center mt-2 " style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                </View>
                {visible ?
                    <View>
                        <Text className="text-start text-xs mt-4 mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Password')}</Text>
                        <TextInput selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} secureTextEntry={true} onChangeText={(text) => setPassword(text)} value={password} className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                    </View>
                    :
                    <></>
                }
                <Pressable disabled={load} onPress={submit} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                    {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                    <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('SaveChanges')}</Text>
                </Pressable>
            </ScrollView>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            {type === 'free' ?
                <>
                    {ADSON ? <BannerAds /> : <></>}
                </>
                :
                <></>
            }
            
            <StatusBarComp />
        </KeyboardAvoidingView>
    );
}