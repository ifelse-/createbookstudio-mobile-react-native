// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import { useColorScheme } from 'nativewind';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ADSON, serverURL } from '@/app/Constants';
import axios from 'axios';
import { ActivityIndicator, Dimensions, Image, ScrollView, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Header from "@/app/components/header";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import BannerAds from "@/app/components/bannerAds";

export default function Transactions() {

    const { colorScheme } = useColorScheme();
    const [trans, setTrans] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [mHeight, setHeight] = useState(0);
    const [type, setType] = useState('');
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    const found = require('../../../assets/nothing.png');

    useEffect(() => {
        getLocal();
        fetchUserTransaction();
    }, []);

    const fetchUserTransaction = async () => {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let userId = await AsyncStorage.getItem('uid');
        const postURL = serverURL + `/api/transcations?userId=${userId}`;
        try {
            const response = await axios.get(postURL);
            setTrans(response.data);
            setProcessing(false);
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    };

    async function getLocal() {
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
            await AsyncStorage.setItem('lang', 'en');
        } else {
            setLocal(lang)
        }
    }

    function getDates(dat) {
        const dateEnd = new Date(dat);
        const endDate = dateEnd.toLocaleDateString('en-GB');
        return endDate;
    }

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)}>
                <Header title={i18n.t('Transactions')} />
            </View>
            {processing ?
                <View className="h-full justify-center self-center">
                    <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false} className='mt-3'>
                    {trans.length > 0 ?
                        <>
                            {
                                trans.map((trans, index) => (
                                    <View key={index} className='mt-4 flex-row mx-4 items-center'>

                                        <View className='flex-col flex-1'>
                                            <Text className="text-start text-base" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{trans.plan}</Text>
                                            <Text className="text-start text-sm" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{trans.method.toUpperCase()} - {getDates(trans.date)}</Text>
                                        </View>

                                        <Text className="text-base " style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{trans.amount}</Text>

                                    </View>

                                ))
                            }
                        </>
                        :
                        <View className="justify-center self-center " style={{ height: Dimensions.get('screen').height - mHeight - 60 }}>
                            <Image className="w-screen h-2/5 self-center " source={found} resizeMode="contain" />
                            <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl text-center">{i18n.t('NothingFound')}</Text>
                        </View>
                    }
                </ScrollView>
            }
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