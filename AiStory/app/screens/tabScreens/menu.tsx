// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Pressable, ScrollView, Text, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import MoonIcon from "@/app/icons/MoonIcon";
import SunIcon from "@/app/icons/SunIcon";
import LangIcon from "@/app/icons/LangIcon";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StatusBarComp from "@/app/components/statusBar";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import { useEffect, useState } from "react";
import TransactionIcon from "@/app/icons/TransactionIcon";
import SubscriptionIcon from "@/app/icons/SubscriptionIcon";
import DeleteIcon from "@/app/icons/DeleteIcon";
import LogoutIcon from "@/app/icons/LogoutIcon";
import CertificateIcon from "@/app/icons/CertificateIcon";
import { ADSON } from "@/app/Constants";
import BannerAds from "@/app/components/bannerAds";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function Menu() {

    const { colorScheme, setColorScheme } = useColorScheme();
    const [type, setType] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;


    useEffect(() => {
        getLocal();
    });

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

    async function changeMode() {
        if (colorScheme === 'light') {
            setColorScheme('dark');
            await AsyncStorage.setItem('dark', 'true');
        } else {
            setColorScheme('light');
            await AsyncStorage.setItem('dark', 'false');
        }
    }

    async function logout() {
        let isGoogle = await AsyncStorage.getItem('google');
        if (isGoogle) {
            GoogleSignin.revokeAccess();
            GoogleSignin.signOut();
        }
        await AsyncStorage.clear();
        await AsyncStorage.setItem('first', 'false');
        await AsyncStorage.setItem('dark', 'false');
        setColorScheme('light');
        router.replace('/');
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View className="mt-4 w-screen self-center flex-row  items-center">
                <View className="flex-1 h-11 items-center flex-row">
                    <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: local === 'en' ? 30 : 24 }} className="ml-4">{i18n.t('Menu')}</Text>
                </View>
                <View className="mx-4 mt-4 h-9 " />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <Pressable onPress={changeMode} className="flex-row h-14 mx-4 items-center px-2 mt-4" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    {colorScheme === 'light' ?
                        <MoonIcon />
                        :
                        <SunIcon />
                    }
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{colorScheme === 'light' ? i18n.t('DarkMode') : i18n.t('LightMode')}</Text>
                </Pressable>

                <Pressable onPress={() => router.replace('/screens/connectScreens/language')} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <LangIcon />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('Language')}</Text>
                </Pressable>

                <Pressable onPress={() => router.navigate('/screens/menu/transactions')} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <TransactionIcon />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('Transactions')}</Text>
                </Pressable>

                <Pressable onPress={() => router.navigate('/screens/menu/subscription')} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <SubscriptionIcon />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('Subscription')}</Text>
                </Pressable>

                <Pressable onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('TermsConditions'), type: 'terms' } })} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <CertificateIcon size={false} />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('TermsConditions')}</Text>
                </Pressable>

                <Pressable onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('PrivacyPolicy'), type: 'privacy' } })} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <CertificateIcon size={false} />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('PrivacyPolicy')}</Text>
                </Pressable>

                <Pressable onPress={() => router.navigate('/screens/menu/delete')} className="flex-row mt-2 h-14 mx-4 items-center px-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <DeleteIcon />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('DeleteAccount')}</Text>
                </Pressable>

                <Pressable onPress={logout} className="flex-row mt-2 h-14 mx-4 items-center px-2 mb-4" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <LogoutIcon />
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-3">{i18n.t('Logout')}</Text>
                </Pressable>

            </ScrollView>

            {type === 'free' ?
                <>
                    {ADSON ? <BannerAds /> : <></>}
                </>
                :
                <></>
            }

            <StatusBarComp />
        </View>
    );
}
