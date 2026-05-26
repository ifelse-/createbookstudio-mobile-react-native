// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, Text, View } from 'react-native';
import Header from '@/app/components/header';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADSON, monthCostINR, monthCostUSD, serverURL, yearCostINR, yearCostUSD } from '@/app/Constants';
import axios from 'axios';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import BannerAds from '@/app/components/bannerAds';

export default function Subscription() {

    const { colorScheme } = useColorScheme();
    const [processing, setProcessing] = useState(true);
    const [isFree, setFree] = useState(false);
    const [mHeight, setHeight] = useState(0);
    const [method, setMethod] = useState('');
    const [jsonData, setJsonData] = useState({});
    const [plan, setPlan] = useState('');
    const [cost, setCost] = useState('');
    const [sub, setSub] = useState('');
    const [billing, setBilling] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [type, setType] = useState('');
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        getLocal();
        getDetails();
    }, []);

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const found = require('../../../assets/nothing.png');

    async function getDetails() {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let type = await AsyncStorage.getItem('type');
        if (type === 'free') {
            setFree(true);
            setProcessing(false);
        } else {
            const dataToSend = {
                uid: await AsyncStorage.getItem('uid')
            };
            try {
                const postURL = serverURL + '/api/subscriptiondetail';
                await axios.post(postURL, dataToSend).then(async res => {
                    setJsonData(res.data.session);
                    setMethod(res.data.method);
                    setPlan(res.data.plan);
                    await AsyncStorage.setItem('method', res.data.method);
                    setData(res.data.session, res.data.method);
                });
            } catch (error) {
                showToast("Try Again because something went wrong");
            }
        }
    }

    function getDates(dat) {
        const dateEnd = new Date(dat);
        const endDate = dateEnd.toLocaleDateString('en-GB');
        return endDate;
    }

    async function setData(data, mat) {
        if (mat === 'paypal') {
            const {
                id,
                start_time,
                billing_info,
                subscriber,
            } = data;
            setBilling(subscriber.name.given_name + ' ' + subscriber.name.surname + ' ' + subscriber.shipping_address.address.address_line_1 + ' ' + subscriber.shipping_address.address.postal_code + ' ' + subscriber.shipping_address.address.country_code);
            if (plan === 'Monthly Plan') {
                if (method === 'paypal') {
                    setCost('$' + monthCostUSD);
                } else {
                    setCost('₹' + monthCostINR);
                }
            } else {
                if (method === 'paypal') {
                    setCost('$' + yearCostUSD);
                } else {
                    setCost('₹' + yearCostINR);
                }
            }
            setSub(id);
            setStartTime(getDates(start_time));
            setEndTime(getDates(billing_info.next_billing_time));
            setProcessing(false);
        } else {
            const {
                id,
                current_start,
                charge_at,
            } = data;

            const date = new Date(current_start * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const startDate = `${year}-${month}-${day}`;

            const date2 = new Date(charge_at * 1000);
            const year2 = date2.getFullYear();
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();
            const endDate = `${year2}-${month2}-${day2}`;
            let name = await AsyncStorage.getItem('mName');
            setBilling(name + ' ' + data['notes'].notes_key_1);
            if (plan === 'Monthly Plan') {
                if (method === 'paypal') {
                    setCost('$' + monthCostUSD);
                } else {
                    setCost('₹' + monthCostINR);
                }
            } else {
                if (method === 'paypal') {
                    setCost('$' + yearCostUSD);
                } else {
                    setCost('₹' + yearCostINR);
                }
            }
            setSub(id);
            setStartTime(startDate);
            setEndTime(endDate);
            setProcessing(false);

        }
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

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    async function download() {

        if (method === 'paypal') {
            const {
                billing_info,
                subscriber,
            } = jsonData;

            const html = `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Certificate</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            </head>
            
            <body>
                <div class="Frame2" style="width: 816px; height: 1000px; position: relative; background: white">
                    <div class="Receipt" style="width: 500px; height: 916.41px; left: 158px; top: 70px; position: absolute">
                        <img src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/bg.png?alt=media&token=c1083379-e48d-4f70-a396-0651e7a5d533" class="Bg" style="width: 500px; height: 916.41px; left: 0px; top: 0px; position: absolute; background: white"></img>
                        <div class="Frame" style="width: 221px; height: 52.15px; left: 139px; top: 58px; position: absolute">
                            <img class="Vector" style="width: 221px; height: 82.15px; left: 0px; top: 0px; position: absolute" src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/mugup.png?alt=media&token=fb4eee12-7e72-49e1-b3fd-b91eabf2d21c" />
                        </div>
                        <div class="99" style="width: 123.84px; left: 190px; top: 165px; position: absolute; text-align: center; color: #01020A; font-size: 40px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">${cost}</div>
                        <div class="PaymentMethodPaypal" style="width: 244.58px; height: 23.22px; left: 37.15px; top: 487.62px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Payment Method : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${method}</span></div>
                        <div class="NameShivanshuMeena" style="width: 396px; height: 23.22px; left: 37.15px; top: 376.16px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Name : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${subscriber.name.given_name + ' ' + subscriber.name.surname}</span></div>
                        <div class="MailShivanshuGmailCom" style="width: 396px; height: 23.22px; left: 37.15px; top: 431.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Mail : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${subscriber.email_address}</span></div>
                        <div class="YearlyPlan" style="left: 180px; top: 279px; position: absolute; text-align: center; color: #01020A; font-size: 24px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${plan}</div>
                        <div class="Total99" style="left: 165px; top: 827px; position: absolute; text-align: center; color: #01020A; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Total : ${cost}</div>
                        <div class="StartingDate02042024" style="width: 249.23px; height: 23.22px; left: 37.15px; top: 602.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Starting Date : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${startTime}</span></div>
                        <div class="SubscriptionIdI4fyhwemk6p8m" style="width: 396px; height: 23.22px; left: 37.15px; top: 544.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Subscription Id : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${sub}</span></div>
                        <div class="NextPayment02052024" style="width: 255.42px; height: 23.22px; left: 37.15px; top: 659.44px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Next Payment : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${getDates(billing_info.next_billing_time)}</span></div>
                        <div class="AddressMumbai" style="width: 396px; height: 23.22px; left: 37.15px; top: 715.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Address : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${subscriber.shipping_address.address.address_line_1 + ' ' + subscriber.shipping_address.address.postal_code + ' ' + subscriber.shipping_address.address.country_code}</span></div>
                    </div>
                </div>
            </body>
            
            </html>`;
            const { uri } = await Print.printToFileAsync({ html });
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Open With' });
        } else {
            const {
                id,
                current_start,
                charge_at,
            } = jsonData;

            let name = await AsyncStorage.getItem('mName');
            let email = await AsyncStorage.getItem('email');

            const date = new Date(current_start * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const startDate = `${year}-${month}-${day}`;

            const date2 = new Date(charge_at * 1000);
            const year2 = date2.getFullYear();
            const month2 = date2.getMonth() + 1;
            const day2 = date2.getDate();
            const endDate = `${year2}-${month2}-${day2}`;

            const html = `<!DOCTYPE html>
            <html>
            
            <head>
                <title>Certificate</title>
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">
            </head>
            
            <body>
                <div class="Frame2" style="width: 816px; height: 1000px; position: relative; background: white">
                    <div class="Receipt" style="width: 500px; height: 916.41px; left: 158px; top: 70px; position: absolute">
                        <img src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/bg.png?alt=media&token=c1083379-e48d-4f70-a396-0651e7a5d533" class="Bg" style="width: 500px; height: 916.41px; left: 0px; top: 0px; position: absolute; background: white"></img>
                        <div class="Frame" style="width: 221px; height: 52.15px; left: 139px; top: 58px; position: absolute">
                            <img class="Vector" style="width: 221px; height: 82.15px; left: 0px; top: 0px; position: absolute" src="https://firebasestorage.googleapis.com/v0/b/mugup-eceac.appspot.com/o/mugup.png?alt=media&token=fb4eee12-7e72-49e1-b3fd-b91eabf2d21c" />
                        </div>
                        <div class="99" style="width: 123.84px; left: 190px; top: 165px; position: absolute; text-align: center; color: #01020A; font-size: 40px; font-family: Montserrat; font-weight: 900; word-wrap: break-word">${cost}</div>
                        <div class="PaymentMethodPaypal" style="width: 244.58px; height: 23.22px; left: 37.15px; top: 487.62px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Payment Method : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${method}</span></div>
                        <div class="NameShivanshuMeena" style="width: 396px; height: 23.22px; left: 37.15px; top: 376.16px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Name : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${name}</span></div>
                        <div class="MailShivanshuGmailCom" style="width: 396px; height: 23.22px; left: 37.15px; top: 431.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Mail : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 500; word-wrap: break-word">${email}</span></div>
                        <div class="YearlyPlan" style="left: 180px; top: 279px; position: absolute; text-align: center; color: #01020A; font-size: 24px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">${plan}</div>
                        <div class="Total99" style="left: 165px; top: 827px; position: absolute; text-align: center; color: #01020A; font-size: 32px; font-family: Montserrat; font-weight: 700; word-wrap: break-word">Total : ${cost}</div>
                        <div class="StartingDate02042024" style="width: 249.23px; height: 23.22px; left: 37.15px; top: 602.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Starting Date : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${startDate}</span></div>
                        <div class="SubscriptionIdI4fyhwemk6p8m" style="width: 396px; height: 23.22px; left: 37.15px; top: 544.89px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Subscription Id : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${id}</span></div>
                        <div class="NextPayment02052024" style="width: 255.42px; height: 23.22px; left: 37.15px; top: 659.44px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Next Payment : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${endDate}</span></div>
                        <div class="AddressMumbai" style="width: 396px; height: 23.22px; left: 37.15px; top: 715.17px; position: absolute"><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 600; word-wrap: break-word">Address : </span><span style="color: #01020A; font-size: 16px; font-family: Montserrat; font-weight: 400; word-wrap: break-word">${jsonData['notes'].notes_key_1}</span></div>
                    </div>
                </div>
            </body>
            
            </html>`;
            const { uri } = await Print.printToFileAsync({ html });
            await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf', dialogTitle: 'Open With' });
        }

    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)}>
                <Header title={i18n.t('Subscription')} />
            </View>

            <View className='flex-1'>
                {processing ?
                    <View className="h-full justify-center self-center">
                        <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                    </View>
                    :
                    <>
                        {isFree ?

                            <View className="justify-center self-center " style={{ height: Dimensions.get('screen').height - mHeight - 60 }}>
                                <Image className="w-screen h-2/5 self-center " source={found} resizeMode="contain" />
                                <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl text-center">{i18n.t('NothingFound')}</Text>
                            </View>

                            :

                            <ScrollView showsVerticalScrollIndicator={false} className='mt-3'>
                                <View className='mx-4 flex-col mt-4'>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Billing')}</Text>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{billing}</Text>
                                </View>


                                <View className='mx-4 flex-col mt-6'>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('PaymentStatus')}</Text>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('StartingDate')} : {startTime}{'\n'}{i18n.t('NextPayment')} : {endTime}{'\n'}{i18n.t('Plan')} : {plan}</Text>
                                </View>

                                <View className='mx-4 flex-col mt-6'>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('InvoiceDetails')}</Text>
                                    <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('SubscriptionId')} : {sub}{'\n'}{i18n.t('Amount')} : {cost}{'\n'}{i18n.t('Method')} : {method.toUpperCase()}</Text>
                                </View>

                                <View className='mx-4 flex-col mt-6'>
                                    <Pressable onPress={download} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">{i18n.t('DownloadInvoice')}</Text>
                                    </Pressable>
                                    <Pressable onPress={() => router.navigate({ pathname: '/screens/menu/cancelSubscription', params: { sub, method } })} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs flex-1">{i18n.t('CancelSubscription')}</Text>
                                    </Pressable>
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

                            </ScrollView>


                        }
                    </>
                }

            </View>
            {type === 'free' ?
                <>
                    {ADSON ? <BannerAds /> : <></>}
                </>
                :
                <></>
            }
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View >
    );
}