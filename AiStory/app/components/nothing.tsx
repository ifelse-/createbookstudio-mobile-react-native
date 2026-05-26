// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Dimensions, Image, Text, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import { I18n } from "i18n-js";
import { translations } from "../localizations"
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Nothing({ height }) {

    let bottomBar = useBottomTabBarHeight();
    const { colorScheme } = useColorScheme();
    let statusBar = Constants.statusBarHeight;
    let totalHeight = height + bottomBar + statusBar;
    let pageHeight = Dimensions.get('screen').height - totalHeight - 60;
    const found = require('../../assets/nothing.png');

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

    return (
        <View className="justify-center self-center " style={{ height: pageHeight }}>
            <Image className="w-screen h-2/4 self-center " source={found} resizeMode="contain" />
            <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-2xl text-center">{i18n.t('NothingFound')}</Text>
        </View>
    );
}