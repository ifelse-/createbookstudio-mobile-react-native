// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useColorScheme } from 'nativewind';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from "react-native";
import Constants from 'expo-constants';
import { router, useLocalSearchParams } from 'expo-router';
import RetryIcon from '@/app/icons/RetryIcon';
import Header from '@/app/components/header';
import { useEffect, useState } from 'react';
import { serverURL } from '@/app/Constants';
import axios from 'axios';
import CheckIcon from '@/app/icons/CheckIcon';
import EditIcon from '@/app/icons/EditIcon';
import { TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

export default function GenerateCourse() {

    const { colorScheme } = useColorScheme();
    const { jsonDataString, mainTopic, type, prompt, lang, describe, genre } = useLocalSearchParams();
    const [jsonData, setJson] = useState(null);
    const [processing, setLoad] = useState(false);
    const [load, setProcessing] = useState(false);
    const [mainKey, setMainKey] = useState('');
    const [editable, setEditable] = useState(false);
    const [allChapt, setAllChap] = useState('');
    const [editedText, setEditedText] = useState('');
    const [oldTopic, setOldTopic] = useState('');
    const [editedTopic, setEditedTopic] = useState(0);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        const json = JSON.parse(jsonDataString);
        const mainTopicKey = Object.keys(json)[0];
        setMainKey(mainTopicKey);
        setJson(json);
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

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }


    async function regenerate() {
        setLoad(true);
        const dataToSend = {
            prompt: prompt,
        };
        try {
            const postURL = serverURL + '/api/prompt';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.generatedText;
            const cleanedJsonString = generatedText.replace(/```json/g, '').replace(/```/g, '');
            try {
                setLoad(false);
                const json = JSON.parse(cleanedJsonString);
                const mainTopicKeys = Object.keys(json)[0];
                setMainKey(mainTopicKeys);
                setJson(json);
            } catch (error) {
                showToast("Try Again because something went wrong");
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    const handleEditClick = (subtopic) => {
        setEditable(true);
        setOldTopic(subtopic);
        setEditedTopic(subtopic);
    };

    const handleSaveClick = (oldTitle) => {

        if (editedText === '') {
            setEditable(false);

            jsonData['chapters'].forEach(topic => {
                jsonData.forEach((topic, index) => {
                    if (topic.title === oldTitle) {
                        topic.title = oldTopic;
                    }
                });
            });

            setEditedText('');
        } else {
            setEditable(false);

            jsonData['chapters'].forEach((topic, index) => {
                if (topic.title === oldTitle) {
                    topic.title = editedText
                }
            });

            setEditedText('');
        }

    };

    function redirectCourse() {

        const mainTopicData = jsonData["chapters"][0];

        const firstSubtopic = mainTopicData.title;

        const prompt = `Strictly in ${lang} language, Write a story based on:- ${describe} of title ${mainTopic} of genre :- ${genre}, on only this chapter :- ${firstSubtopic}.`;
        setProcessing(true);
        sendPrompt(prompt);

    }

    async function sendPrompt(prompt) {
        const dataToSend = {
            prompt: prompt,
        };
        try {
            const postURL = serverURL + '/api/generate';
            const res = await axios.post(postURL, dataToSend);
            const generatedText = res.data.text;
            const htmlContent = generatedText;
            try {
                const parsedJson = htmlContent;
                sendData(parsedJson);
            } catch (error) {
                showToast("Try Again because something went wrong");
            }

        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    async function sendData(theory) {
        jsonData["chapters"][0].story = theory;
        const chapterTitles = jsonData["chapters"].map(chapter => chapter.title).join(', ');
        setAllChap(chapterTitles);
        const descriptionPrompt = `Generate a short story description in one paragraph STRICT on these chapters :- ${allChapt}. And Based on story of chapter 1: ${theory}`;

        const user = await AsyncStorage.getItem('uid');
        const content = JSON.stringify(jsonData);
        const postURL = serverURL + '/api/course';
        const response = await axios.post(postURL, { user, content, descriptionPrompt, mainTopic, lang });

        if (response.data.success) {
            await AsyncStorage.setItem('courseId', response.data.courseId);
            await AsyncStorage.setItem('first', 'false');
            await AsyncStorage.setItem('jsonData', JSON.stringify(jsonData));
            router.replace({ pathname: '/screens/connectScreens/courseContent', params: { dat: JSON.stringify(jsonData), mainTopic: mainTopic.toUpperCase(), type: response.data.desc, courseId: response.data.courseId, end: '', lang: lang, photo: response.data.photo } })
        } else {
            showToast("Try Again because something went wrong");
        }

    }

    const renderTopicsAndSubtopics = (chapters) => {
        try {
            return (
                <View className="mx-4">
                    {chapters.map((chapter, index) => {
                        return (
                            <View key={index}>
                                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base mt-6">
                                    Chapter {index+1}
                                </Text>
                                <View style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-full h-14 self-center items-center mt-2 px-2 flex-row">
                                    {editable && editedTopic === chapter.title ? (
                                        <TextInput onChangeText={(text) => setEditedText(text)} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="flex-1 h-full pr-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                                    ) : (
                                        <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', width: '90%' }} className="text-xs">{chapter.title}</Text>
                                    )}
                                    <View className="absolute right-0 justify-center self-center pr-2" >
                                        {editable && editedTopic === chapter.title ? (
                                            <Pressable onPress={() => handleSaveClick(chapter.title)}>
                                                <CheckIcon />
                                            </Pressable>
                                        ) : (
                                            <Pressable onPress={() => handleEditClick(chapter.title)}>
                                                <EditIcon />
                                            </Pressable>
                                        )}
                                    </View>
                                </View>
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
            <View className="flex-row  pb-4">
                <View className="flex-1 ">
                    <Header title={mainTopic.toUpperCase()} />
                </View>
                <View className="flex-1 flex-row items-end justify-end   mr-4">
                    <Pressable disabled={processing} onPress={regenerate}>
                        <RetryIcon />
                    </Pressable>
                </View>
            </View>
            {processing ?
                <View className="h-full justify-center self-center">
                    <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                </View>
                :
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Pressable onPress={redirectCourse} disabled={load} className="flex-row w-11/12 h-14 mt-6 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('GenerateCourse')}</Text>
                    </Pressable>
                    <View className="flex-col" style={{ marginBottom: 50 }}>
                        {jsonData && renderTopicsAndSubtopics(jsonData['chapters'])}
                    </View>
                </ScrollView>
            }
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
        </View>
    );
}