// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { router, useLocalSearchParams } from 'expo-router';
import { Text, View, ScrollView, Dimensions, Pressable, Platform, BackHandler } from 'react-native';
import Constants from 'expo-constants';
import StatusBarComp from '@/app/components/statusBar';
import * as Speech from 'expo-speech';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'nativewind';
import PreviousIcon from '@/app/icons/PreviousIcon';
import ForwardIcon from '@/app/icons/ForwardIcon';
import ResumeIcon from '@/app/icons/ResumeIcon';
import PauseIcon from '@/app/icons/PauseIcon';
import * as Progress from 'react-native-progress';
import { Path, Svg } from 'react-native-svg';
import RestartIcon from '@/app/icons/RestartIcon';
import { ActivityIndicator } from 'react-native';
import axios from 'axios';
import { serverURL } from '@/app/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from "expo-av";
import LightToasts from '@/app/components/lightToast';
import DarkToasts from '@/app/components/darkToast';
import Toast from 'react-native-toast-message';
import { I18n } from "i18n-js";
import { translations } from "../../localizations"

const soundObject = new Audio.Sound();

export default function AudioCourse() {

    const languages = [
        { name: 'English', code: 'en', flag: '🇬🇧', language_code: 'en-US' },
        { name: 'Hindi', code: 'hi', flag: '🇮🇳', language_code: 'hi-IN' },
        { name: 'Arabic', code: 'ar', flag: '🇸🇦', language_code: 'ar-SA' },
        { name: 'Bengali', code: 'bn', flag: '🇧🇩', language_code: 'bn-BD' },
        { name: 'Chinese', code: 'zh', flag: '🇨🇳', language_code: 'zh-CN' },
        { name: 'Spanish', code: 'es', flag: '🇪🇸', language_code: 'es-ES' },
        { name: 'Portuguese', code: 'pt', flag: '🇵🇹', language_code: 'pt-PT' },
        { name: 'Russian', code: 'ru', flag: '🇷🇺', language_code: 'ru-RU' },
        { name: 'French', code: 'fr', flag: '🇫🇷', language_code: 'fr-FR' },
        { name: 'German', code: 'de', flag: '🇩🇪', language_code: 'de-DE' },
        { name: 'Japanese', code: 'ja', flag: '🇯🇵', language_code: 'ja-JP' },
        { name: 'Korean', code: 'ko', flag: '🇰🇷', language_code: 'ko-KR' },
        { name: 'Italian', code: 'it', flag: '🇮🇹', language_code: 'it-IT' },
        { name: 'Indonesian', code: 'id', flag: '🇮🇩', language_code: 'id-ID' },
        { name: 'Bulgarian', code: 'bg', flag: '🇧🇬', language_code: 'bg-BG' },
        { name: 'Croatian', code: 'hr', flag: '🇭🇷', language_code: 'hr-HR' },
        { name: 'Czech', code: 'cs', flag: '🇨🇿', language_code: 'cs-CZ' },
        { name: 'Danish', code: 'da', flag: '🇩🇰', language_code: 'da-DK' },
        { name: 'Dutch', code: 'nl', flag: '🇳🇱', language_code: 'nl-NL' },
        { name: 'Estonian', code: 'et', flag: '🇪🇪', language_code: 'et-EE' },
        { name: 'Finnish', code: 'fi', flag: '🇫🇮', language_code: 'fi-FI' },
        { name: 'Greek', code: 'el', flag: '🇬🇷', language_code: 'el-GR' },
        { name: 'Hebrew', code: 'iw', flag: '🇮🇱', language_code: 'he-IL' },
        { name: 'Hungarian', code: 'hu', flag: '🇭🇺', language_code: 'hu-HU' },
        { name: 'Latvian', code: 'lv', flag: '🇱🇻', language_code: 'lv-LV' },
        { name: 'Lithuanian', code: 'lt', flag: '🇱🇹', language_code: 'lt-LT' },
        { name: 'Norwegian', code: 'no', flag: '🇳🇴', language_code: 'no-NO' },
        { name: 'Polish', code: 'pl', flag: '🇵🇱', language_code: 'pl-PL' },
        { name: 'Romanian', code: 'ro', flag: '🇷🇴', language_code: 'ro-RO' },
        { name: 'Serbian', code: 'sr', flag: '🇷🇸', language_code: 'sr-RS' },
        { name: 'Slovak', code: 'sk', flag: '🇸🇰', language_code: 'sk-SK' },
        { name: 'Slovenian', code: 'sl', flag: '🇸🇮', language_code: 'sl-SI' },
        { name: 'Swahili', code: 'sw', flag: '🇰🇪', language_code: 'sw-KE' },
        { name: 'Swedish', code: 'sv', flag: '🇸🇪', language_code: 'sv-SE' },
        { name: 'Thai', code: 'th', flag: '🇹🇭', language_code: 'th-TH' },
        { name: 'Turkish', code: 'tr', flag: '🇹🇷', language_code: 'tr-TR' },
        { name: 'Ukrainian', code: 'uk', flag: '🇺🇦', language_code: 'uk-UA' },
        { name: 'Vietnamese', code: 'vi', flag: '🇻🇳', language_code: 'vi-VN' }
    ];

    const { colorScheme } = useColorScheme();
    const { main, json, lang, type, courseId } = useLocalSearchParams();
    const [topicsData, setJson] = useState(null);
    const [currentTopicIndex, setCurrentTopicIndex] = useState(0);
    const [currentSubtopicIndex, setCurrentSubtopicIndex] = useState(0);
    const [startedSpeak, setStartedSpeak] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [charNumber, setCharIndex] = useState(0);
    const [charLong, setCharLong] = useState(0);
    const [progress, setProgress] = useState(0);
    const [langCode, setLangCode] = useState(0);
    const [process, setProcess] = useState(false);
    const [mHeight, setHeight] = useState(0);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    const currentTopic = topicsData && topicsData['chapters'][currentTopicIndex];
    const currentSubtopic = currentTopic;

    useEffect(() => {
        const dat = JSON.parse(json);
        setJson(dat);
        const languageCode = getLanguageCode(lang);
        setLangCode(languageCode);
        getLocal();

        const enableSound = async () => {
            if (Platform.OS === "ios") {
                await Audio.setAudioModeAsync({
                    playsInSilentModeIOS: true,
                    staysActiveInBackground: true
                });
                await soundObject.loadAsync(require("../../../assets/soundFile.mp3"));
                await soundObject.playAsync();
            }
        };
        enableSound();

        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            handleBack();
            return true;
        });

        return () => {
            backHandler.remove();
        };
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

    const getLanguageCode = (languageName) => {
        const language = languages.find(lang => lang.name.toLowerCase() === languageName.toLowerCase());
        return language ? language.language_code : null;
    };

    const speak = async (text) => {
        setStartedSpeak(true);
        setPlaying(true);
        const speechOptions = {
            language: langCode,
            rate: 1.0,
            onBoundary: (boundaries) => {
                const { charIndex, charLength } = boundaries;
                setCharLong(charLength);
                setCharIndex(charIndex);
                let wordNumber = countWords(text);
                setProgress(charIndex / wordNumber);
            }
        };
        Speech.speak(text, speechOptions);
    };

    const navigateToNextSubtopic = () => {
        if (startedSpeak) {
            setPlaying(false);
            setStartedSpeak(false);
            setCharLong(0);
            setCharIndex(0);
            setProgress(0);
            Speech.stop();
        }
        const currentTopic = topicsData['chapters'][currentTopicIndex];
        if (currentSubtopicIndex < topicsData['chapters'].length - 1) {
            setCurrentTopicIndex(currentTopicIndex + 1);
            setCurrentSubtopicIndex(0);
        }
    };

    const navigateToPreviousSubtopic = () => {
        if (startedSpeak) {
            setPlaying(false);
            setStartedSpeak(false);
            setCharLong(0);
            setCharIndex(0);
            setProgress(0);
            Speech.stop();
        }
        if (currentSubtopicIndex > 0) {
            setCurrentSubtopicIndex(currentSubtopicIndex - 1);
        } else if (currentTopicIndex > 0) {
            setCurrentTopicIndex(currentTopicIndex - 1);
            const previousTopic = topicsData[main][currentTopicIndex - 1];
            setCurrentSubtopicIndex(previousTopic.subtopics.length - 1);
        }
    };

    function getPlainText(htmlString) {
        if (htmlString !== null || htmlString !== undefined || htmlString !== '') {
            var plainString = htmlString.replace(/<[^>]+>/g, '');
            return plainString;
        } else {
            return '';
        }
    }

    function getTheoryPlainText(htmlString) {
        if (htmlString === null || htmlString === undefined || htmlString === '') {
            setProcess(true);
            handleSelect();
        } else {
            var plainString = htmlString.replace(/<[^>]+>/g, '');
            return plainString;
        }
    }

    function toggleSpeech() {
        if (playing) {
            setPlaying(false);
            Speech.stop();
        } else {
            let text = getPlainText(currentSubtopic.story);
            setPlaying(true);
            setStartedSpeak(true);
            setPlaying(true);
            const speechOptions = {
                language: langCode,
                rate: 1.0,
                onBoundary: (boundaries) => {
                    const { charIndex, charLength } = boundaries;
                    setCharLong(charLong + charLength);
                    setCharIndex(charNumber + charIndex);
                    let wordNumber = countWords(text);
                    let add = charNumber + charIndex;
                    setProgress(add / wordNumber);
                }
            };
            Speech.speak(text.substring(charNumber), speechOptions);
        }
    }

    function handleBack() {
        setPlaying(false);
        setStartedSpeak(false);
        setCharLong(0);
        setCharIndex(0);
        setProgress(0);
        Speech.stop();
        router.back();
    }

    function countWords(str) {
        return str.length;
    }

    async function restart(text) {
        Speech.stop();
        setPlaying(false);
        setStartedSpeak(false);
        setCharLong(0);
        setCharIndex(0);
        setProgress(0);
        speak(text);
    }


    const getHeaderHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    const getBottomHeight = (event) => {
        const { height } = event.nativeEvent.layout;
        setHeight(mHeight + height)
    }

    const UnderlinedWord = ({ text, charIndex, charLength, fontFamily, color }) => {

        const beforeText = text.substring(0, charIndex);
        const underlinedText = text.substring(charIndex, charIndex + charLength);
        const afterText = text.substring(charIndex + charLength);

        return (
            <View>
                <Text style={{ fontFamily: fontFamily, color: color, paddingBottom: 20 }}>
                    {beforeText}
                    <Text style={{ textDecorationLine: 'underline' }}>{underlinedText}</Text>
                    {afterText}
                </Text>
            </View>
        );
    };

    const handleSelect = () => {


        const prompt = `Strictly in ${lang} language, Write story in continuation of ${main}, on only this chapter :- ${currentSubtopic.title}.`;

        sendPrompt(prompt, currentSubtopic.title);


    };

    async function sendPrompt(prompt, mainTitle) {
        let getPrevious = '';
        topicsData['chapters'].forEach(chapter => {
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

        const mTopic = topicsData['chapters'].find(topic => topic.title === mainTitle);
        mTopic.story = prompt;
        mTopic.done = true;

        updateCourse(mainTitle, prompt);
    }

    async function updateCourse(title: any, contents: any, image: any) {
        await AsyncStorage.setItem('jsonData', JSON.stringify(topicsData))
        const dataToSend = {
            content: JSON.stringify(topicsData),
            courseId: courseId
        };
        try {
            const postURL = serverURL + '/api/update';
            const res = await axios.post(postURL, dataToSend);
            if (res.data.success) {
                setProcess(false);
                return contents;
            }
        } catch (error) {
            showToast("Try Again because something went wrong");
        }
    }

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <View onLayout={(event) => getHeaderHeight(event)} className="flex-row items-center">
                <Pressable className="mx-4 mt-4" onPress={handleBack}>
                    <Svg width="24" height="18" viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <Path d="M1 6H17" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <Path d="M5.99996 11C5.99996 11 1.00001 7.3176 1 6C0.99999 4.6824 6 1 6 1" stroke={colorScheme === 'light' ? "#01020A" : '#fff'} strokeWidth="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </Svg>
                </Pressable>
                <Text numberOfLines={1} ellipsizeMode="tail" style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base mt-4">{i18n.t('AudioCourse')}</Text>
            </View>
            {currentSubtopic && (
                <View className='flex-1'>
                    <ScrollView showsVerticalScrollIndicator={false} className='flex-1 mt-4 mx-4'>
                        {process ?
                            <View className=" justify-center self-center" style={{ height: Dimensions.get('screen').height - mHeight }}>
                                <ActivityIndicator size={'large'} color={colorScheme === 'light' ? '#01020A' : 'white'} />
                            </View>
                            :
                            <UnderlinedWord
                                text={getTheoryPlainText(currentSubtopic.story)}
                                charIndex={charNumber}
                                charLength={charLong}
                                fontFamily="Montserrat_500Medium"
                                color={colorScheme === 'light' ? '#01020A' : '#fff'}
                            />
                        }
                    </ScrollView>
                    <View onLayout={(event) => getBottomHeight(event)} className='px-4 pt-4' style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', paddingBottom: Platform.OS === 'ios' ? 36 : 24 }}>
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-base">{currentTopic.title}</Text>
                        <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm">{main}</Text>
                        <Progress.Bar progress={progress} color='#1ed760' unfilledColor={colorScheme === 'light' ? '#fff' : '#000'} borderWidth={0} borderRadius={5} className="self-center my-4" style={{ height: 5 }} width={Dimensions.get('screen').width - 32} />
                        <View className='flex-row items-center'>
                            <Pressable disabled={process} onPress={() => restart(getPlainText(currentSubtopic.story))} className='flex-1'>
                                <RestartIcon />
                            </Pressable>
                            <View className='flex-row flex-1 items-center justify-center'>
                                <Pressable disabled={process} onPress={navigateToPreviousSubtopic}>
                                    <PreviousIcon />
                                </Pressable>
                                <View className='mx-4'>
                                    {playing === false ?
                                        <Pressable disabled={process} onPress={() => startedSpeak ? toggleSpeech() : speak(getPlainText(currentSubtopic.story))}>
                                            <ResumeIcon />
                                        </Pressable>
                                        :
                                        <Pressable disabled={process} onPress={() => toggleSpeech()}>
                                            <PauseIcon />
                                        </Pressable>
                                    }
                                </View>
                                <Pressable disabled={process} onPress={navigateToNextSubtopic}>
                                    <ForwardIcon />
                                </Pressable>
                            </View>
                            <View className='flex-1 '>
                                <View style={{ width: 22, height: 20 }} />
                            </View>
                        </View>
                    </View>
                </View>
            )}
            {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
            <StatusBarComp />
        </View>
    );
}
