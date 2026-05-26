// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import UserIcon from "@/app/icons/UserIcon";
import { useCallback, useState } from "react";
import { serverURL } from "@/app/Constants";
import axios from "axios";
import TrendIcon from "@/app/icons/TrendIcon";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "@/app/components/card";
import { translations } from "../../localizations"
import Nothing from "@/app/components/nothing";
import { I18n } from "i18n-js";
import StatusBarComp from "@/app/components/statusBar";
import { useFocusEffect } from "expo-router";

export default function Home() {

    const { colorScheme } = useColorScheme();
    const [showTrends, setShowTrends] = useState(false);
    const [mainTopics, setMainTopics] = useState([]);
    const [courses, setCourses] = useState([]);
    const [mHeight, setHeight] = useState(0);
    const [type, setType] = useState('');

    const [processing, setProcessing] = useState(true);
    const navigation = useNavigation();
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useFocusEffect(
        useCallback(() => {
            getTrending();
            fetchUserCourses();
            const getLocal = async () => {
                let lang = await AsyncStorage.getItem('lang');
                if (lang === null || lang === undefined || lang === '') {
                    lang = 'en';
                    await AsyncStorage.setItem('lang', lang);
                }
                setLocal(lang);
            };
            getLocal();
        }, [local])
    );

    const fetchUserCourses = async () => {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let userId = await AsyncStorage.getItem('uid');
        const postURL = serverURL + `/api/courses?userId=${userId}`;
        try {
            const response = await axios.get(postURL);
            setCourses(response.data);
            setProcessing(false);
        } catch (error) {
            fetchUserCourses();
        }
    };

    async function getTrending() {
        const url = serverURL + '/api/trends';
        const response = await axios.post(url);
        if (response.data.success) {
            const { mainTopics } = response.data.message;
            setMainTopics(mainTopics);
            setShowTrends(true);
        } else {
            setShowTrends(false);
        }
    }

    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    const getTrendHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    async function trendCreate(item: string) {
        navigation.navigate('index', { screen: 'Create', params: { topic: item } });
    }



    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)} className="mt-4 w-screen self-center flex-row items-center ">
                <View className=" flex-1 h-11 items-center flex-row">
                    <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: local === 'en' ? 30 : 24 }} className="ml-4">{i18n.t('Courses')}</Text>
                </View>
                <UserIcon />
            </View>
            {processing ?
                <View className="h-full justify-center self-center">
                    <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    {showTrends ?
                        <View onLayout={(event) => getTrendHeight(event)} className="mt-4 mx-4 flex-col">
                            <View className="flex-row items-center">
                                <TrendIcon />
                                <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base ml-2">{i18n.t('Trending')}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
                                {mainTopics.map((item, index) => (
                                    <Pressable key={index} onPress={() => trendCreate(item)} className="mr-2 mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}>
                                        <Text className="text-xs px-3 py-2 capitalize" style={{ color: colorScheme === 'light' ? '#01020A' : '#fff', fontFamily: 'Montserrat_500Medium' }}>{item}</Text>
                                    </Pressable>
                                ))}
                            </View>
                        </View>
                        :
                        <></>
                    }
                    {courses.length > 0 ?
                        <View style={{ display: "flex", flexDirection: 'column', paddingBottom: 20 }}>
                            {
                                courses.map((course, index) => (
                                    <Card key={course._id} data={course} type={type} index={index}/>
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
            <StatusBarComp />
        </View>
    );
}
