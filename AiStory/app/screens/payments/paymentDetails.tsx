// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from "expo-router";
import Header from "@/app/components/header";
import { useColorScheme } from "nativewind";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import {
    BottomSheetModal,
    BottomSheetScrollView,
    BottomSheetModalProvider,
    BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
import countriesData from '../../countries.json';
import CheckIcon from "@/app/icons/CheckIcon";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function PaymentDetails() {

    const { plan, cost } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [email, setEmail] = useState('');
    const [address, setAdress] = useState('');
    const [mName, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [post, setPost] = useState('');
    const [country, setCountry] = useState('');
    const [admin, setAdmin] = useState('');
    const [searchText, setSearchText] = useState('');
    const [countryLanguages, setFilteredCountry] = useState(countriesData);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        fetchData();
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

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const showToast = (msg) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const fetchData = async () => {
        const mail = await AsyncStorage.getItem('email');
        const name = await AsyncStorage.getItem('mName');
        setEmail(mail);
        setName(name);
    };

    const handleCountryPress = async (name, code) => {
        setCountry(name);
        setAdmin(code)
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = countriesData.filter(country =>
            country.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredCountry(filtered);
    };

    async function handleSubmit() {

        if (!email || !mName || !lastName || !post || !address || !country || !admin) {
            showToast('Please fill in all required fields');
            return;
        }

        router.navigate({ pathname: 'screens/payments/payment', params: { plan, email, mName, lastName, post, address, country, admin, cost, msg: 'no' } })

    }

    return (
        <GestureHandlerRootView>
            <BottomSheetModalProvider>
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
                    className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
                    <Header title={i18n.t('Payment')} />
                    <View className="flex-1 mt-4">
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-4 mt-2">{i18n.t('Head5')}</Text>
                            <View className="mt-6">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('FirstName')}</Text>
                                <TextInput onChangeText={text => setName(text)} value={mName} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                            </View>
                            <View className="mt-4">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('LastName')}</Text>
                                <TextInput onChangeText={text => setLastName(text)} value={lastName} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                            </View>
                            <View className="mt-4">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Email')}</Text>
                                <TextInput onChangeText={text => setEmail(text)} value={email} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="email-address" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                            </View>
                            <View className="mt-4">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Address')}</Text>
                                <TextInput onChangeText={text => setAdress(text)} value={address} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                            </View>
                            <View className="mt-4">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('PostalCode')}</Text>
                                <TextInput onChangeText={text => setPost(text)} value={post} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="number-pad" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                            </View>
                            <View className="mt-4">
                                <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Country')}</Text>
                                <Pressable onPress={handlePresentModalPress} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-11/12 h-14 self-center items-center mt-2 px-2 flex-row">
                                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs">{country}</Text>
                                </Pressable>
                            </View>
                            <BottomSheetModal
                                handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#fff' : '#01020A' }}
                                handleStyle={{
                                    backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', flex: 1, shadowColor: colorScheme === 'dark' ? '#F9F9F9' : '#01020A',
                                    shadowOffset: { width: 0, height: -10 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 5,
                                }}
                                ref={bottomSheetModalRef}
                                backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', elevation: 5 }}
                                index={1}
                                snapPoints={snapPoints}
                                keyboardBlurBehavior="restore"
                            >
                                <BottomSheetScrollView contentContainerStyle={{ backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff' }}>
                                    <BottomSheetTextInput value={searchText} onChangeText={handleSearch} placeholder={i18n.t('Search')} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} placeholderTextColor={colorScheme === 'light' ? "lightgrey" : "#000"} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, color: colorScheme === 'light' ? '#01020A' : '#fff', width: '91.666667%', height: 56, alignSelf: 'center', alignItems: 'center', marginTop: 8, paddingHorizontal: 8, flexDirection: "row" }} />
                                    {countryLanguages.map((countries, index) => (
                                        <Pressable key={index} className="h-14 mt-1 flex-row items-center mx-4" onPress={() => handleCountryPress(countries.name, countries.code)}>
                                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-sm">{countries.name}</Text>
                                            {countries.name === country ?
                                                <CheckIcon />
                                                :
                                                <></>
                                            }
                                        </Pressable>
                                    ))}
                                </BottomSheetScrollView>
                            </BottomSheetModal>
                            <Pressable onPress={handleSubmit} className="flex-row w-11/12 h-14 mt-6 mb-9 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                                <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Pay')}</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                    {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
                </KeyboardAvoidingView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}
