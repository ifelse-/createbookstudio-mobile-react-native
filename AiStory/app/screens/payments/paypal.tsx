// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import Header from '@/app/components/header';
import { ActivityIndicator, Dimensions, Image, Pressable, StatusBar, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { paypalmonth, paypalyear, serverURL } from '@/app/Constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function Paypal() {

    const { plan, email, mName, lastName, post, address, country, admin, cost } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();
    const [processing, setProcessing] = useState(true);
    const found = require('../../../assets/payment.png');
    const [mHeight, setHeight] = useState(0);
    const [sub, setSub] = useState('');
    const [paypalPlanIdYear, setPlanYear] = useState('');
    const [paypalPlanIdMonth, setPlanMonth] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getLocal();
        getDetails();
    }, []);

    async function getDetails() {
        const postURL = serverURL + `/api/policies`;
        const response = await axios.get(postURL);
        fetchUrl(paypalmonth, paypalyear);
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

    async function fetchUrl(paypalPlanIdMonth, paypalPlanIdYear) {

        let planId = paypalPlanIdYear;
        if (plan === 'Monthly Plan') {
            planId = paypalPlanIdMonth;
        }

        const dataToSend = {
            planId: planId,
            email: email,
            name: mName,
            lastName: lastName,
            post: post,
            address: address,
            country: country,
            admin: admin
        };
        try {
            const postURL = serverURL + '/api/paypal';
            const res = await axios.post(postURL, dataToSend);
            await AsyncStorage.setItem('method', 'paypal');
            await AsyncStorage.setItem('cost', cost);
            await AsyncStorage.setItem('plan', plan);
            const links = res.data.links;
            const approveLink = links.find(link => link.rel === "approve");
            const approveHref = approveLink ? approveLink.href : null;
            setSub(res.data.id);
            setProcessing(false);
            _handlePressButtonAsync(approveHref);
        } catch (error) {
            showToast("Try Again because something went wrong");
        }

    }

    const _handlePressButtonAsync = (approveHref) => {
        WebBrowser.openBrowserAsync(approveHref);
    };

    async function verifyPaypal() {
        setProcessing(true);
        const dataToSend = {
            sub: sub,
            method: 'paypal'
        };
        const postURL = serverURL + '/api/approve';
        const res = await axios.post(postURL, dataToSend);
        if (res.data.session.status === 'ACTIVE' || res.data.session.status === 'APPROVED') {
            setProcessing(false);
            router.replace({ pathname: 'screens/payments/successful', params: { plan, email, mName, lastName, post, address, country, admin, cost, sub } })
        } else {
            router.replace({ pathname: 'screens/payments/payment', params: { plan, email, mName, lastName, post, address, country, admin, cost, msg: 'Payment Failed Retry' } })
            setProcessing(false);
        }
    }

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)}>
                <Header title="Paypal" />
            </View>

            <View className='flex-1'>

                {processing ?
                    <View className="h-full justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <View className="justify-center self-center w-screen" style={{ height: Dimensions.get('screen').height - mHeight - 60 }}>
                        <Image className="w-screen h-2/6 self-center " source={found} resizeMode="contain" />
                        <Pressable onPress={verifyPaypal} className="flex-row w-11/12 h-14 mt-6 mb-9 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
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