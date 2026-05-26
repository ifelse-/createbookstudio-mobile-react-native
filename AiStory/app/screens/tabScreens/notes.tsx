// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useState } from "react";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import AsyncStorage from "@react-native-async-storage/async-storage";
import StatusBarComp from "@/app/components/statusBar";
import Nothing from "@/app/components/nothing";

import NotesList from "@/app/components/notesList";
import { ADSON, serverURL } from "@/app/Constants";
import axios from "axios";
import UserIcon from "@/app/icons/UserIcon";
import { useFocusEffect } from "expo-router";
import CardAudible from "@/app/components/cardAudible";
import BannerAds from "@/app/components/bannerAds";

export default function Notes() {

    const { colorScheme } = useColorScheme();
    const [notes, setNotes] = useState([]);
    const [processing, setProcessing] = useState(true);
    const [mHeight, setHeight] = useState(0);
    const [type, setType] = useState('');

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useFocusEffect(
        useCallback(() => {
            getLocal();
            fetchUserNotes();
        }, [])
    );

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    const fetchUserNotes = async () => {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let userId = await AsyncStorage.getItem('uid');
        const postURL = serverURL + `/api/courses?userId=${userId}`;
        try {
            const response = await axios.get(postURL);
            setNotes(response.data);
            setProcessing(false);
        } catch (error) {
            fetchUserCourses();
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


    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)} className="mt-4 w-screen self-center flex-row  items-center">
                <View className=" flex-1 h-11 items-center flex-row">
                    <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: local === 'en' ? 30 : 24 }} className="ml-4">{i18n.t('Notes')}</Text>
                </View>
                <UserIcon />
            </View>
            {processing ?
                <View className="h-full justify-center self-center">
                    <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {notes.length > 0 ?
                        <View style={{ display: "flex", flexDirection: 'column', paddingBottom: 20 }}>
                            {
                                notes.map((course) => (
                                    <CardAudible key={course._id} data={course} />
                                ))
                            }
                        </View>
                        :
                        <>
                            <Nothing height={mHeight} />
                        </>
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
            <StatusBarComp />
        </View>
    );
}
