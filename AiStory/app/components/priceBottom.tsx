// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import { Pressable, Text, View } from "react-native";
import PagerView from 'react-native-pager-view';
import { PageIndicator } from 'react-native-page-indicator';
import { useEffect, useState } from 'react';
import { getLocales } from 'expo-localization';
import { monthCostINR, monthCostUSD, yearCostINR, yearCostUSD } from '../Constants';
import { router } from 'expo-router';
import { I18n } from "i18n-js";
import { translations } from "../localizations"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PriceBottom() {

    const { colorScheme } = useColorScheme();
    const [currentPage, setCurrentPage] = useState(0);
    const [codeCurrency, setCurrency] = useState(getLocales()[0].currencyCode);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
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

    function redirect(plan, cost) {
        router.navigate({ pathname: '/screens/payments/paymentDetails', params: { plan: plan, cost: cost } });
    }

    return (
        <View className='h-5/6 w-11/12  self-center '>
            <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl">{i18n.t('Pricing')}</Text>
            <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mt-6">{i18n.t('Head7')}{'\n'}{i18n.t('Head8')}</Text>
            <PagerView scrollEnabled={true} onPageSelected={e => { setCurrentPage(e.nativeEvent.position) }} initialPage={0} collapsable={false} style={{ height: '75%', width: '91.666667%', marginTop: 24, alignSelf: "center" }}>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} key="1">
                    <Text>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-5xl">{codeCurrency === 'INR' ? '₹' + monthCostINR : '$' + monthCostUSD}</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base my-6">{i18n.t('MonthlyPlan')}</Text>
                    <Pressable onPress={() => redirect('Monthly Plan', codeCurrency === 'INR' ? '₹' + monthCostINR : '$' + monthCostUSD)} className="flex-row w-11/12 h-14 mb-4 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Pay')}</Text>
                    </Pressable>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }} key="2">
                    <Text>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-5xl">{codeCurrency === 'INR' ? '₹' + yearCostINR : '$' + yearCostUSD}</Text>
                    </Text>
                    <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base my-6">{i18n.t('YearlyPlan')}</Text>
                    <Pressable onPress={() => redirect('Yearly Plan', codeCurrency === 'INR' ? '₹' + yearCostINR : '$' + yearCostUSD)} className="flex-row w-11/12 h-14 mb-4 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Pay')}</Text>
                    </Pressable>
                </View>
            </PagerView>
            <View className='w-11/12'>
                <PageIndicator color={colorScheme === 'light' ? '#01020A' : '#fff'} style={{ alignSelf: 'center' }} count={2} current={currentPage} />
            </View>
        </View>
    );
}