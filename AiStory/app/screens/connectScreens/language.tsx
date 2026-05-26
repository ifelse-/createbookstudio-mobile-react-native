// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Constants from 'expo-constants';
import Header from "@/app/components/header";
import { useColorScheme } from "nativewind";
import CheckIcon from "@/app/icons/CheckIcon";
import { useEffect, useState } from "react";
import { translations } from "../../localizations"
import { I18n } from "i18n-js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StatusBarComp from "@/app/components/statusBar";
import { ADSON } from "@/app/Constants";
import BannerAds from "@/app/components/bannerAds";

export default function Language() {

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

    const { colorScheme } = useColorScheme();
    const [searchText, setSearchText] = useState('');
    const [type, setType] = useState('');
    const [filteredLanguages, setFilteredLanguages] = useState(languages);
    let [local, setLocal] = useState('en');
    const i18n = new I18n(translations)
    i18n.enableFallback = true;
    i18n.locale = local;


    useEffect(() => {
        getLocal();
    }, []);

    async function getLocal() {
        const typeOfUser = await AsyncStorage.getItem('type');
        setType(typeOfUser);
        let lang = await AsyncStorage.getItem('lang');
        if (lang === null | undefined | '') {
            setLocal('en')
        } else {
            setLocal(lang)
        }
    }

    const handleLanguagePress = async (code) => {
        setLocal(code);
        await AsyncStorage.setItem('lang', code);
    };

    const handleSearch = (text) => {
        setSearchText(text);
        const filtered = languages.filter(language =>
            language.name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredLanguages(filtered);
    };

    return (
        <View className="flex-1 bg-white dark:bg-black" style={{ paddingTop: Constants.statusBarHeight }}>
            <Header title="Languages" />
            <ScrollView className="mt-8" showsVerticalScrollIndicator={false}>
                <TextInput selectionColor={colorScheme === 'light' ? "lightgrey" : "#000"} placeholderTextColor={colorScheme === 'light' ? "lightgrey" : "#000"} value={searchText} onChangeText={handleSearch} placeholder="Seach..." keyboardType="default" autoComplete="country" className="w-11/12 mx-4 h-14 self-center mb-4" style={{ backgroundColor: colorScheme === 'light' ? '#F9F9F9' : '#282C34', borderRadius: 5, fontFamily: 'Montserrat_500Medium', color: colorScheme === 'light' ? '#01020A' : '#fff', paddingHorizontal: 8 }} />
                <View className="pb-8 mx-5 justify-center">
                    {filteredLanguages.map((language, index) => (
                        <Pressable key={index} className="h-14 mt-1 flex-row items-center" onPress={() => handleLanguagePress(language.code)}>
                            <Text className="text-base mr-2">{language.flag}</Text>
                            <Text style={{ fontFamily: 'Montserrat_600SemiBold', color: colorScheme === 'light' ? '#01020A' : '#fff' }} className="flex-1 text-sm">{language.name}</Text>
                            {language.code === local ?
                                <CheckIcon />
                                :
                                <></>
                            }
                        </Pressable>
                    ))}
                </View>
            </ScrollView>
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
