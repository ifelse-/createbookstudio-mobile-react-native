// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { ActivityIndicator, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import { useColorScheme } from "nativewind";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { I18n } from "i18n-js";
import { translations } from "../../localizations"
import AsyncStorage from "@react-native-async-storage/async-storage";
import StatusBarComp from "@/app/components/statusBar";
import AddIcon from "@/app/icons/AddIcon";
import RemoveIcon from "@/app/icons/RemoveIcon";
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
    BottomSheetModal,
    BottomSheetView,
    BottomSheetModalProvider,
    BottomSheetTextInput,
    BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
import CheckIcon from "@/app/icons/CheckIcon";
import PriceBottom from "@/app/components/priceBottom";
import Toast from "react-native-toast-message";
import LightToasts from "@/app/components/lightToast";
import DarkToasts from "@/app/components/darkToast";
import { ADSON, REWARD, serverURL } from "@/app/Constants";
import axios from "axios";
import { router, useFocusEffect } from "expo-router";
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const adUnitId = REWARD === '' ? TestIds.REWARDED : REWARD;

const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    keywords: ['fashion', 'clothing'],
});


export default function Create({ route }) {

    const languages = [
        { name: 'English', code: 'en', flag: '🇬🇧' },
        { name: 'Hindi', code: 'hi', flag: '🇮🇳' },
        { name: 'Arabic', code: 'ar', flag: '🇸🇦' },
        { name: 'Bengali', code: 'bn', flag: '🇧🇩' },
        { name: 'Chinese', code: 'zh', flag: '🇨🇳' },
        { name: 'Spanish', code: 'es', flag: '🇪🇸' },
        { name: 'Portuguese', code: 'pt', flag: '🇵🇹' },
        { name: 'Russian', code: 'ru', flag: '🇷🇺' },
        { name: 'French', code: 'fr', flag: '🇫🇷' },
        { name: 'German', code: 'de', flag: '🇩🇪' },
        { name: 'Japanese', code: 'ja', flag: '🇯🇵' },
        { name: 'Korean', code: 'ko', flag: '🇰🇷' },
        { name: 'Italian', code: 'it', flag: '🇮🇹' },
        { name: 'Indonesian', code: 'id', flag: '🇮🇩' },
        { name: 'Bulgarian', code: 'bg', flag: '🇧🇬' },
        { name: 'Croatian', code: 'hr', flag: '🇭🇷' },
        { name: 'Czech', code: 'cs', flag: '🇨🇿' },
        { name: 'Danish', code: 'da', flag: '🇩🇰' },
        { name: 'Dutch', code: 'nl', flag: '🇳🇱' },
        { name: 'Estonian', code: 'et', flag: '🇪🇪' },
        { name: 'Finnish', code: 'fi', flag: '🇫🇮' },
        { name: 'Greek', code: 'el', flag: '🇬🇷' },
        { name: 'Hebrew', code: 'iw', flag: '🇮🇱' },
        { name: 'Hungarian', code: 'hu', flag: '🇭🇺' },
        { name: 'Latvian', code: 'lv', flag: '🇱🇻' },
        { name: 'Lithuanian', code: 'lt', flag: '🇱🇹' },
        { name: 'Norwegian', code: 'no', flag: '🇳🇴' },
        { name: 'Polish', code: 'pl', flag: '🇵🇱' },
        { name: 'Romanian', code: 'ro', flag: '🇷🇴' },
        { name: 'Serbian', code: 'sr', flag: '🇷🇸' },
        { name: 'Slovak', code: 'sk', flag: '🇸🇰' },
        { name: 'Slovenian', code: 'sl', flag: '🇸🇮' },
        { name: 'Swahili', code: 'sw', flag: '🇰🇪' },
        { name: 'Swedish', code: 'sv', flag: '🇸🇪' },
        { name: 'Thai', code: 'th', flag: '🇹🇭' },
        { name: 'Turkish', code: 'tr', flag: '🇹🇷' },
        { name: 'Ukrainian', code: 'uk', flag: '🇺🇦' },
        { name: 'Vietnamese', code: 'vi', flag: '🇻🇳' }
    ];

    const { topic } = route.params || {};
    const [loaded, setLoaded] = useState(false);
    const { colorScheme } = useColorScheme();
    const [formValues, setFormValues] = useState([]);
    const [length, setLength] = useState(0);
    const maxSubtopics = 5;
    const [selectedValue, setSelectedValue] = useState('10');
    const [selectedType, setSelectedType] = useState('theory & image course');
    const [paidMember, setPaidMember] = useState(false);
    const [load, setLoad] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [filteredLanguages, setFilteredLanguages] = useState(languages);
    const [selectedLanguage, setSelectedLanguage] = useState('English');
    const [subTopic, setSubTopic] = useState('');
    const [mainTopic, setMainTopic] = useState('');
    const [describe, setDescribe] = useState('');
    const [genre, setGenre] = useState('');

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const bottomSheetModalRefPricing = useRef<BottomSheetModal>(null);
    const snapPointsPricing = useMemo(() => ['30%', Platform.OS === 'ios' ? '50%' : '60%'], []);
    const handlePresentModalPressPricing = useCallback(() => {
        bottomSheetModalRefPricing.current?.present();
    }, []);

    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;

    useEffect(() => {
        const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
            setLoaded(true);
        });
        const unsubscribeEarned = rewarded.addAdEventListener(
            RewardedAdEventType.EARNED_REWARD,
            reward => {
            },
        );
        rewarded.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
        };
    }, []);


    useFocusEffect(
        useCallback(() => {
            getLocal();
            fetchData();
            if (topic !== undefined) {
                setMainTopic(topic);
            }
        }, [topic])
    );

    function handleBottomPress() {
        if (paidMember) {
            handlePresentModalPress();
        } else {
            handlePresentModalPressPricing();
        }
    }

    const fetchData = async () => {
        const typeUser = await AsyncStorage.getItem('type');
        if (typeUser !== 'free') {
            setPaidMember(true);
        }
    };

    const handleLanguagePress = async (name) => {
        setSelectedLanguage(name);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = languages.filter(language =>
            language.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredLanguages(filtered);
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

    let handleChange = (i, e) => {
        let newFormValues = [...formValues];
        newFormValues[i][e.target.name] = e.target.value;
        setFormValues(newFormValues);
    }

    let addFormFields = () => {
        if (formValues.length < maxSubtopics) {
            setFormValues([...formValues, { sub: "" }]);
            setLength(length + 1);
        } else {
            handlePresentModalPressPricing();
        }
    }

    let removeFormFields = () => {
        let newFormValues = [...formValues];
        newFormValues.pop();
        setLength(length - 1);
        setFormValues(newFormValues);
    }

    async function checkType(value) {
        if (!paidMember && value === 'video & theory course') {
            handlePresentModalPressPricing();
        } else {
            setSelectedType(value);
        }
    }

    async function checkValue(value) {
        if (!paidMember && value === '20') {
            handlePresentModalPressPricing();
        } else {
            setSelectedValue(value);
        }
    }

    const showToast = (msg: string) => {
        Toast.show({
            type: 'success',
            text1: msg,
            position: 'bottom',
        });
    }

    async function handleSubmit() {

        setLoad(true);

        if (mainTopic === '' || describe === '' || genre === '') {
            showToast('Please fill in all required fields');
            setLoad(false);
            return;
        }

        const typeUser = await AsyncStorage.getItem('type');
        if (typeUser === 'free') {
            if (loaded && ADSON) {
                try {
                    rewarded.show().then(() => {
                        starting();
                    });
                } catch (error) {
                    starting()
                }
            } else {
                starting()
            }
        } else {
            starting()
        }

    }

    async function starting() {
        let subtopics = [];
        subtopics.push(subTopic);
        formValues.forEach(subtopic => {
            subtopics.push(subtopic.subtopic);
        });

        let prompt = '';

        prompt = `in ${selectedLanguage} language, just generate ${selectedValue} chapters title for this story called :- ${mainTopic} with this type of story :- ${describe} and of this genre :- ${genre}. and it should include these chapters :- ${subtopics} . In JSON format like this :- {
"chapters": [
{
"chapter_number": 1,
"title": "title",
"story": "",
"done": 
},
{
"chapter_number": 2,
"title": "title",
"story": "",
"done": 
},
{
"chapter_number": 3,
"title": "title",
"story": "",
"done": 
},
{
"chapter_number": 4,
"title": "title",
"story": "",
"done": 
},
{
"chapter_number": 5,
"title": "title",
"story": "",
"done": 
}
]
}`;
        sendPrompt(prompt, mainTopic, selectedType)

    }

    async function sendPrompt(prompt, mainTopic, selectedType) {
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
                router.navigate({ pathname: '/screens/connectScreens/generateCourse', params: { jsonDataString: cleanedJsonString, mainTopic: mainTopic.toLowerCase(), type: selectedType.toLowerCase(), prompt: prompt, lang: selectedLanguage, describe, genre } });
            } catch (error) {
                showToast('Internal Server Error');

            }
        } catch (error) {
            showToast('Internal Server Error');
        }
    }

    return (
        <GestureHandlerRootView className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <BottomSheetModalProvider>
                <View className="mt-4 w-screen self-center flex-row  items-center">
                    <View className=" flex-1 h-11 items-center flex-row">
                        <Text style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: local === 'en' ? 30 : 24 }} className="ml-4">{i18n.t('Generate')}</Text>
                    </View>
                    <View className="mx-4 mt-4 h-9 " />
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-sm mx-4 mt-4">{i18n.t('Head1')}{'\n'}{'\n'}{i18n.t('Head2')}</Text>
                    <View className="mt-6">
                        <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Topic')}</Text>
                        <TextInput onChangeText={text => setMainTopic(text)} value={mainTopic} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                    </View>
                    <View className="mt-4">
                        <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Describe')}</Text>
                        <TextInput onChangeText={text => setDescribe(text)} value={describe} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                    </View>
                    <View className="mt-4" >
                        <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('SubTopic')} ({i18n.t('Optional')})</Text>
                        <View style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-11/12 h-14 self-center items-center mt-2 px-2 flex-row">
                            <TextInput onChangeText={text => setSubTopic(text)} value={subTopic} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="flex-1 h-full pr-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} />
                            <Pressable onPress={addFormFields}>
                                <AddIcon />
                            </Pressable>
                        </View>
                        {formValues.map((element, index) => (
                            <View key={index} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-11/12 h-14 self-center items-center mt-2 px-2 flex-row">
                                <TextInput onChange={e => handleChange(index, e)} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="flex-1 h-full pr-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} />
                                {index === length - 1 ?
                                    <Pressable onPress={() => removeFormFields()}>
                                        <RemoveIcon />
                                    </Pressable>
                                    :
                                    <></>
                                }
                            </View>
                        ))}
                    </View>
                    <View className="mt-4">
                        <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Genre')}</Text>
                        <TextInput onChangeText={text => setGenre(text)} value={genre} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} keyboardType="default" className="w-11/12 h-14 self-center mt-2" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                    </View>
                    <View className="mt-4">
                        <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('NoOfSubTopic')}</Text>
                        <RadioButtonGroup
                            selected={selectedValue}
                            radioStyle={{ marginRight: 8 }}
                            labelStyle={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', fontSize: 12 }}
                            containerOptionStyle={{ marginTop: 8, height: 56, width: '91.666667%', paddingHorizontal: 16, alignSelf: 'center', backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }}
                            onSelected={(value) => checkValue(value)}
                            radioBackground={colorScheme === 'light' ? "#01020A" : "white"}>
                            <RadioButtonItem value="10" label="10" />
                            <RadioButtonItem value="20" label="20" />
                        </RadioButtonGroup>
                    </View>
                    <View>
                        <View className="mt-4">
                            <Text className="text-start text-xs mx-4" style={{ fontFamily: 'Montserrat_700Bold', color: colorScheme === 'light' ? '#01020A' : '#fff' }}>{i18n.t('Language')}</Text>
                            <Pressable onPress={handleBottomPress} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5 }} className="w-11/12 h-14 self-center items-center mt-2 px-2 flex-row">
                                <Text style={{ fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="text-xs">{selectedLanguage}</Text>
                            </Pressable>
                        </View>
                        <BottomSheetModal
                            handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#fff' : '#01020A' }}
                            handleStyle={{
                                backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', flex: 1, shadowColor: colorScheme === 'dark' ? '#F9F9F9' : '#01020A',
                                shadowOffset: { width: 0, height: -10 },
                                shadowOpacity: 0.1,
                                shadowRadius: 5,
                            }}
                            ref={bottomSheetModalRef}
                            backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', elevation: 5 }}
                            index={1}
                            snapPoints={snapPoints}
                            keyboardBlurBehavior="restore"
                        >
                            <BottomSheetScrollView contentContainerStyle={{ backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff' }}>
                                <BottomSheetTextInput value={searchText} onChangeText={handleSearch} placeholder={i18n.t('Search')} selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} placeholderTextColor={colorScheme === 'light' ? "lightgrey" : "#000"} style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, color: colorScheme === 'light' ? '#01020A' : '#fff', width: '91.666667%', height: 56, alignSelf: 'center', alignItems: 'center', marginTop: 8, paddingHorizontal: 8, flexDirection: "row" }} />
                                {filteredLanguages.map((language, index) => (
                                    <Pressable key={index} className="h-14 mt-1 flex-row items-center mx-4" onPress={() => handleLanguagePress(language.name)}>
                                        <Text className="text-base mr-2">{language.flag}</Text>
                                        <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-sm">{language.name}</Text>
                                        {language.name === selectedLanguage ?
                                            <CheckIcon />
                                            :
                                            <></>
                                        }
                                    </Pressable>
                                ))}
                            </BottomSheetScrollView>
                        </BottomSheetModal>
                    </View>
                    <BottomSheetModal
                        handleIndicatorStyle={{ backgroundColor: colorScheme === 'dark' ? '#fff' : '#01020A' }}
                        handleStyle={{
                            backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', height: 40, flex: 1,
                            shadowColor: colorScheme === 'dark' ? '#F9F9F9' : '#01020A',
                            shadowOffset: { width: 0, height: -10 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                        }}
                        ref={bottomSheetModalRefPricing}
                        backgroundStyle={{ backgroundColor: colorScheme === 'dark' ? '#01020A' : '#fff', elevation: 5 }}
                        index={1}
                        snapPoints={snapPointsPricing}
                        keyboardBlurBehavior="restore"
                        enableContentPanningGesture={false}
                    >
                        <BottomSheetView>

                            <PriceBottom />

                        </BottomSheetView>
                    </BottomSheetModal>
                    <Pressable onPress={handleSubmit} disabled={load} className="flex-row w-11/12 h-14 mt-6 mb-4 justify-center self-center items-center" style={{ backgroundColor: colorScheme === 'light' ? '#01020A' : '#fff', borderRadius: 5 }}>
                        {load ? <ActivityIndicator className="mr-2" size={'small'} color={colorScheme === 'light' ? '#fff' : '#01020A'} /> : <></>}
                        <Text className="text-center text-base text-white  dark:text-black" style={{ fontFamily: 'Montserrat_700Bold' }}>{i18n.t('Generate')}</Text>
                    </Pressable>
                </ScrollView>
                {colorScheme === 'light' ? <LightToasts /> : <DarkToasts />}
                <StatusBarComp />
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    );
}
