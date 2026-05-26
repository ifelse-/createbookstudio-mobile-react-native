// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import Header from '@/app/components/header';
import { Image, Pressable, ScrollView, StatusBar, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import NextIcon from '@/app/icons/NextIcon';
import { useEffect, useState } from 'react';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { paypalOn, razorpayOn } from '@/app/Constants';

export default function Payment() {

    const { plan, email, mName, lastName, post, address, country, admin, cost, msg } = useLocalSearchParams();
    const { colorScheme } = useColorScheme();

    const paypal = require('../../../assets/paypal.png');
    const upi = require('../../../assets/upi.png');
    const razorpay = require('../../../assets/razorpay.png');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        if (msg !== 'no') {
            showToast(msg);
        }
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

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title={i18n.t('Payment')} />
            <ScrollView className="flex-1 mt-4">

                <View className='mx-4 flex-col mt-2'>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Plan')}</Text>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{plan} : {cost}</Text>
                </View>

                <View className='mx-4 flex-col mt-4'>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Billing')}</Text>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{mName} {lastName} {'\n'}{address} {post} {'\n'}{country}</Text>
                </View>

                <View className='mx-4 flex-col mt-6'>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('PayVia')}</Text>
                    {paypalOn === true ?
                        <Pressable onPress={() => router.replace({ pathname: 'screens/payments/paypal', params: { plan, email, mName, lastName, post, address, country, admin, cost } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                            <Image source={paypal} className='w-5 h-5 mr-2' />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">PayPal</Text>
                            <NextIcon />
                        </Pressable>
                        :
                        <></>}
                    {/*
                    <Pressable style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                        <Image source={upi} className='w-5 h-5 mr-2' />
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">UPI</Text>
                        <NextIcon />
                    </Pressable>
                    */}
                    {razorpayOn === true ?
                        <Pressable onPress={() => router.replace({ pathname: 'screens/payments/razorpay', params: { plan, email, mName, lastName, post, address, country, admin, cost } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                            <Image source={razorpay} className='w-5 h-5 mr-2' />
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">Razorpay</Text>
                            <NextIcon />
                        </Pressable>
                        :
                        <></>}
                </View>

                <View className='mx-4 flex-col mt-6'>
                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('SubscriptionPolicy')}</Text>
                    <Pressable onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('BillingSubscriptionPolicy'), type: 'billing' } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">{i18n.t('BillingSubscriptionPolicy')}</Text>
                    </Pressable>
                    <Pressable onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('RefundPolicy'), type: 'refund' } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">{i18n.t('RefundPolicy')}</Text>
                    </Pressable>
                    <Pressable onPress={() => router.navigate({ pathname: 'screens/menu/policy', params: { title: i18n.t('CancellationPolicy'), type: 'cancel' } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">{i18n.t('CancellationPolicy')}</Text>
                    </Pressable>
                </View>
            </ScrollView >
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBar />
        </View >
    );
}