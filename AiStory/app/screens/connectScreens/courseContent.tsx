// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useColorScheme } from "nativewind";
import { ActivityIndicator, Dimensions, Image, Pressable, ScrollView, Text, View } from "react-native";
import Constants from 'expo-constants';
import Header from "@/app/components/header";
import * as Progress from 'react-native-progress';
import FlashCardIcon from "@/app/icons/FlashCardIcon";
import CertificateIcon from "@/app/icons/CertificateIcon";
import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PlayIcon from "@/app/icons/PlayIcon";
import CheckIcon from "@/app/icons/CheckIcon";
import { ADSON, company, INTERSTITIAL, logo, name, serverURL } from "@/app/Constants";
import axios from "axios";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import VoiceIcon from "@/app/icons/VoiceIcon";
import { Path, Svg } from "react-native-svg";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import Toast from "react-native-toast-message";
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = INTERSTITIAL === '' ? TestIds.INTERSTITIAL : INTERSTITIAL;

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});

export default function CourseContent() {

    const { colorScheme } = useColorScheme();
    const [isComplete, setIsCompleted] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const { dat, mainTopic, type, courseId, end, lang, photo } = useLocalSearchParams();
    const [jsonData, setJson] = useState(null);
    const [isLoading, setLoading] = useState('');
    const [mainKey, setMainKey] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const unsubscribe = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        // Start loading the interstitial straight away
        interstitial.load();

        // Unsubscribe from events on unmount
        return unsubscribe;
    }, []);

    useFocusEffect(
        useCallback(() => {
            updateBar();
        }, [])
    );

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function updateBar() {
        let doneCount = 0;
        let totalTopics = 0;
        const dats = JSON.parse(dat);
        const mainKeyTopic = Object.keys(dats)[0];
        dats['chapters'].forEach((subtopic: { done: any; }) => {

            if (subtopic.done) {
                doneCount++;
            }
            totalTopics++;
        });

        const completionPercentage = Math.round((doneCount / totalTopics) * 100);
        setPercentage(completionPercentage);
        if (completionPercentage >= 100) {
            setIsCompleted(true);
        }
        fetchData();
    }

    const fetchData = async () => {
        try {
            const json = await AsyncStorage.getItem('jsonData');
            if (json !== null) {
                const parsedData = JSON.parse(json);
                const mainTopicKey = Object.keys(parsedData)[0];
                setMainKey(mainTopic);
                setJson(parsedData);
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    };

    async function CountDoneTopics() {
        let doneCount = 0;
        let totalTopics = 0;
        const dats = JSON.parse(dat);
        const mainKeyTopic = Object.keys(dats)[0];
        dats['chapters'].forEach((subtopic: { done: any; }) => {

            if (subtopic.done) {
                doneCount++;
            }
            totalTopics++;
        });

        const completionPercentage = Math.round((doneCount / totalTopics) * 100);
        setPercentage(completionPercentage);
        if (completionPercentage >= 100) {
            setIsCompleted(true);
        }
    }

    async function redirect(title) {
        handleSelect(title)
    }

    const handleSelect = async (mainTitle) => {

        const typeUser = await AsyncStorage.getItem('type');
        if (typeUser === 'free') {
            if (loaded && ADSON) {
                try {
                    await interstitial.show();
                } catch (error) {
                    continueWithNoAds(mainTitle)
                }
            }
        }

        continueWithNoAds(mainTitle);

    };

    async function continueWithNoAds(mainTitle) {

        const mSubTopic = jsonData['chapters'].find(subtopic => subtopic.title === mainTitle);

        if (mSubTopic.story === '' || mSubTopic.story === undefined || mSubTopic.story === null) {

            const prompt = `Strictly in ${lang} language, Write story in continuation of ${mainTopic}, on only this chapter :- ${mainTitle}.`;
            setLoading(mainTitle)
            sendPrompt(prompt, mainTitle);

        } else {
            router.navigate({ pathname: '/screens/connectScreens/course', params: { subtopic: mainTitle, theory: mSubTopic.story } })
        }

    }

    async function sendPrompt(prompt, mainTitle) {

        let getPrevious = '';
        jsonData['chapters'].forEach(chapter => {
            getPrevious = getPrevious + chapter.story;
        });

        const dataToSend = {
            prompt: prompt,
            previous: getPrevious
        };
        try {
            const postURL = serverURL + '/api/generatecontinue';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.text;
            const htmlContent = generatedText;
            try {
                const parsedJson = htmlContent;
                sendData(parsedJson, mainTitle);
            } catch (error) {
                showToast("Try Again because something went wrong");
            }

        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    async function sendData(prompt, mainTitle) {

        const mTopic = jsonData['chapters'].find(topic => topic.title === mainTitle);
        mTopic.story = prompt;
        mTopic.done = true;

        updateCourse(mainTitle, prompt);
    }

    async function updateCourse(mainTitle, prompt) {
        CountDoneTopics();
        await AsyncStorage.setItem('jsonData', JSON.stringify(jsonData))
        const dataToSend = {
            content: JSON.stringify(jsonData),
            courseId: courseId
        };
        try {
            const postURL = serverURL + '/api/update';
            const res = await axios.post(postURL, dataToSend);
            if (res.data.success) {
                setLoading('');
                router.navigate({ pathname: '/screens/connectScreens/course', params: { subtopic: mainTitle, theory: prompt } })
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    async function redirectVoice() {

        router.navigate({ pathname: '/screens/connectScreens/audioCourse', params: { main: mainTopic, json: JSON.stringify(jsonData), lang: lang, type: type, courseId: courseId } });
    }
    function getTheoryPlainText(htmlString) {
        var plainString = htmlString.replace(/<[^>]+>/g, '');
        return plainString;
    }

    const renderTopicsAndSubtopics = (chapters) => {
        try {
            return (
                <View className="mx-4">
                    {chapters.map((chapter, index) => {
                        return (
                            <View key={index}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base mt-6">
                                    Chapter {index + 1}
                                </Text>
                                <Pressable onPress={() => redirect(chapter.title)} className="h-14 mt-4 px-2 justify-center" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} key={chapter.title}>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', width: '90%' }} className="text-xs">{chapter.title}</Text>
                                    <View className="absolute right-0 justify-center self-center pr-2" >
                                        {isLoading === chapter.title ?
                                            <ActivityIndicator size={"small"} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                                            :
                                            <>
                                                {chapter.done === true ?
                                                    <CheckIcon />
                                                    :
                                                    <PlayIcon size={false} />
                                                }
                                            </>
                                        }
                                    </View>
                                </Pressable>
                            </View>
                        );
                    })}
                </View>
            );
        } catch (error) {
            return null;
        }
    };


    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View className="flex-row">

                <View className="flex-1 flex-row items-center">
                    <Pressable className="mx-4 mt-4" onPress={() => router.replace('/')}>
                        <Svg width="24" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <Path d="M1 6H17" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <Path d="M5.99996 11C5.99996 11 1.00001 7.3176 1 6C0.99999 4.6824 6 1 6 1" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </Svg>
                    </Pressable>
                    <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff', width: '75%' }} className="text-base mt-4">{mainTopic}</Text>
                </View>

                <View className="flex-1 flex-row items-end justify-end">
                    <View className="flex-row mr-4">
                        <Pressable onPress={redirectVoice}>
                            <VoiceIcon />
                        </Pressable>
                    </View>
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="mt-4">
                <View className="mt-4 w-11/12 self-center">
                    <Image style={{ aspectRatio: 16 / 9, borderRadius: 5, resizeMode: 'cover' }} src={photo} />
                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs mt-2 capitalize">{getTheoryPlainText(type)}</Text>
                </View>
                <Progress.Bar progress={percentage / 100} color='#1ed760' unfilledColor={colorScheme === 'light' ? '#F9F9F9' : '#282C34'} borderWidth={0} borderRadius={5} className="self-center mt-4" style={{ height: 5 }} width={Dimensions.get('screen').width - 32} />
                <View className="flex-col pb-4" style={{ paddingBottom: 50 }}>
                    {jsonData && renderTopicsAndSubtopics(jsonData['chapters'])}
                </View>
            </ScrollView>
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}