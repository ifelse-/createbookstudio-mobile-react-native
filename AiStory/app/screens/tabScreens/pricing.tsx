// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import StatusBarComp from '@/app/components/statusBar';
import { useColorScheme } from 'nativewind';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Constants from 'expo-constants';
import CheckIcon from '@/app/icons/CheckIcon';
import CancelIcon from '@/app/icons/CancelIcon';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import { ADSON, monthCostINR, monthCostUSD, yearCostINR, yearCostUSD } from '@/app/Constants';
import { router } from 'expo-router';
import BannerAds from '@/app/components/bannerAds';

export default function Pricing() {

    const { colorScheme } = useColorScheme();

    const [paidMember, setPaidMember] = useState('');
    const [codeCurrency, setCurrency] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        fetchData();
        getLocal();
        setCurrency(getLocales()[0].currencyCode);
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

    const fetchData = async () => {
        const typeUser = await AsyncStorage.getItem('type');
        setPaidMember(typeUser);
    };

    const redirectPayment = (plan, cost) => {
        if (paidMember === 'free') {
            if (plan !== 'free') {
                router.navigate({ pathname: '/screens/payments/paymentDetails', params: { plan: plan, cost: cost } });
            }
        } else {
            router.navigate('/screens/menu/subscription');
        }
    };

    const freePlan = [
        { name: i18n.t('SubTopic5'), check: true },
        
        { name: i18n.t('AudioCourse'), check: true },
       
        { name: i18n.t('LifetimeAccess'), check: true },
        { name: i18n.t('AdsFree'), check: true },
        { name: i18n.t('CourseInMultipleLanguages'), check: false },
        { name: i18n.t('SubTopic10'), check: false },
    ];

    const monthPlan = [
        { name: i18n.t('SubTopic5'), check: true },
        
        { name: i18n.t('AudioCourse'), check: true },
       
        { name: i18n.t('MonthAccess1'), check: true },
        { name: i18n.t('AdsFree'), check: false },
        { name: i18n.t('CourseInMultipleLanguages'), check: true },
        { name: i18n.t('SubTopic10'), check: true },
    ];

    const yearPlan = [
        { name: i18n.t('SubTopic5'), check: true },
        
        { name: i18n.t('AudioCourse'), check: true },
       
        { name: i18n.t('YearAccess1'), check: true },
        { name: i18n.t('AdsFree'), check: false },
        { name: i18n.t('CourseInMultipleLanguages'), check: true },
        { name: i18n.t('SubTopic10'), check: true },
    ];


    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View className="mt-4 w-screen self-center flex-row  items-center">
                <View className=" flex-1 h-11 items-center flex-row">
                    <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: local === 'en' ? 30 : 24 }} className="ml-4">{i18n.t('Pricing')}</Text>
                </View>
                <View className="mx-4 mt-4 h-9 " />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>

                <View className='flex-col mx-4 py-6 px-4 mt-4' style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <View className='flex-row items-center mb-4'>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-xl mr-2">{i18n.t('FreePlan')}</Text>
                        <Text style={{ fontFamily: 'Montserrat_900Black', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl">{codeCurrency === 'INR' ? '₹0' : '$0'}</Text>
                    </View>
                    {freePlan.map((planDetails, index) => (
                        <View key={index} className='flex-row mt-2'>
                            {planDetails.check ?
                                <CheckIcon />
                                :
                                <CancelIcon />
                            }
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm ml-2">{planDetails.name}</Text>
                        </View>
                    ))}
                    <Pressable onPress={() => redirectPayment('free')} className="flex-row w-full h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{paidMember === 'free' ? i18n.t('Current') : i18n.t('Modify')}</Text>
                    </Pressable>
                </View>

                <View className='flex-col mx-4 py-6 px-4 mt-8' style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <View className='flex-row  items-center mb-4'>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-xl mr-2">{i18n.t('MonthlyPlan')}</Text>
                        <Text style={{ fontFamily: 'Montserrat_900Black', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl">{codeCurrency === 'INR' ? '₹' + monthCostINR : '$' + monthCostUSD}</Text>
                    </View>
                    {monthPlan.map((planDetails, index) => (
                        <View key={index} className='flex-row mt-2'>
                            {planDetails.check ?
                                <CheckIcon />
                                :
                                <CancelIcon />
                            }
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm ml-2">{planDetails.name}</Text>
                        </View>
                    ))}
                    <Pressable onPress={() => redirectPayment('Monthly Plan', codeCurrency === 'INR' ? '₹' + monthCostINR : '$' + monthCostUSD)} className="flex-row w-full h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{paidMember === 'Monthly Plan' ? i18n.t('Current') : i18n.t('Modify')}</Text>
                    </Pressable>
                </View>

                <View className='flex-col mx-4 py-6 px-4 mt-8 mb-5' style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                    <View className='flex-row  items-center mb-4'>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-xl mr-2">{i18n.t('YearlyPlan')}</Text>
                        <Text style={{ fontFamily: 'Montserrat_900Black', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl">{codeCurrency === 'INR' ? '₹' + yearCostINR : '$' + yearCostUSD}</Text>
                    </View>
                    {yearPlan.map((planDetails, index) => (
                        <View key={index} className='flex-row mt-2'>
                            {planDetails.check ?
                                <CheckIcon />
                                :
                                <CancelIcon />
                            }
                            <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm ml-2">{planDetails.name}</Text>
                        </View>
                    ))}
                    <Pressable onPress={() => redirectPayment('Yearly Plan', codeCurrency === 'INR' ? '₹' + yearCostINR : '$' + yearCostUSD)} className="flex-row w-full h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{paidMember === 'Yearly Plan' ? i18n.t('Current') : i18n.t('Modify')}</Text>
                    </Pressable>
                </View>

            </ScrollView>
            {paidMember === 'free' ?
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