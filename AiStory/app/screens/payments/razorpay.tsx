// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import Header from '@/app/components/header';
import { ActivityIndicator, Dimensions, Image, Pressable, StatusBar, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { razorpaymonth, razorpayyear, serverURL } from '@/app/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function Razorpay() {

    const { plan, email, mName, lastName, post, address, country, admin, cost } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [processing, setProcessing] = useState(true);
    const found = require('../../../assets/payment.png');
    const [mHeight, setHeight] = useState(0);
    const [sub, setSub] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getLocal();
        getDetails();
    }, []);

    async function getDetails() {
        fetchUrl(razorpaymonth, razorpayyear);
    }

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

    async function fetchUrl(razorpayPlanIdMonth, razorpayPlanIdYear) {
        let fullAddress = address + ' ' + admin + ' ' + post + ' ' + country;
        let planId = razorpayPlanIdMonth;
        if (plan === 'Monthly Plan') {
            planId = razorpayPlanIdYear;
        }
        const dataToSend = {
            plan: planId,
            email: email,
            fullAddress: fullAddress
        };
        try {
            const postURL = serverURL + '/api/razorpaycreate';
            const res = await axios.post(postURL, dataToSend);
            await AsyncStorage.setItem('method', 'razorpay');
            await AsyncStorage.setItem('plan', plan);
            await AsyncStorage.setItem('cost', cost);
            setProcessing(false);
            _handlePressButtonAsync(res.data.short_url);
            setSub(res.data.id);
        } catch (error) {
            showToast("Try Again because something went wrong");
        }

    }

    const _handlePressButtonAsync = (approveHref) => {
        WebBrowser.openBrowserAsync(approveHref);
    };

    async function verifyRazorpay() {
        setProcessing(true);
        const dataToSend = {
            sub: sub
        };
        const postURL = serverURL + '/api/razorapypending';
        await axios.post(postURL, dataToSend).then(res => {
            if (res.data.status === 'active') {
                setProcessing(false);
                router.replace({ pathname: 'screens/payments/successful', params: { plan, email, mName, lastName, post, address, country, admin, cost, sub } })
            } else {
                setProcessing(false);
                router.replace({ pathname: 'screens/payments/payment', params: { plan, email, mName, lastName, post, address, country, admin, cost, msg: 'Payment Failed Retry' } })
            }
        });
    }

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)}>
                <Header title="Razorpay" />
            </View>

            <View className='flex-1'>

                {processing ?
                    <View className="h-full justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <View className="justify-center self-center w-screen" style={{ height: Dimensions.get('screen').height - mHeight - 60 }}>
                        <Image className="w-screen h-2/6 self-center " source={found} resizeMode="contain" />
                        <Pressable onPress={verifyRazorpay} className="flex-row w-11/12 h-14 mt-6 mb-9 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                            <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('VerifyPayment')}</Text>
                        </Pressable>
                    </View>
                }

            </View>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBar />
        </View>
    );
}